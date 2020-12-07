import { IObservable } from 'react-observing';

import { IInternalCustomFields } from './config-file/IInternalCustomFields';
import { IFileToChange } from './config-file/IFileToChange';
import { IFileToMove } from './config-file/IFileToMove';
import { IPattern } from './config-file/IPatterns';

export interface IGenetatorStepsStore {
  /** Step 1 */
  projectPath: IObservable<string>;
  /** Step 2 */
  templatesPath: IObservable<string>;
  /** Step 3 */
  selectedTemplate: IObservable<string>;
  /** Step 4 */
  patterns: IObservable<IPattern[]>;
  /** Step 5 */
  customFields: IInternalCustomFields;
  /** Step 6 */
  filesToMove: IObservable<IFileToMove[]>;
  /** Step 7 */
  filesToChange: IObservable<IFileToChange[]>;
}
