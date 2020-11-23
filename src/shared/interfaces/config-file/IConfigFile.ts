import { IFileToMove } from './IFileToMove';
import { IPattern } from './IPatterns';

export interface IConfigFile {
  filesToMove: IFileToMove[];
  patterns: IPattern[];
}
