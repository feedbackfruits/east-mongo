import MongoAdapter from '../../src/adapter';

export const getExecutedMigrations = (params: { adapter: MongoAdapter; }): Promise<string[]> => {
	const adapter = params.adapter;

	return adapter.getExecutedMigrationNames();
};
