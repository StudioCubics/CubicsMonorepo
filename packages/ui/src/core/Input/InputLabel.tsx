import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styles from "./Input.module.scss";

interface InputLabelProps extends ComponentPropsWithoutRef<"label"> {
  children: ReactNode;
  error?: boolean;
}
const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  function InputLabel(props, ref) {
    const { children, className = "", error, ...labelProps } = props;
    return (
      <label
        ref={ref}
        className={`${styles.label} ${className} ${error ? styles.error : ""}`}
        {...labelProps}
      >
        {children}
      </label>
    );
  }
);
export default InputLabel;
