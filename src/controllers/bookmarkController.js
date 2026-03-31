const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const create = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { jobId } = req.params;
    const id = uuidv4();
    await pool.query(
      'INSERT INTO bookmarks (id, user_id, job_id) VALUES ($1,$2,$3)',
      [id, user_id, jobId]
    );
    res.status(201).json({ status: 'success', message: 'Bookmark berhasil dibuat', data: { id } });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM bookmarks WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Bookmark tidak ditemukan' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { jobId } = req.params;
    await pool.query(
      'DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2',
      [user_id, jobId]
    );
    res.json({ status: 'success', message: 'Bookmark berhasil dihapus' });
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      'SELECT * FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

module.exports = { create, getById, remove, getAll };