import path from 'path';
import * as fs from 'fs';

import { IFileStructure } from './IFileStructure';

type IFolderStructure<T> = Omit<IFileStructure<T>, 'childs'>;

export const readFolder = <T = undefined>(basePath: string): IFolderStructure<T>[] => {
  if (basePath === '') return [];

  const files = fs.readdirSync(basePath);
  const res: IFolderStructure<T>[] = [];

  files.forEach(fileName => {
    const current = fs.statSync(path.join(basePath, fileName));

    if (!current.isDirectory()) return;

    res.push({
      fullName: path.parse(path.join(basePath, fileName)).base,
      name: path.parse(path.join(basePath, fileName)).name,
      path: path.parse(path.join(basePath, fileName)).dir,
      isDirectory: current.isDirectory()
    });
  });

  return res;
};
