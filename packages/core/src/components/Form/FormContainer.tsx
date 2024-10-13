import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styles from "./Form.module.scss";

interface FormContainerProps extends ComponentPropsWithoutRef<"form"> {
  children: ReactNode;
  error?: boolean;
}

const FormContainer = forwardRef<HTMLFormElement, FormContainerProps>(
  function FormContainer(props, ref) {
    const { children, className, error, ...formProps } = props;
    return (
      <form
        ref={ref}
        className={`${styles.form_container} ${className} ${
          error ? styles.error : ""
        }`}
        {...formProps}
      >
        {children}
      </form>
    );
  }
);

export default FormContainer;
