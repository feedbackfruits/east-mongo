# east-mongo

[![npm](https://img.shields.io/npm/v/@feedbackfruits/east-mongo.svg)](https://www.npmjs.org/package/@feedbackfruits/east-mongo)

> [!NOTE]
> This is a fork of [okv/east-mongo](https://github.com/okv/east-mongo), rewritten in TypeScript and kept up to date with current MongoDB driver versions.

A MongoDB adapter for [east](https://github.com/okv/east), the Node.js database migration tool. It uses the [MongoDB Node.js driver](http://mongodb.github.io/node-mongodb-native/) under the hood and passes a pre-connected `MongoClient` instance directly into each migration.

Executed migration names are tracked in a `_migrations` collection in the target database, with each document's `_id` set to the migration name.

A default migration template is included at [migrationTemplates/async.ts](migrationTemplates/async.ts) and will be used automatically unless you override it. To use a custom template, set `template` in your `.eastrc`:

```js
module.exports = {
  template: require.resolve('@feedbackfruits/east-mongo/migrationTemplates/async.ts')
}
```

or in TypeScript:
```ts
export default {
  template: require.resolve('@feedbackfruits/east-mongo/migrationTemplates/async.ts')
}
```

## Compatibility

east-mongo targets the [current, active, and maintenance releases of Node.js](https://nodejs.org/en/about/previous-releases) — currently tested against versions 22 and 24.

For MongoDB, we follow the official driver support matrix:
- [MongoDB lifecycle policy](https://www.mongodb.com/legal/support-policy/lifecycles)
- [Node.js driver compatibility matrix](https://www.mongodb.com/docs/drivers/compatibility/?driver-language=javascript&javascript-driver-framework=nodejs#mongodb-server-compatibility-11)

The minimum supported MongoDB server version is **7.0** and the minimum supported driver version is **5.7**.

## Installation

`mongodb` is a peer dependency, so install it alongside `east` and this adapter:

```sh
npm install east @feedbackfruits/east-mongo mongodb
```

```sh
yarn add east @feedbackfruits/east-mongo mongodb
``` 

```sh
pnpm add east @feedbackfruits/east-mongo mongodb
```

## Usage

Create an `.eastrc` file at the root of your project:

```js
{
	"adapter": "@feedbackfruits/east-mongo",
	"url": "mongodb://localhost:27017/test"
}
```

You can also pass the adapter and URL directly via the CLI:

```sh
east migrate --adapter @feedbackfruits/east-mongo --url $MONGODB_URI
```

To run TypeScript migrations, use `tsx`:

```sh
npm install -DE tsx
tsx node_modules/east/bin/east.js migrate --adapter @feedbackfruits/east-mongo --url $MONGODB_URI --migration-extension ts
```

`url` should be a valid [MongoDB connection string](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/). For all available `options`, see the [MongoClientOptions reference](https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/).

Migrations created with the default template look like:

```ts
import type { MongoClient } from 'mongodb';

exports.tags = [];

exports.migrate = async (client: MongoClient) => {
  // Migration definition
};

exports.rollback = async (client: MongoClient) => {
  // Rollback definitions
};
```

For more on running and managing migrations, see the east [CLI usage](https://github.com/okv/east#cli-usage) and [library usage](https://github.com/okv/east#library-usage) docs.
