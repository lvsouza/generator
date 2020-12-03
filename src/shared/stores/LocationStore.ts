import { observe } from 'react-observing';

import { IPattern, IFileToMove, IFileToChange, IPropertiesList, IPropertie } from '../interfaces';
import { configsStore } from '../../core/services';

export const ProjectLocationStore = {
  templatesPath: observe<string>(configsStore.get('templatePath')),
  projectPath: observe<string>(configsStore.get('projectPath')),
  filesToChange: observe<IFileToChange[]>([]),
  filesToMove: observe<IFileToMove[]>([]),
  patterns: observe<IPattern[]>([]),
  dataTypes: observe<string[]>([]),
  selectedTemplate: observe(''),
  propertiesPatterns: observe<{ propertiesList: IPropertiesList, properties: IPropertie[] }>({
    properties: [],
    propertiesList: {
      dataTypes: [],
      patterns: []
    }
  })
};
