import { IObservable } from 'react-observing';

export interface IPatternPropsCreator {
  /** Good name to show in a input label */
  displayName: IObservable<string>;
  /** This will help the users to know more details about the key */
  description: IObservable<string | undefined>;
  /** Field is used to suggest options in the inputs */
  suggestions: IObservable<string[] | undefined>;
  /** Field type */
  type: IObservable<'text' | 'number' | 'select' | undefined>;
}

export interface IPatternCreator {
  /** Key name used as a pattern to replace */
  key: IObservable<string>;
  /** Properties that will help to define values to replace the key */
  props: IPatternPropsCreator,
}
