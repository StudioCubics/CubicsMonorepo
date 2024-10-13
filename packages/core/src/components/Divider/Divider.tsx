import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./Divider.module.scss";

interface DividerProps extends ComponentPropsWithoutRef<"hr"> {
  children?: string;
  orientation?: "horizontal" | "vertical";
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  function Divider(props, ref) {
    const {
      children,
      orientation = "horizontal",
      className = "",
      ...hrProps
    } = props;
    const line = (
      <hr
        className={`${styles.divider} ${styles[orientation]} ${!!!children ? className : ""}`}
        {...hrProps}
        ref={ref}
      />
    );
    if (children)
      return (
        <div
          className={`${styles.container} ${styles[orientation]} ${className}`}
        >
          {line}
          <p>{children}</p>
          {line}
        </div>
      );
    return line;
  }
);

export default Divider;
