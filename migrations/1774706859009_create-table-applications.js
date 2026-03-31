exports.up = (pgm) => {
  pgm.createTable('applications', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    user_id: { type: 'VARCHAR(50)', notNull: true },
    job_id: { type: 'VARCHAR(50)', notNull: true },
    status: { type: 'VARCHAR(30)', notNull: true, default: "'pending'" },
    cover_letter: { type: 'TEXT' },
    created_at: { type: 'TIMESTAMP', default: pgm.func('current_timestamp') },
    updated_at: { type: 'TIMESTAMP', default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('applications');
};