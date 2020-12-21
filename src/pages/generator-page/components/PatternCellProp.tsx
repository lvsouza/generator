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
    <td align="center" className="pointer focus" tabIndex={0} onClick={() => setValue(!value)} onKeyPress={() => setValue(!value)}>
      <input
        tabIndex={-1}
        type="checkbox"
        required={required}
        checked={Boolean(value)}
        placeholder="Type here..."
        onChange={() => setValue(!value)}
      />
    </td>
  );

  if (type === 'select') return (
    <td align="center" className="pointer focus">
      <select required={required} value={value.toString()} style={{ width: 100 }} onChange={e => setValue(e.target.value)}>
        <option value="">Select</option>
        {suggestions &&
          suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion}>{suggestion}</option>
          ))
        }
      </select>
    </td>
  );

  return (
    <td align="center" className="pointer focus">
      <input
        type={type}
        required={required}
        value={value.toString()}
        placeholder="Type here..."
        onChange={e => setValue(e.target.value)}
      />
    </td>
  );
};
