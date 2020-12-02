import { IObservable } from 'react-observing';

export interface IPropertie {
    [key: string]: IObservable<boolean | number | string | ''>;
    maxLength: IObservable<number | ''>;
    minLength: IObservable<number | ''>;
    defaultValue: IObservable<string>;
    allowNull: IObservable<boolean>;
    name: IObservable<string>;
    type: IObservable<string>;
}

export interface IPropertiesPattern {
    contentString?: string;
    content: string[];
    key: string;
}
