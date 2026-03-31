const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const create = async (req, res, next) => {
  try {
    const { job_id, cover_letter } = req.body;
    const user_id = req.user.id;
    const id = uuidv4();
    await pool.query(
      'INSERT INTO applications (id, user_id, job_id, cover_letter) VALUES ($1,$2,$3,$4)',
      [id, user_id, job_id, cover_letter]
    );
    res.status(201).json({ status: 'success', message: 'Lamaran berhasil dikirim', data: { id } });
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM applications WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Lamaran tidak ditemukan' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

const getByUser = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM applications WHERE user_id = $1', [req.params.userId]);
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

const getByJob = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM applications WHERE job_id = $1', [req.params.jobId]);
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE applications SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING id',
      [status, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Lamaran tidak ditemukan' });
    }
    res.json({ status: 'success', message: 'Status lamaran diupdate' });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM applications WHERE id = $1', [req.params.id]);
    res.json({ status: 'success', message: 'Lamaran berhasil dihapus' });
  } catch (err) { next(err); }
};

module.exports = { create, getAll, getById, getByUser, getByJob, update, remove };