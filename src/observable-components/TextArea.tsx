import React, { memo, useCallback, useEffect } from 'react';
import { IObservable, observe, useObserver } from 'react-observing';

export interface TextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  observable?: IObservable<string | number | readonly string[] | undefined>
};

export const TextArea = memo(React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ observable, value = '', onChange, ...props }, ref) => {
  const [textAreaValue, setTextAreaValue] = useObserver(observable || observe(value));

  useEffect(() => {
    if (!observable) {
      setTextAreaValue(value);
    }
  }, [value, observable, setTextAreaValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.currentTarget.value);
    onChange && onChange(e);
  }, [onChange, setTextAreaValue]);

  return <textarea {...props} ref={ref} value={textAreaValue} onChange={handleChange} />;
}));
