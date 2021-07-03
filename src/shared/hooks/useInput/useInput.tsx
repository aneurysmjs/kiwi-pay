import { useState } from 'react';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type UseInput = {
  value: string | number;
  onChange(evt: InputEvent): void;
};

const useInput = (initialValue: string | number): UseInput => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (evt: InputEvent): void => {
    setValue(evt.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;
