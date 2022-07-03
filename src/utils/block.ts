import { NotionBlockObject } from 'src/types/notion';

export function generateDefaultBlock(): NotionBlockObject {
  return {
    object: 'block',
    id: '',
    created_time: '',
    last_edited_time: '',
    last_edited_by: '',
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
    object: 'list',
    id: defaultValue.id,
    created_time: defaultValue.created_time,
    last_edited_time: defaultValue.last_edited_time,
    last_edited_by: defaultValue.last_edited_by,
    has_children: defaultValue.has_children,
    archived: defaultValue.archived,
    type: 'block_list',
    block_list: [] as NotionBlockObject[],
  };
}
