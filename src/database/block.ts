import { blockDB as db, databaseResolver } from 'src/database/index';
import ErrorMapper from 'src/errors/ErrorMapper';
import { PageDatabase } from 'src/models/database/block';
import { NotionBlockObject } from 'src/types/notion';

export async function getBlock(key: string) {
  await db.read();
  if (db.data) {
    const { block } = db.data;

    return block.filter(({ id }) => id === key);
  }
  throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
}

export async function getPage(key: string) {
  try {
    const pageDB = databaseResolver<PageDatabase>(key);

    await pageDB.read();
    if (pageDB.data) {
      const { page } = pageDB.data;

      return page;
    }
    throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
  } catch {
    throw new ErrorMapper('ERR_DB', '유효하지 않은 key입니다.', 404);
  }
}

export async function writeBlock(blockData: NotionBlockObject) {
  await db.read();
  if (db.data) {
    const { block } = db.data;

    try {
      block.push(blockData);

      await db.write();
    } catch (err) {
      throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
    }
  }
  throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
}

export async function writePage(id: string, blockDatas: NotionBlockObject[]) {
  try {
    const pageDB = databaseResolver<PageDatabase>(id);
    try {
      pageDB.data = { page: blockDatas };
      pageDB.write();
    } catch {
      throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
    }
  } catch {
    throw new ErrorMapper('ERR_DB', 'Database에 작업하지 못했습니다.', 500);
  }
}
