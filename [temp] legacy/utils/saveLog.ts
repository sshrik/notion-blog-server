import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

function resolveLocation(filePostfix?: string): string {
  const __dirname = path.resolve();
  return path.resolve(__dirname, 'public', `${filePostfix}-${v4()}.json`);
}

export function save(data: string, filePostfix?: string) {
  fs.writeFileSync(resolveLocation(filePostfix), data);
}

export function saveWithFileName(data: string, saveWith: string) {
  const __dirname = path.resolve();
  const saveTo = path.resolve(__dirname, 'public', saveWith);
  fs.writeFileSync(saveTo, data);
}
