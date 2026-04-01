import { Db, MongoClient } from 'mongodb';
import Adapter from './adapter';
export default Adapter;

export interface EastMongoParams {
  db: Db;
  client: MongoClient;
}
