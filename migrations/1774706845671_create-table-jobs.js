exports.up = (pgm) => {
  pgm.createTable('jobs', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    title: { type: 'VARCHAR(150)', notNull: true },
    description: { type: 'TEXT' },
    requirements: { type: 'TEXT' },
    salary_min: { type: 'INTEGER' },
    salary_max: { type: 'INTEGER' },
    location: { type: 'VARCHAR(100)' },
    type: { type: 'VARCHAR(50)' },
    company_id: { type: 'VARCHAR(50)', notNull: true },
    category_id: { type: 'VARCHAR(50)' },
    created_at: { type: 'TIMESTAMP', default: pgm.func('current_timestamp') },
    updated_at: { type: 'TIMESTAMP', default: pgm.func('current_timestamp') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('jobs');
};