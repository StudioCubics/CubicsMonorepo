import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styles from "./Input.module.scss";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  type: ComponentPropsWithoutRef<"input">["type"] | "select";
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  error?: boolean;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const {
      className = "",
      error,
      startAdornment,
      endAdornment,
      ...inputProps
    } = props;
    return (
      <div
        ref={ref}
        className={`${styles.container} ${className} ${
          error ? styles.error : ""
        } ${!!(startAdornment || endAdornment) ? styles.adornedInput : ""}`}
      >
        <div className={`${styles.adornment} ${styles.startAdornment}`}>
          {startAdornment}
        </div>
        <input
          {...inputProps}
          data-adorned={startAdornment ? "start" : endAdornment ? "end" : undefined}
        />
        <div className={`${styles.adornment} ${styles.endAdornment}`}>
          {endAdornment}
        </div>
      </div>
    );
  }
);

export default Input;
