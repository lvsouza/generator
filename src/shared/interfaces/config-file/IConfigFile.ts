import { ICustomFields } from './ICustomFields';
import { IFileToChange } from './IFileToChange';
import { IFileToMove } from './IFileToMove';
import { IPattern } from './IPatterns';

export interface IConfigFile {
  filesToChange: IFileToChange[];
  customFields: ICustomFields;
  filesToMove: IFileToMove[];
  patterns: IPattern[];
}
