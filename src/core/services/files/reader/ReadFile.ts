import path from 'path';
import * as fs from 'fs';

import { IFileStructure } from '../IFileStructure';

export const readFile = (basePath: string): Omit<IFileStructure<string>, 'childs'> => {
  const file = fs.readFileSync(basePath);

  const res: IFileStructure<string> = {
    fullName: path.parse(path.join(basePath)).base,
    name: path.parse(path.join(basePath)).name,
    path: path.parse(path.join(basePath)).dir,
    content: file.toString(),
    isDirectory: false
  };

  return res;
};
