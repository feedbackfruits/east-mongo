"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("mongodb");
class MongoAdapter {
    constructor(params) {
        this.params = params;
        if (!this.params.url) {
            throw new Error('`url` parameter required');
        }
    }
    getTemplatePath() {
        return path_1.default.join(__dirname, 'migrationTemplates', 'async.ts');
    }
    async connect() {
        const client = await mongodb_1.MongoClient.connect(this.params.url, this.params.options);
        this.client = client;
        this.db = client.db();
        this.collection = this.db.collection('_migrations');
        return client;
    }
    async disconnect() {
        return this.client?.close();
    }
    async getExecutedMigrationNames() {
        return this.collection?.find({}).toArray().then((docs) => {
            return docs.map((doc) => doc._id.toString());
        });
    }
    async markExecuted(name) {
        this.collection?.replaceOne({ _id: new mongodb_1.ObjectId(name) }, { _id: name }, { upsert: true });
    }
    async unmarkExecuted(name) {
        this.collection?.deleteOne({ _id: new mongodb_1.ObjectId(name) });
    }
}
const _ = MongoAdapter;
exports.default = MongoAdapter;
//# sourceMappingURL=adapter.js.map