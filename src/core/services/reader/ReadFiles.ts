import path from 'path';
import * as fs from 'fs';
import { uuid } from 'uuidv4';

import { IFileStructure } from './IFileStructure';

/**
 * Generator function that lists all files in a folder recursively
 * in a synchronous fashion
 *
 * @param String folder - folder to start with
 * @param Number recurseLevel - number of times to recurse folders
 * @returns {IterableIterator<String>}
 */
export function FolderReaderRecursive(basePath: string): IFileStructure {
  try {
    const current = fs.statSync(basePath);

    const loadChilds = (): IFileStructure[] => {
      if (!current.isDirectory()) {
        return [];
      }

      const files = fs.readdirSync(basePath);
      const res: IFileStructure[] = [];

      files.forEach(fileName => {
        res.push(FolderReaderRecursive(path.join(basePath, fileName)));
      });

      return res;
    };

    return {
      isDirectory: current.isDirectory(),
      fullName: path.parse(basePath).base,
      name: path.parse(basePath).name,
      path: path.parse(basePath).dir,
      uid: uuid(),
      get childs() {
        return loadChilds();
      }
    };
  } catch (err) {
    throw new Error('Unable to read the path: "' + basePath + '".');
  }
}
