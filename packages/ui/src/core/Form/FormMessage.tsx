import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styles from "./Form.module.scss";

interface FormMessageProps extends ComponentPropsWithoutRef<"p"> {
  children: ReactNode;
}

const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  function FormMessage(props, ref) {
    const { children, className = "", ...pProps } = props;
    return (
      <p
        ref={ref}
        className={`${styles.form_message} ${className}`}
        {...pProps}
      >
        {children}
      </p>
    );
  }
);

export default FormMessage;
