import {
  ParagraphBlockObject,
  HeadingOneBlockObject,
  HeadingTwoBlockObject,
  HeadingThreeBlockObject,
  BulletedListItemBlockObject,
  NumberedListItemBlockObject,
  TodoBlockObject,
  ToggleBlockObject,
  ChildPageBlockObject,
  ChildDatabaseBlockObject,
  EmbedBlockObject,
  ImageBlockObject,
  VideoBlockObject,
  FileBlockObject,
  PDFBlockObject,
  BookmarkBlockObject,
  CallOutBlockObject,
  LinkPreviewBlockObject,
  OriginalSyncedBlockObject,
  ReferencedSyncedBlockObject,
  TemplateBlockObject,
  LinkToPageBlockObject,
  UnsupportedBlockObject,
  QuoteBlockObject,
  EquationBlockObject,
  DividerBlockObject,
  TableOfContentsBlockObject,
  ColumnChildBlockObject,
  ColumnListBlockObject,
  ColumnValueBlockObject,
  BreadcrumbBlockObject,
  CodeBlockObject,
  FileObject,
  EmojiObject,
  BaseTextType,
} from 'src/types/notionBaseBlock.d';
import { ObjectType } from 'src/types/notionBaseType.d';
import { PickOneWithType } from 'src/types/utils.d';

type BaseObject = {
  object: ObjectType;
  id: string;
  created_time: string; // ISO 8601 date time string
  last_edited_time: string; // ISO 8601 date time string
  last_edited_by: string;
  has_children: boolean;
  archived: boolean;
};

type NotionBlockVariants = {
  paragraph: ParagraphBlockObject;
  heading_1: HeadingOneBlockObject;
  heading_2: HeadingTwoBlockObject;
  heading_3: HeadingThreeBlockObject;
  bulleted_list_item: BulletedListItemBlockObject;
  numbered_list_item: NumberedListItemBlockObject;
  to_do: TodoBlockObject;
  toggle: ToggleBlockObject;
  child_page: ChildPageBlockObject;
  child_database: ChildDatabaseBlockObject;
  embed: EmbedBlockObject;
  image: ImageBlockObject;
  video: VideoBlockObject;
  file: FileBlockObject;
  pdf: PDFBlockObject;
  bookmark: BookmarkBlockObject;
  callout: CallOutBlockObject;
  quote: QuoteBlockObject;
  equation: EquationBlockObject;
  divider: DividerBlockObject;
  table_of_contents: TableOfContentsBlockObject;
  column: ColumnListBlockObject;
  column_list: ColumnChildBlockObject;
  column_value: ColumnValueBlockObject;
  link_preview: LinkPreviewBlockObject;
  synced_block: OriginalSyncedBlockObject | ReferencedSyncedBlockObject;
  template: TemplateBlockObject;
  link_to_page: LinkToPageBlockObject;
  unsupported: UnsupportedBlockObject;
};

export type BlockObjectType =
  | ParagraphBlockObject
  | HeadingOneBlockObject
  | HeadingTwoBlockObject
  | HeadingThreeBlockObject
  | CallOutBlockObject
  | QuoteBlockObject
  | BulletedListItemBlockObject
  | NumberedListItemBlockObject
  | TodoBlockObject
  | ToggleBlockObject
  | CodeBlockObject
  | ChildPageBlockObject
  | ChildDatabaseBlockObject
  | EmbedBlockObject
  | ImageBlockObject
  | VideoBlockObject
  | FileBlockObject
  | PDFBlockObject
  | BookmarkBlockObject
  | EquationBlockObject
  | DividerBlockObject
  | TableOfContentsBlockObject
  | BreadcrumbBlockObject
  | ColumnListBlockObject
  | ColumnChildBlockObject
  | LinkPreviewBlockObject
  | LinkToPageBlockObject
  | OriginalSyncedBlockObject
  | ReferencedSyncedBlockObject
  | UnsupportedBlockObject;

export type NotionBlockObject =
  | (BaseObject & PickOneWithType<NotionBlockVariants>)
  | {
      object: 'list';
      id: string;
      created_time: string; // ISO 8601 date time string
      last_edited_time: string; // ISO 8601 date time string
      last_edited_by: string;
      has_children: boolean;
      type: 'block_list';
      archived: boolean;
      block_list: NotionBlockObject[];
    };

type NotionPageTitleProperty = {
  title: {
    id: 'title';
    type: 'title';
    title: BaseTextType;
  };
};

export type NotionParentAndProperty =
  | {
      parent: { type: 'database_id'; database_id: { database_id: string } };
      properties: { database: unknown };
    }
  | {
      parent: { type: 'page_id'; page_id: { page_id: string } };
      properties: NotionPageTitleProperty;
    }
  | {
      parent: { type: 'workspace'; workspace: { workspace: boolean } };
      properties: NotionPageTitleProperty;
    };

export type NotionPageObject = {
  object: 'page';
  id: string;
  created_time: string; // ISO 8601 date time string
  last_edited_time: string; // ISO 8601 date time string
  last_edited_by: string;
  archived: boolean;
  icon: FileObject | EmojiObject;
  cover: FileObject;
  url: string;
} & NotionParentAndProperty;

export type NotionBlockChildObject = {
  object: ObjectType;
  results: NotionBlockObject[];
};
