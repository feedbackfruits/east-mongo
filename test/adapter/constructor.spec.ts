
import MongoAdapter from '../../src/adapter';

describe('constructor', () => {
  it('should construct with URL', async () => {
    const adapter = new MongoAdapter({ url: 'mongodb://localhost:27017/test' });

    expect(adapter).toBeDefined();
  });

  it ('should throw without URL', async () => {
    expect(() => new MongoAdapter({ url: '' })).toThrow();
  });
});
