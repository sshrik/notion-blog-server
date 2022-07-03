import { Client } from '@notionhq/client';
import { NotionBlockChildObject, NotionPageObject } from 'src/types/notion';

export async function retrievePage(pageId: string) {
  const NOTION_SECRET_KEY = process.env.NOTION_SECRET_KEY ?? '';
  const notion = new Client({ auth: NOTION_SECRET_KEY });

  const response = await notion.pages.retrieve({
    page_id: pageId,
  });

  return response as unknown as NotionPageObject;
}

export async function retrieveBlockChild(blockId: string) {
  const NOTION_SECRET_KEY = process.env.NOTION_SECRET_KEY ?? '';
  const notion = new Client({ auth: NOTION_SECRET_KEY });

  const response = await notion.blocks.children.list({
    block_id: blockId,
  });

  return response as unknown as NotionBlockChildObject;
}
