const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Job tidak ditemukan' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

const getByCompany = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE company_id = $1', [req.params.companyId]);
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

const getByCategory = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE category_id = $1', [req.params.categoryId]);
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { title, description, requirements, salary_min, salary_max, location, type, company_id, category_id } = req.body;
    const id = uuidv4();
    await pool.query(
      'INSERT INTO jobs (id, title, description, requirements, salary_min, salary_max, location, type, company_id, category_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [id, title, description, requirements, salary_min, salary_max, location, type, company_id, category_id]
    );
    res.status(201).json({ status: 'success', message: 'Job berhasil dibuat', data: { id } });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { title, description, requirements, salary_min, salary_max, location, type, company_id, category_id } = req.body;
    const result = await pool.query(
      'UPDATE jobs SET title=$1, description=$2, requirements=$3, salary_min=$4, salary_max=$5, location=$6, type=$7, company_id=$8, category_id=$9, updated_at=NOW() WHERE id=$10 RETURNING id',
      [title, description, requirements, salary_min, salary_max, location, type, company_id, category_id, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Job tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Job berhasil diupdate' });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM jobs WHERE id = $1', [req.params.id]);
    res.json({ status: 'success', message: 'Job berhasil dihapus' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, getByCompany, getByCategory, create, update, remove };