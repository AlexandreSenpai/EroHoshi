import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export { Form } from '@unform/web';

export function Input({ name, ...rest }) {
  
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <input ref={inputRef} defaultValue={defaultValue} {...rest} />;
}

export function Checkbox({name, ...rest}){
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return <input ref={inputRef} defaultValue={defaultValue} {...rest} />;
}