const pool = require('../db/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ status: 'failed', message: 'Email atau password salah' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ status: 'failed', message: 'Email atau password salah' });
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_KEY
    );

    await pool.query('INSERT INTO authentications (token) VALUES ($1)', [refreshToken]);

    res.status(201).json({
      status: 'success',
      message: 'Login berhasil',
      data: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const result = await pool.query(
      'SELECT token FROM authentications WHERE token = $1',
      [refreshToken]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ status: 'failed', message: 'Refresh token tidak ditemukan' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' }
    );

    res.json({
      status: 'success',
      message: 'Access token berhasil diperbarui',
      data: { accessToken: newAccessToken },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await pool.query('DELETE FROM authentications WHERE token = $1', [refreshToken]);
    res.json({ status: 'success', message: 'Logout berhasil' });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, refreshToken, logout };