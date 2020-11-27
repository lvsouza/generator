import * as fs from 'fs';

import { IFileStructure } from './../IFileStructure';

export const writeFile = (basePath: string, file: Omit<IFileStructure<string>, 'childs'>): void => {
  try {
    const folderPath = basePath.substring(basePath.indexOf(file.fullName) - 1, 0);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(basePath, file.content, { flag: 'w' });
  } catch (e) {
    console.log(e);
    throw new Error(`Failed to write the file to "${basePath}".\n${e.message}`);
  }
};
