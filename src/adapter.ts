import path from 'path';
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

import type { Adapter, AdapterConstructor } from 'east';

import type { EastMongoParams } from './index';

class MongoAdapter implements Adapter<EastMongoParams> {
  private params: { url: string; options?: object };
  private client: MongoClient | null;
  private db: Db | null;

  collection: Collection | null;

  constructor(params: { url: string; options?: object }) {
    this.params = params;

    if (!this.params.url) {
      throw new Error('`url` parameter required');
    }
  }

  getTemplatePath(): string {
    return path.join(__dirname, '../migrationTemplates', 'async.ts');
  }

  async connect(): Promise<EastMongoParams> {
    this.client = await MongoClient.connect(this.params.url, this.params.options);
    this.db = this.client.db();
    this.collection = this.db.collection('_migrations');

    return {
      client: this.client,
      db: this.db
    }
  }

  async disconnect(): Promise<void> {
    return this.client?.close();
  }

  async getExecutedMigrationNames(): Promise<string[]> {
    return this.collection?.find({}).toArray().then((docs) => {
      return docs.map((doc) => doc._id.toString());
    });
  }

  async markExecuted(name: string): Promise<void> {
    const query = { _id: name } as unknown as { _id: ObjectId };
    this.collection?.replaceOne(query, { _id: name }, { upsert: true });
  }

  async unmarkExecuted(name: string): Promise<void> {
    const query = { _id: name } as unknown as { _id: ObjectId };
    this.collection?.deleteOne(query);
  }
}

// Type checking for the constructor
const _: AdapterConstructor<EastMongoParams> = MongoAdapter;

export default MongoAdapter;
