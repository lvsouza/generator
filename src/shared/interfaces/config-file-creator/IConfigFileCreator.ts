import { IObservable } from 'react-observing';

import { ICustomFieldsCreator } from './ICustomFieldsCreator';
import { IFileToChangeCreator } from './IFileToChangeCreator';
import { IFileToMoveCreator } from './IFileToMoveCreator';
import { IPatternCreator } from './IPatternsCreator';

export interface IConfigFileCreator {
  filesToChange: IObservable<IFileToChangeCreator[]>;
  filesToMove: IObservable<IFileToMoveCreator[]>;
  patterns: IObservable<IPatternCreator[]>;
  customFields: ICustomFieldsCreator;
  templateName: IObservable<string>;
  toString(): string;
}
