import { IObservable } from 'react-observing';

import { IColumnPatterns } from './ICustomFields';

export interface ILine {
  [key: string]: IObservable<boolean | number | string | Date | ''>;
}

export interface IColumn extends IColumnPatterns {
  content?: string[];
}

export interface IInternalCustomFields {
  columns: IObservable<IColumn[]>;
  lines: IObservable<ILine[]>;
}
