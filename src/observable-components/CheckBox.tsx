import React, { memo, useCallback, useEffect } from 'react';
import { IObservable, observe, useObserver } from 'react-observing';

export interface CheckBoxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  observable?: IObservable<boolean | undefined>
};

export const CheckBox = memo(React.forwardRef<HTMLInputElement, CheckBoxProps>(({ observable, checked = false, onChange, name, ...props }, ref) => {
  const [inputValue, setInputValue] = useObserver(observable || observe(checked));

  useEffect(() => {
    if (!observable) {
      setInputValue(checked);
    }
  }, [checked, observable, setInputValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Boolean(e.currentTarget.value));
    onChange && onChange(e);
  }, [onChange, setInputValue]);

  return <input {...props} ref={ref} name={name} checked={inputValue} onChange={handleChange} />;
}));
