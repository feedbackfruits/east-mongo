import MongoAdapter from '../../src/adapter';

export const createAdapter = () => {
	const defaultParams = {
		url: process.env.MONGODB_URI as string,
		options: {}
	};

	return new MongoAdapter(defaultParams);
};
