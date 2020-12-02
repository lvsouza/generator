import { IObservable } from 'react-observing';

export interface IPatternProps {
  /** Good name to show in a input label */
  displayName: string;
  /** This will help the users to know more details about the key */
  description?: string;
  /** Field is used to suggest options in the inputs */
  suggestions?: string[];
  /** Field type */
  type?: 'text' | 'number' | 'select';
}

export interface IPattern {
  /** Key name used as a pattern to replace */
  key: string;
  /** User inserted value */
  value?: IObservable<string | number | boolean>;
  /** Properties that will help to define values to replace the key */
  props: IPatternProps,
}
