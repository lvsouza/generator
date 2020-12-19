import { IObservable } from 'react-observing';

export interface IFileToMoveCreator {
  originalName: IObservable<string>;
  targetPath: IObservable<string>;
  newName: IObservable<string>;
}
