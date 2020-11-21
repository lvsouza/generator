import { observe } from 'react-observing';

import { IPattern } from '../interfaces';

export const ProjectLocationStore = {
  patterns: observe<IPattern[]>([]),
  selectedTemplate: observe(''),
  templatesPath: observe(''),
  projectPath: observe('')
};
