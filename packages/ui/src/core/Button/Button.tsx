import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  startDecoration?: ReactNode;
  endDecoration?: ReactNode;
  variant?: "contained" | "outline" | "destructive" | "ghost";
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "contained",
      className = "",
      startDecoration,
      endDecoration,
      children,
      fullWidth = false,
      ...buttonProps
    } = props;
    return (
      <button
        className={`${styles.button} ${className} ${
          styles[variant]
        } ${fullWidth ? styles.fullWidth : ""}`}
        ref={ref}
        {...buttonProps}
      >
        {startDecoration && (
          <span className={`${styles.decoration} ${styles.start}`}>
            {startDecoration}
          </span>
        )}
        <p className={styles.buttonText}>{children}</p>
        {endDecoration && (
          <span className={`${styles.decoration} ${styles.end}`}>
            {endDecoration}
          </span>
        )}
      </button>
    );
  }
);
export default Button;
