import { observe } from 'react-observing';

import { IPattern, IFileToMove, IFileToChange, IPropertiesPattern, IPropertie } from '../interfaces';
import { configsStore } from '../../core/services';

export const ProjectLocationStore = {
  propertiesPatterns: observe<{ patterns: IPropertiesPattern[], properties: IPropertie[] }>({ patterns: [], properties: [] }),
  templatesPath: observe<string>(configsStore.get('templatePath')),
  projectPath: observe<string>(configsStore.get('projectPath')),
  filesToChange: observe<IFileToChange[]>([]),
  filesToMove: observe<IFileToMove[]>([]),
  patterns: observe<IPattern[]>([]),
  dataTypes: observe<string[]>([]),
  selectedTemplate: observe('')
};
