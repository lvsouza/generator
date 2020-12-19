import React from 'react';
import { IObservable, useObserverValue } from 'react-observing';

interface HiddenProps<T> {
  /**
   *  Id true not render the chidren
   */
  observable: IObservable<T>;
  children: React.ReactNode;
}
export function Hidden<T>({ children, observable }: HiddenProps<T>): React.ReactNode {
  const value = useObserverValue(observable);
  return value ? null : <>{children}</>;
}
