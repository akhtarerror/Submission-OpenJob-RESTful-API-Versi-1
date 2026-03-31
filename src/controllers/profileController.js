const pool = require('../db/pool');

const getProfile = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'User tidak ditemukan' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

const getApplications = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

const getBookmarks = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

module.exports = { getProfile, getApplications, getBookmarks };