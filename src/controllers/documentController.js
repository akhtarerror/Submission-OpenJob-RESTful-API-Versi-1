const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const upload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'failed', message: 'Tidak ada file yang diupload' });
    }
    const user_id = req.user.id;
    const id = uuidv4();
    const { originalname, filename, mimetype } = req.file;
    const filePath = `uploads/${filename}`;

    await pool.query(
      'INSERT INTO documents (id, user_id, name, file_path, file_type) VALUES ($1,$2,$3,$4,$5)',
      [id, user_id, originalname, filePath, mimetype]
    );

    res.status(201).json({ status: 'success', message: 'Dokumen berhasil diupload', data: { id, file_path: filePath } });
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM documents ORDER BY created_at DESC');
    res.json({ status: 'success', data: result.rows });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM documents WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Dokumen tidak ditemukan' });
    }
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const result = await pool.query(
      'DELETE FROM documents WHERE id = $1 AND user_id = $2 RETURNING id',
      [req.params.id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'Dokumen tidak ditemukan atau tidak diizinkan' });
    }
    res.json({ status: 'success', message: 'Dokumen berhasil dihapus' });
  } catch (err) { next(err); }
};

module.exports = { upload, getAll, getById, remove };