/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';
import { writePage } from 'src/database/block';
import ErrorMapper from 'src/errors/ErrorMapper';
import { RetrieveBlockParams, RetrievePageParams } from 'src/models/block';
import { BaseResponse } from 'src/models/response';
import { retrieveBlockChild, retrievePage } from 'src/services/block';
import { NotionBlockChildObject, NotionBlockObject } from 'src/types/notion';
import { generateListBlock } from 'src/utils/block';
import { waitBlock } from 'src/utils/wait';

export async function retrieveBlockController(
  req: Request<RetrieveBlockParams, undefined>,
  res: Response<BaseResponse<NotionBlockChildObject>>
) {
  const { id } = req.params;

  try {
    const result = await retrieveBlockChild(id);

    res.send({ message: 'ok', data: result });
  } catch {
    throw new ErrorMapper('ERR_AUTH', '인증되지 않은 사용자입니다.', 401);
  }
}

async function retrieveBlockRecursive(parent: NotionBlockObject) {
  const result = generateListBlock(parent);

  // eslint-disable-next-line no-console
  console.log('retrieve', result.id);
  const { results } = await retrieveBlockChild(result.id);
  waitBlock();

  for (let i = 0; i < results.length; i += 1) {
    if (results[i].has_children) {
      const children = await retrieveBlockRecursive(results[i]);
      waitBlock();

      result.block_list.push(children);
    } else {
      result.block_list.push(results[i]);
    }
  }

  // eslint-disable-next-line no-console
  console.log(result);
  return result as NotionBlockObject;
}

export async function retrievePageController(
  req: Request<RetrievePageParams, undefined>,
  res: Response<BaseResponse<NotionBlockObject[]>>
) {
  const { id } = req.params;

  try {
    const { results } = await retrieveBlockChild(id);

    for (let i = 0; i < results.length; i += 1) {
      if (results[i].has_children) {
        const result = await retrieveBlockRecursive(results[i]);
        results.splice(i, 1, result);
      }
    }

    await writePage(id, results);

    res.send({ message: 'ok', data: results });
  } catch {
    throw new ErrorMapper('ERR_AUTH', '인증되지 않은 사용자입니다.', 401);
  }
}

export async function getPageMetadataController(
  req: Request<RetrievePageParams, undefined>,
  res: Response<BaseResponse<NotionBlockObject>>
) {
  const { id } = req.params;

  try {
    const result = await retrievePage(id);

    res.send({ message: 'ok', data: result });
  } catch {
    throw new ErrorMapper('ERR_AUTH', '인증되지 않은 사용자입니다.', 401);
  }
}
