import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styles from "./Form.module.scss";

export interface FormControlProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  function FormControl(props, ref) {
    const { children, className = "", ...divProps } = props;
    return (
      <div
        ref={ref}
        className={`${styles.form_control} ${className}`}
        {...divProps}
      >
        {children}
      </div>
    );
  }
);

export default FormControl;
