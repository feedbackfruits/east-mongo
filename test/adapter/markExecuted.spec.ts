import { clearAdapterCollection, createAdapter, markMigrationExecuted } from '../utils';
import MongoAdapter from '../../src/adapter';

describe('markExecuted', () => {
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

    it('should not modify list of executed migrations', async () => {
      const migrationsBefore = await adapter.getExecutedMigrationNames();

      expect(migrationsBefore).toEqual([migrationName]);

      await adapter.markExecuted(migrationName);
      const migrationsAfter = await adapter.getExecutedMigrationNames();

      expect(migrationsAfter).toEqual([migrationName]);
    });
  });

  describe('without executed migrations', () => {
    let adapter: MongoAdapter;
    const migrationName = '1_someMigration';

    beforeAll(async () => {
      adapter = createAdapter();
      await adapter.connect();
      await clearAdapterCollection({ adapter });
    });

    afterAll(async () => {
      await clearAdapterCollection({ adapter });
      await adapter.disconnect();
    });

    it('should return the list with the migration marked as completed', async () => {
      const migrationsBefore = await adapter.getExecutedMigrationNames();

      expect(migrationsBefore).toEqual([]);

      await adapter.markExecuted(migrationName);
      const migrationsAfter = await adapter.getExecutedMigrationNames();

      expect(migrationsAfter).toEqual([migrationName]);
    });
  });
});
