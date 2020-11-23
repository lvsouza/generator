import { observe } from 'react-observing';

import { configsStore } from '../../core/services';
import { IPattern, IFileToMove } from '../interfaces';

export const ProjectLocationStore = {
  templatesPath: observe<string>(configsStore.get('templatePath')),
  projectPath: observe<string>(configsStore.get('projectPath')),
  filesToMove: observe<IFileToMove[]>([]),
  patterns: observe<IPattern[]>([]),
  selectedTemplate: observe('')
};
