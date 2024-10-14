"use client";
import React, { forwardRef, useState } from "react";
import IconButton from "../IconButton/IconButton";
import Input, { InputProps } from "../Input/Input";
import InputLabel from "../Input/InputLabel";
import FormControl from "./FormControl";
import FormMessage from "./FormMessage";

export interface CredentialsForm {
  [key: string]: string;
}

export interface FormInputProps extends InputProps {
  id: string;
  name: string;
  loading?: boolean;
  helperText?: string;
  pattern?: string;
  label?: string;
  hideLabel?: boolean;
  inputClassName?: string;
}

const FormInput = forwardRef<HTMLDivElement, FormInputProps>(
  function FormInput(props, ref) {
    const {
      id,
      name,
      className,
      helperText,
      loading,
      label,
      hideLabel,
      pattern,
      inputClassName,
      ...inputProps
    } = props;
    const [wrongInput, setWrongInput] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      if (pattern) {
        const pat = new RegExp(pattern);
        setWrongInput(!pat.test(e.target.value) && e.target.value != "");
      }
    }
    function handleClickShowPassword() {
      setShowPassword((show) => !show);
    }

    const passwordAdornment = (
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        variant="ghost"
      >
        {showPassword ? "Eye" : "Die"}
      </IconButton>
    );

    return (
      <FormControl className={className} ref={ref}>
        {label && !hideLabel && (
          <InputLabel htmlFor={id} error={wrongInput}>
            {label}
            {inputProps.required && " *"}
          </InputLabel>
        )}

        <Input
          {...inputProps}
          className={inputClassName}
          name={name}
          error={wrongInput}
          onBlur={handleFocus}
          disabled={loading}
          type={
            inputProps.type == "password"
              ? showPassword
                ? "text"
                : inputProps.type
              : inputProps.type
          }
          endAdornment={
            inputProps.type == "password"
              ? passwordAdornment
              : inputProps.endAdornment
          }
        />
        <FormMessage>{wrongInput && helperText}</FormMessage>
      </FormControl>
    );
  }
);
export default FormInput;
