import path from 'path';
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

import type { Adapter, AdapterConstructor } from 'east';

class MongoAdapter implements Adapter<MongoClient> {
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

  async isConnected(): Promise<boolean> {
    try {
      const count = await this.collection.estimatedDocumentCount();
      return !isNaN(count);
    } catch (e) {
      return false;
    }
  }

  getTemplatePath(): string {
    return path.join(__dirname, 'migrationTemplates', 'async.ts');
  }

  async connect(): Promise<MongoClient> {
    const client = await MongoClient.connect(this.params.url, this.params.options)
    this.client = client;
    this.db = client.db();
    this.collection = this.db.collection('_migrations');

    return client;
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _: AdapterConstructor<MongoClient> = MongoAdapter;

export default MongoAdapter;
