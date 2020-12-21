import React from 'react';
import { IObservable, useObserverValue } from 'react-observing';

interface NotHiddenProps<T> {
  /**
   *  Id true render the chidren
   */
  observable: IObservable<T>;
  children: React.ReactNode;
}
export function NotHidden<T>({ children, observable }: NotHiddenProps<T>): React.ReactElement {
  const value = useObserverValue(observable);
  return value ? <>{children}</> : <></>;
}
