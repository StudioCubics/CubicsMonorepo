import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./IconButton.module.scss";

export type IconButtonProps = {
  variant?: "contained" | "outline" | "destructive" | "ghost";
} & ComponentPropsWithoutRef<"button">;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const {
      variant = "contained",
      className = "",
      children,
      ...iconButtonProps
    } = props;
    return (
      <button
        className={`${styles.iconButton} ${
          styles[`iconButton_${variant}`]
        } ${className}`}
        ref={ref}
        {...iconButtonProps}
      >
        {children}
      </button>
    );
  }
);
export default IconButton;
