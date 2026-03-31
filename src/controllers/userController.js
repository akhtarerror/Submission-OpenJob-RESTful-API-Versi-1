const pool = require('../db/pool');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const exist = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exist.rows.length > 0) {
      return res.status(400).json({ status: 'failed', message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await pool.query(
      'INSERT INTO users (id, name, email, password, role) VALUES ($1,$2,$3,$4,$5)',
      [id, name, email, hashedPassword, role || 'user']
    );

    res.status(201).json({
      status: 'success',
      message: 'User berhasil didaftarkan',
      data: { id },
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'User tidak ditemukan' });
    }

    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, getUserById };