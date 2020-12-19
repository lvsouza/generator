import { observe } from 'react-observing';

import { IConfigFileCreator } from '../interfaces';

export const ConfigFileCreatorStore: IConfigFileCreator = {
  filesToChange: observe([]),
  templateName: observe(''),
  filesToMove: observe([]),
  patterns: observe([]),
  customFields: {
    interableColumnPatterns: observe([]),
    columnPatterns: observe([])
  }
};
