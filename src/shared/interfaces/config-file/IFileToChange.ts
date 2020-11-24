export interface IFileToChangeAction {
  position: 'before' | 'after';
  contentTranspiled?: string[];
  description: string;
  content?: string[];
  target?: string;
}

export interface IFileToChange {
  actions: IFileToChangeAction[];
  pathString?: string;
  description: string;
  path: string[];
  name: string;
}
