import React from 'react';
import { IObservable, useObserver } from 'react-observing';

import { IPatternProps } from '../../../shared/interfaces';

interface IPatternInputProps {
  value: IObservable<string | number | boolean>;
  patternProps: IPatternProps;
  id: string | number;
}
export const PatternInput: React.FC<IPatternInputProps> = ({ value, id, patternProps: { displayName, description, suggestions = [], type = 'text' } }) => {
  const [state, setState] = useObserver(value);

  if (type === 'select') {
    return (
      <tr>
        <td>
          <label className="padding-xs padding-right-m flex1 border-default-transparent" title={description} htmlFor={id.toString()}>
            {displayName}
          </label>
        </td>
        <td>
          <select
            required
            id={id.toString()}
            style={{ width: 300 }}
            value={state.toString()}
            onChange={e => setState(e.target.value)}
            className="padding-xs border-default-transparent border-radius-none"
          >
            <option value="">Select</option>
            {suggestions.map((suggestion, index) => <option key={index} value={suggestion}>{suggestion}</option>)}
          </select>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <label className="padding-xs padding-right-m flex1 border-default-transparent" title={description} htmlFor={id.toString()}>
          {displayName}
        </label>
      </td>
      <td>
        <input
          required
          type={type}
          id={id.toString()}
          style={{ width: 300 }}
          value={state.toString()}
          list={id.toString() + '-suggestions'}
          className="padding-xs border-default-transparent border-radius-none"
          onChange={e => setState(e.target.value)}
        />
        <datalist id={id.toString() + '-suggestions'}>
          {suggestions.map((suggestion, index) => <option key={index} value={suggestion} />)}
        </datalist>
      </td>
    </tr>
  );
};
