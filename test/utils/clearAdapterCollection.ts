import MongoAdapter from '../../src/adapter';

export const clearAdapterCollection = async (params: { adapter: MongoAdapter; }): Promise<void> => {
	const adapter = params.adapter;
  await adapter.collection?.deleteMany({});
}
