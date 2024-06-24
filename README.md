# east mongo

> [!NOTE]
> This is a fork from https://github.com/okv/east-mongo, continued in Typescript with current versions of MongoDB

Mongodb adapter for [east](https://github.com/okv/east), a Node.js database migration tool, which uses 
the [mongodb native driver](http://mongodb.github.io/node-mongodb-native/) to perform migrations.

All executed migrations names will be stored at `_migrations` collection in the
current database, where the `_id` for each document is the name of the executed migration. A pre-connected instance of `MongoClient` will be passed in to these migrations.

`east-mongo` also provides a template for use with migrations at [lib/migrationTemplates/async.js](lib/migrationTemplates/async.js).

This default migration template will be used if `template` is not set. To override this behaviour and provide your own template, set `template` in your `.eastrc` file to the path of your template file:

```js
	module.exports = {
		template: require.resolve('east-mongo/lib/migrationTemplates/async.js')
	}
```

or in Typescript
```ts
export default {
  template: require.resolve('east-mongo/lib/migrationTemplates/async.ts')
}
```

[![npm](https://img.shields.io/npm/v/@feedbackfruits/east-mongo.svg)](https://www.npmjs.org/package/@feedbackfruits/east-mongo)

## Node.js compatibility & MongoDB Driver compatibility

east-mongo supports current, active and maintenance versions of node.js: https://nodejs.org/en/about/previous-releases
Currently this means this package is tested against versions 18, 20 and 22.

For the MongoDB drivers, we follow language compatibility matrix from MongoDB: https://www.mongodb.com/docs/drivers/node/current/compatibility/#language-compatibility
This currently means the minimum supported version is 4.x

## Installation

mongodb adapter requires `mongodb` package as peer dependency, so you should install it manually along side with east:

```sh
npm install east @feedbackfruits/east-mongo mongodb
# or 
yarn add east @feedbackfruits/east-mongo mongodb
```

## Usage

Sample `.eastrc` content:

```js
{
	"adapter": "@feedbackfruits/east-mongo",
	"url": "mongodb://localhost:27017/test",
	"options": {
		"server": {
			"socketOptions": {
				"socketTimeoutMS": 3600000
			}
		}
	}
}
```

Alternatively, pass in the options through the CLI:
  
```sh
east migrate --adapter east-mongo --url $MONGODB_URI
# or, to run TS migrations
yarn add -DE tsx
tsx node_modules/east/bin/east.js migrate --adapter east-mongo --url $MONGODB_URI --migration-extension ts
```

Where `url` is url of database which you want to migrate (in 
[mongodb native url connection format](http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#the-url-connection-format)) and `options` is optional settings
(see [connect method specification](http://mongodb.github.io/node-mongodb-native/3.5/api/MongoClient.html#.connect)).

Migration files created with default `template` that comes with adapter will look like:

```js
import type { MongoClient } from 'mongodb';

exports.tags = [];

exports.migrate = async (client: MongoClient) => {
  // Migration definition
};

exports.rollback = async (client: MongoClient) => {
  // Rollback definitions
};
```

See east [cli](https://github.com/okv/east#cli-usage) or
[library](https://github.com/okv/east#library-usage) usage for more details.


## License

MIT
