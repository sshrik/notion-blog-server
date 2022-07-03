import { Client } from '@notionhq/client';
import { IconType } from 'src/types/blog';
import {
  NotionBlockChildObject,
  NotionPageObject,
  NotionPageTitleProperty,
} from 'src/types/notion';
import { BaseTextType } from 'src/types/notionBaseBlock';

export async function retrievePage(pageId: string) {
  const NOTION_SECRET_KEY = process.env.NOTION_SECRET_KEY ?? '';
  const notion = new Client({ auth: NOTION_SECRET_KEY });

  const response = await notion.pages.retrieve({
    page_id: pageId,
  });

  return response as unknown as NotionPageObject;
}

export async function retrievePageMetadata(pageId: string) {
  const { icon, cover, parent, properties } = await retrievePage(pageId);

  let iconImageLink = '';
  let iconType: IconType = 'url';

  if (icon.type === 'external') {
    iconType = 'url';
    iconImageLink = icon.external?.url ?? '';
  } else if (icon.type === 'file') {
    iconType = 'url';
    iconImageLink = icon.file?.url ?? '';
  } else if (icon.type === 'emoji') {
    iconType = 'string';
    iconImageLink = icon.emoji;
  }

  let coverImageLink = '';

  if (cover.type === 'external') {
    coverImageLink = cover.external?.url ?? '';
  } else if (cover.type === 'file') {
    coverImageLink = cover.file?.url ?? '';
  }

  let blogTitle: BaseTextType = [];

  if (parent.type === 'page_id' || parent.type === 'workspace') {
    blogTitle = (<NotionPageTitleProperty>properties).title.title;
  }

  return {
    iconType,
    iconImageLink,
    coverImageLink,
    blogTitle,
  };
}

export async function retrieveBlockChild(blockId: string) {
  const NOTION_SECRET_KEY = process.env.NOTION_SECRET_KEY ?? '';
  const notion = new Client({ auth: NOTION_SECRET_KEY });

  const response = await notion.blocks.children.list({
    block_id: blockId,
  });

  return response as unknown as NotionBlockChildObject;
}
