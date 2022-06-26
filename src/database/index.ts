import { join } from 'path';
import { JSONFile, Low } from 'lowdb';
import type { BlockDatabase } from 'src/models/database/block';
import type { UserDatabase } from 'src/models/database/user';

const __dirname = process.cwd();

const USER_LIST_FILE = join(__dirname, 'DB/users.json');
const BLOCK_LIST_FILE = join(__dirname, 'DB/block.json');

const userDBAdapter = new JSONFile<UserDatabase>(USER_LIST_FILE);
export const userDB = new Low<UserDatabase>(userDBAdapter);

const blockDBAdaptor = new JSONFile<BlockDatabase>(BLOCK_LIST_FILE);
export const blockDB = new Low<BlockDatabase>(blockDBAdaptor);

// if block database is too large, use this anonymous file db
export function databaseResolver<T>(adapterName: string) {
  const FILE_DB_NAME = join(__dirname, `DB/${adapterName}.json`);

  return new Low<T>(new JSONFile<T>(FILE_DB_NAME));
}
