import { IObservable } from 'react-observing';

export interface IFileToChangeActionCreator {
  position: IObservable<'before' | 'after'>;
  content: IObservable<string | undefined>;
  target: IObservable<string | undefined>;
  description: IObservable<string>;
}

export interface IFileToChangeCreator {
  actions: IObservable<IFileToChangeActionCreator[]>;
  isShowActions: IObservable<boolean>;
  description: IObservable<string>;
  path: IObservable<string>;
  name: IObservable<string>;
}
