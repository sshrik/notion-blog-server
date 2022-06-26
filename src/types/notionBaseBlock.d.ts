import { NotionBlockObject } from './notion.d';
import { RichTextType, ColorType, CodeLanguageType } from './notionBaseType.d';

type Annotation = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: ColorType;
};

type Text = {
  content: string;
  link: { url: string } | null;
};

type RichText = {
  plain_text: string;
  href: string | null;
  text: Text;
  annotations: Annotation;
  type: RichTextType;
};

export type MentionType = {
  type: 'user' | 'page' | 'database' | 'date' | 'link_preview';
};

export type FileObject = {
  type: 'external' | 'file';
  url: string;
  expiry_time?: string; // ISO 8601 date time string
};

export type EmojiObject = {
  type: 'emoji';
  emoji: string;
};

type OnlyTextType = {
  text: RichText[];
};

type TextWithChildType = OnlyTextType & {
  child?: NotionBlockObject[];
};

type Empty = Record<string, never>;

export type ParagraphBlockObject = TextWithChildType;

export type HeadingOneBlockObject = OnlyTextType;

export type HeadingTwoBlockObject = OnlyTextType;

export type HeadingThreeBlockObject = OnlyTextType;

export type CallOutBlockObject = TextWithChildType & {
  icon: FileObject | EmojiObject;
};

export type QuoteBlockObject = TextWithChildType;

export type BulletedListItemBlockObject = TextWithChildType;

export type NumberedListItemBlockObject = TextWithChildType;

export type TodoBlockObject = TextWithChildType & {
  checked?: boolean;
};

export type ToggleBlockObject = TextWithChildType;

export type CodeBlockObject = {
  text: string;
  language: CodeLanguageType;
};

export type ChildPageBlockObject = {
  title: string;
};

export type ChildDatabaseBlockObject = {
  title: string;
};

export type EmbedBlockObject = {
  url: string;
};

export type ImageBlockObject = {
  image: FileObject;
};

export type VideoBlockObject = {
  video: FileObject;
};

export type FileBlockObject = {
  file: FileObject;
};

export type PDFBlockObject = {
  pdf: FileObject;
};

export type BookmarkBlockObject = {
  url: string;
  caption: RichText[];
};

export type EquationBlockObject = {
  expression: string; // KaTeX compatible string
};

export type DividerBlockObject = Empty;

export type TableOfContentsBlockObject = Empty;

export type BreadcrumbBlockObject = Empty;

export type ColumnListBlockObject = Empty;

export type ColumnChildBlockObject = Empty;

export type ColumnValueBlockObject = {
  column: NotionBlockObject[];
};

export type LinkPreviewBlockObject = {
  url: string;
};

export type TemplateBlockObject = TextWithChildType;

export type LinkToPageBlockObject = {
  type: 'page_id' | 'database_id';
  page_id: string;
  database_id: string;
};

export type OriginalSyncedBlockObject = {
  synced_from: null;
  children: NotionBlockObject[]; // TODO: Check this part is really block.
};

export type ReferencedSyncedBlockObject = {
  synced_from: {
    type: 'block_id';
    block_id: string;
  };
};

export type UnsupportedBlockObject = Empty;
