import React from 'react';
import { IObservable, useObserver } from 'react-observing';

import { IPatternProps } from '../../../shared/interfaces';

interface IPatternInputProps {
  patternProps: IPatternProps;
  value: IObservable<string>;
  id: string | number;
}
export const PatternInput: React.FC<IPatternInputProps> = ({ value, id, patternProps: { displayName, description, suggestions = [], type = 'text' } }) => {
  const [state, setState] = useObserver(value);

  if (type === 'select') {
    return (
      <label className="margin-top-m" title={description}>
        {displayName}<br />
        <select
          required
          value={state}
          id={id.toString()}
          style={{ width: 300 }}
          onChange={e => setState(e.target.value)}
        >
          <option value="">Select</option>
          {suggestions.map((suggestion, index) => <option key={index} value={suggestion}>{suggestion}</option>)}
        </select>
      </label>
    );
  }

  return (
    <label className="margin-top-m" title={description}>
      {displayName}<br />
      <input
        required
        type={type}
        value={state}
        id={id.toString()}
        style={{ width: 300 }}
        list={id.toString() + '-suggestions'}
        onChange={e => setState(e.target.value)}
      />
      <datalist id={id.toString() + '-suggestions'}>
        {suggestions.map((suggestion, index) => <option key={index} value={suggestion} />)}
      </datalist>
    </label>
  );
};
