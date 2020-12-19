import React, { memo, useCallback, useEffect } from 'react';
import { IObservable, observe, useObserver } from 'react-observing';

export interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  observable?: IObservable<string | number | readonly string[] | undefined>
};
export const Select = memo(React.forwardRef<HTMLSelectElement, SelectProps>(({ observable, value = '', onChange, ...props }, ref) => {
  const [selectValue, setSelectValue] = useObserver(observable || observe(value));

  useEffect(() => {
    if (!observable) {
      setSelectValue(value);
    }
  }, [value, observable, setSelectValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.currentTarget.value);
    onChange && onChange(e);
  }, [onChange, setSelectValue]);

  return <select {...props} ref={ref} value={selectValue} onChange={handleChange} />;
}));
