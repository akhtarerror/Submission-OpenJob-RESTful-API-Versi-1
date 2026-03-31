exports.up = (pgm) => {
  pgm.createTable('bookmarks', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    user_id: { type: 'VARCHAR(50)', notNull: true },
    job_id: { type: 'VARCHAR(50)', notNull: true },
    created_at: { type: 'TIMESTAMP', default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('bookmarks');
};