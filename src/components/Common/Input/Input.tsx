import React, { Fragment } from 'react';

type PropsType = {
  ariaDescribedBy?: string;
  id?: string;
  label?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string | number;
};

const Input = ({
  ariaDescribedBy = 'inputDescribedBy',
  id = 'inputId',
  name = 'inputName',
  label = 'inputLabel',
  disabled = false,
  onChange = (): void => {},
  placeholder,
  required = false,
  type = 'text',
  value = '',
}: PropsType): JSX.Element => {
  return (
    <Fragment>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        aria-describedby={ariaDescribedBy}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </Fragment>
  );
};

export default Input;
