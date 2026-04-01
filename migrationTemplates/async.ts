import type { Db, MongoClient } from 'mongodb';

exports.tags = [];

exports.migrate = async ({ db, client }: { db: Db, client: MongoClient }) => {
};

exports.rollback = async ({ db, client }: { db: Db, client: MongoClient }) => {
};
