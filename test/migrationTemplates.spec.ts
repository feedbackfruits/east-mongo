import path from 'path';

describe('migrationTemplates', () => {
  const templatesPath = path.resolve(
    __dirname,
    '../migrationTemplates'
  );

  it('can load async template', async () => {
    const templatePath = path.join(templatesPath, 'async.ts');
    const migration = require(templatePath);

    await Promise.all([
      migration.migrate({}),
      migration.rollback({})
    ]);

    expect(Array.isArray(migration.tags)).toBe(true);
  });
});
