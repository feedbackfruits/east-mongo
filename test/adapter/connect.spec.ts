
import MongoAdapter from '../../src/adapter';
import { createAdapter } from '../utils';

describe('connect', () => {
  describe('with suitable params', () => {
    let adapter: MongoAdapter;

    beforeAll(() => {
      adapter = createAdapter();
    });

    it('should connect', async () => {
      const client = await adapter.connect();

      expect(client).toBeDefined();
      expect(adapter.collection).toBeDefined();
    });
  });
});
