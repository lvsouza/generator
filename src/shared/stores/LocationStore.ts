import { observe } from 'react-observing';

import { IPattern, IFileToMove, IFileToChange } from '../interfaces';
import { configsStore } from '../../core/services';

export const ProjectLocationStore = {
  templatesPath: observe<string>(configsStore.get('templatePath')),
  projectPath: observe<string>(configsStore.get('projectPath')),
  filesToChange: observe<IFileToChange[]>([]),
  filesToMove: observe<IFileToMove[]>([]),
  patterns: observe<IPattern[]>([]),
  selectedTemplate: observe('')
};
