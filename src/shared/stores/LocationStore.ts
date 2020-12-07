import { observe } from 'react-observing';

import { IGenetatorStepsStore, ILine } from '../interfaces';
import { configsStore } from '../../core/services';

export const ProjectLocationStore: IGenetatorStepsStore = {
  templatesPath: observe(configsStore.get('templatePath')),
  projectPath: observe(configsStore.get('projectPath')),
  selectedTemplate: observe(''),
  filesToChange: observe([]),
  filesToMove: observe([]),
  patterns: observe([]),
  customFields: {
    columns: observe([]),
    lines: observe<ILine[]>([])
  }
};
