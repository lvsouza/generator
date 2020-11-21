import { IFileStructure } from './IFileStructure';
import { readFile } from './ReadFile';

type IJsonFileStructure<T> = Omit<IFileStructure<T>, 'childs'>;

export const readJsonFile = <T = string>(basePath: string): IJsonFileStructure<T> => {
  try {
    const file = readFile(basePath);

    return {
      ...file,
      content: JSON.parse(file.content || '')
    };
  } catch (e) {
    console.error('Something is wrong in "readJsonFile": ', e);
    return {
      content: undefined,
      isDirectory: false,
      fullName: '',
      name: '',
      path: ''
    };
  };
};
