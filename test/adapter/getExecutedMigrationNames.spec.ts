

import { clearAdapterCollection, createAdapter, markMigrationExecuted } from '../utils';
import MongoAdapter from '../../src/adapter';

describe('getExecutedMigrationNames', () => {
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

    it('should return executed migration name', async () => {
      const migrations = await adapter.getExecutedMigrationNames();

      expect(migrations).toEqual([migrationName]);
    });
  });

  describe('without executed migrations', () => {
    let adapter: MongoAdapter;

    beforeAll(async () => {
      adapter = createAdapter();
      await adapter.connect();
      await clearAdapterCollection({ adapter });
    });

    afterAll(async () => {
      await adapter.disconnect();
    });

    it('should return empty list', async () => {
      const migrations = await adapter.getExecutedMigrationNames();

      expect(migrations).toEqual([]);
    });
  });
});
