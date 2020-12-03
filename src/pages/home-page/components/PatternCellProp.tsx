import React from 'react';
import { IObservable, useObserver } from 'react-observing';

interface IPatternCellPropProps {
    pattern: IObservable<string | number | boolean>;
}
export const PatternCellProp: React.FC<IPatternCellPropProps> = ({ pattern }) => {
  const [value, setValue] = useObserver(pattern);

  return (
    <td align="center" className="border-default pointer focus" tabIndex={0} onClick={() => setValue(!value)} onKeyPress={() => setValue(!value)}>
      <input type="checkbox" className="padding-xs" tabIndex={-1} checked={Boolean(value)} onChange={() => setValue(!value)} />
    </td>
  );
};
