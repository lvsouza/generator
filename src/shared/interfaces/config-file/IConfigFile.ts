import { IPropertiesPattern } from './IPropertiesPatterns';
import { IFileToChange } from './IFileToChange';
import { IFileToMove } from './IFileToMove';
import { IPattern } from './IPatterns';

export interface IConfigFile {
  propertiesPatterns: IPropertiesPattern[];
  filesToChange: IFileToChange[];
  filesToMove: IFileToMove[];
  patterns: IPattern[];
  dataTypes: string[];
}
