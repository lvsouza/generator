import { IPropertiesList } from './IPropertiesList';
import { IFileToChange } from './IFileToChange';
import { IFileToMove } from './IFileToMove';
import { IPattern } from './IPatterns';

export interface IConfigFile {
  propertiesList: IPropertiesList;
  filesToChange: IFileToChange[];
  filesToMove: IFileToMove[];
  patterns: IPattern[];
}
