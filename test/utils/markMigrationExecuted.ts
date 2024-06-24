import { ObjectId } from 'mongodb';

import MongoAdapter from '../../src/adapter';

export const markMigrationExecuted = (params: { adapter: MongoAdapter; migrationName: string; }) => {
	const adapter = params.adapter;
	const migrationName = params.migrationName;
	const doc = { _id: migrationName } as unknown as { _id: ObjectId; };

  return adapter.collection?.insertOne(doc);
};
