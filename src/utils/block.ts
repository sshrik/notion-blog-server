import { NotionBlockObject } from 'src/types/notion';

export function generateDefaultBlock(): NotionBlockObject {
  return {
    object: 'block',
    id: '',
    created_time: '',
    last_edited_time: '',
    has_children: false,
    type: 'paragraph',
    archived: false,
    paragraph: {
      text: [],
    },
  };
}

export function generateListBlock(defaultValue: NotionBlockObject) {
  return {
    ...defaultValue,
    object: 'list',
    type: 'block_list',
    block_list: [] as NotionBlockObject[],
  };
}
