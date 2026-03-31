const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM companies ORDER BY created_at DESC');
    res.json({ status: 'success', data: { companies: result.rows } });  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM companies WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Company tidak ditemukan' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { name, description, location, website, logo } = req.body;
    const id = uuidv4();
    await pool.query(
      'INSERT INTO companies (id, name, description, location, website, logo) VALUES ($1,$2,$3,$4,$5,$6)',
      [id, name, description, location, website, logo]
    );
    res.status(201).json({ status: 'success', message: 'Company berhasil dibuat', data: { id } });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { name, description, location, website, logo } = req.body;
    const result = await pool.query(
      'UPDATE companies SET name=$1, description=$2, location=$3, website=$4, logo=$5, updated_at=NOW() WHERE id=$6 RETURNING id',
      [name, description, location, website, logo, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Company tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Company berhasil diupdate' });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM companies WHERE id = $1', [req.params.id]);
    res.json({ status: 'success', message: 'Company berhasil dihapus' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };