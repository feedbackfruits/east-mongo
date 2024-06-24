
import { createAdapter } from '../utils';
import MongoAdapter from '../../src/adapter';

describe('disconnect', () => {
  describe('with connected adapter', () => {
    let adapter: MongoAdapter;

    beforeAll(async () => {
      adapter = createAdapter();
      await adapter.connect();
    });

    it('should disconnect', async () => {
      return adapter.disconnect();
    });
  });

  describe('with disconnected adapter', () => {
    let adapter: MongoAdapter;

    beforeAll(() => {
      adapter = createAdapter();
    });

    it('should silently noop', async () => {
      return adapter.disconnect();
    });
  });
});
