import { BaseTextType } from 'src/types/notionBaseBlock';
import { ColorType } from 'src/types/notionBaseType.d';

export type Tag = { color: ColorType; label: string };

export type IconType = 'url' | 'string';

export type BlogFeed = {
  title: string;
  lastEdited: string;
  tags: Tag[];
  description: string;
  replImageLink: string;
};

export type BlogFolder = {
  blogFolderName: string;
  blogFeeds: BlogFeed[];
};

export type BlogMain = {
  coverImageLink: string;
  iconImageLink: string;
  iconType: IconType;
  blogTitle: BaseTextType;
  blogFolders: BlogFolder[];
};
