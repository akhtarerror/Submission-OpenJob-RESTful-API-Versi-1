exports.up = (pgm) => {
  pgm.createTable('documents', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    user_id: { type: 'VARCHAR(50)', notNull: true },
    name: { type: 'VARCHAR(150)', notNull: true },
    file_path: { type: 'TEXT', notNull: true },
    file_type: { type: 'VARCHAR(50)' },
    created_at: { type: 'TIMESTAMP', default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('documents');
};