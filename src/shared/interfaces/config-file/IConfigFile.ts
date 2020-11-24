import { IFileToChange } from './IFileToChange';
import { IFileToMove } from './IFileToMove';
import { IPattern } from './IPatterns';

export interface IConfigFile {
  filesToChange: IFileToChange[];
  filesToMove: IFileToMove[];
  patterns: IPattern[];
}
