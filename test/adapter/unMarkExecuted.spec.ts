import { clearAdapterCollection, createAdapter, markMigrationExecuted } from '../utils';
import MongoAdapter from '../../src/adapter';

describe('unMarkExecuted', () => {
  describe('with executed migrations', () => {
    let adapter: MongoAdapter;
    const migrationName = '1_someMigration';

    beforeAll(async () => {
      adapter = createAdapter();
      await adapter.connect();
      await clearAdapterCollection({ adapter });
      await markMigrationExecuted({ adapter, migrationName });
    });

    afterAll(async () => {
      await clearAdapterCollection({ adapter });
      await adapter.disconnect();
    });

    it('should modify list of executed migrations to return an empty list', async () => {
      const migrationsBefore = await adapter.getExecutedMigrationNames();

      expect(migrationsBefore).toEqual([migrationName]);

      await adapter.unmarkExecuted(migrationName);
      const migrationsAfter = await adapter.getExecutedMigrationNames();

      expect(migrationsAfter).toEqual([]);
    });
  });

  describe('without executed migrations', () => {
    let adapter: MongoAdapter;
    const migrationName = '1_someMigration';

    beforeAll(async () => {
      adapter = createAdapter();
      await adapter.connect();
      await clearAdapterCollection({ adapter });
      await markMigrationExecuted({ adapter, migrationName });
    });

    afterAll(async () => {
      await clearAdapterCollection({ adapter });
      await adapter.disconnect();
    });

    it('should return unmodified list', async () => {
      const migrationsBefore = await adapter.getExecutedMigrationNames();

      expect(migrationsBefore).toEqual([migrationName]);

      await adapter.unmarkExecuted(migrationName);
      const migrationsAfter = await adapter.getExecutedMigrationNames();

      expect(migrationsAfter).toEqual([]);
    });
  });
});
