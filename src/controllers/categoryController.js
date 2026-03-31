const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY created_at DESC');
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Category tidak ditemukan' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const id = uuidv4();
    await pool.query('INSERT INTO categories (id, name) VALUES ($1,$2)', [id, name]);
    res.status(201).json({ status: 'success', message: 'Category berhasil dibuat', data: { id } });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      'UPDATE categories SET name=$1 WHERE id=$2 RETURNING id',
      [name, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Category tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Category berhasil diupdate' });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.json({ status: 'success', message: 'Category berhasil dihapus' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };