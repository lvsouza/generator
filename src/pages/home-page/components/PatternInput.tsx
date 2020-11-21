import React from 'react';
import { IObservable, useObserver } from 'react-observing';

import { IPatternProps } from '../../../shared/interfaces';

interface IPatternInputProps {
  patternProps: IPatternProps;
  value: IObservable<string>;
}
export const PatternInput: React.FC<IPatternInputProps> = ({ value, patternProps: { displayName, description } }) => {
  const [state, setState] = useObserver(value);

  return (
    <label className="margin-top-m" title={description}>
      {displayName}<br />
      <input
        required
        value={state}
        style={{ width: 300 }}
        onChange={e => setState(e.target.value)}
      />
    </label>
  );
};
