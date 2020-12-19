import React, { memo, useCallback, useEffect } from 'react';
import { IObservable, observe, useObserver } from 'react-observing';

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  observable?: IObservable<string | number | readonly string[] | undefined>
};

export const Input = memo(React.forwardRef<HTMLInputElement, InputProps>(({ observable, value = '', onChange, name, ...props }, ref) => {
  const [inputValue, setInputValue] = useObserver(observable || observe(value));

  useEffect(() => {
    if (!observable) {
      setInputValue(value);
    }
  }, [value, observable, setInputValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    onChange && onChange(e);
  }, [onChange, setInputValue]);

  return <input {...props} ref={ref} name={name} value={inputValue} onChange={handleChange} />;
}));
