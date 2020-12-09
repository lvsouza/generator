import React from 'react';
import { IObservable, useObserver } from 'react-observing';

interface IPatternCellPropProps {
  required?: boolean;
  suggestions?: string[];
  pattern: IObservable<boolean | number | string | Date | ''>;
  type: 'text' | 'select' | 'checkbox' | 'number' | 'date' | undefined;
}
export const PatternCellProp: React.FC<IPatternCellPropProps> = ({ pattern, type, suggestions, required = false }) => {
  const [value, setValue] = useObserver(pattern);

  if (!type || type === 'checkbox') return (
    <td align="center" className="border-default pointer focus" tabIndex={0} onClick={() => setValue(!value)} onKeyPress={() => setValue(!value)}>
      <input type="checkbox" required={required} className="padding-xs" tabIndex={-1} checked={Boolean(value)} onChange={() => setValue(!value)} />
    </td>
  );

  if (type === 'select') return (
    <td align="center" className="border-default pointer focus">
      <select required={required} className="padding-xs background-transparent" value={value.toString()} style={{ width: 100 }} onChange={e => setValue(e.target.value)}>
        <option value="">Select</option>
        {suggestions &&
          suggestions.map((suggestion, index) => <option key={index} value={suggestion}>{suggestion}</option>)
        }
      </select>
    </td>
  );

  return (
    <td align="center" className="border-default pointer focus">
      <input type={type} className="padding-xs" required={required} value={value.toString()} onChange={e => setValue(e.target.value)} />
    </td>
  );
};
