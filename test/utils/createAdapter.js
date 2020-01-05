'use strict';

const promisify = require('es6-promisify').promisify;
const mongodbPackageJson = require('mongodb/package.json');
const Adapter = require('../../lib/adapter');

const mongodbMajor = mongodbPackageJson.version.split('.')[0];

module.exports = () => {
	const defaultParams = {
		url: 'mongodb://localhost:27017/test_east_mongodb',
		options: {}
	};

	// enable options only when options are supported by driver
	if (mongodbMajor === '3') {
		defaultParams.options.useUnifiedTopology = true;
	}

	const adapter = new Adapter(defaultParams);

	return adapter;
};
