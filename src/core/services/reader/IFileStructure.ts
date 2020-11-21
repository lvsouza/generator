export interface IFileStructure<T> {
  childs?: IFileStructure<T>[];
  isDirectory: boolean;
  fullName: string;
  content?: T;
  name: string;
  path: string;
}
