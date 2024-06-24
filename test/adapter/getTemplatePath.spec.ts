import path from 'path';

import { createAdapter } from '../utils';
import MongoAdapter from '../../src/adapter';

describe('getTemplatePath', () => {
  describe('with suitable params', () => {
    let adapter: MongoAdapter;

    beforeAll(async () => {
      adapter = createAdapter();
    });

    it('should return path to migration template', () => {
      const templatePath = path.relative(
        __dirname,
        adapter.getTemplatePath()
      );

      expect(templatePath).toBe('../../migrationTemplates/async.ts');
    });
  });
});
