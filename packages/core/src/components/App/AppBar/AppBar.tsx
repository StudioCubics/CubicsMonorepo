import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import styles from "./Appbar.module.scss";

export type AppbarProps = (
  | { type: "sticky"; placement?: "bottom" | "top" }
  | { type?: "normal" }
) &
  ComponentPropsWithoutRef<"nav">;

const AppBar = forwardRef<HTMLElement, AppbarProps>(
  function Appbar(props, ref) {
    const { className = "", children, type, ...rest } = props;
    const placement = type === "sticky" ? props.placement : undefined;
    const placementCn = placement ? styles[placement] : "";
    const typeCn = type == "sticky" ? styles.sticky : "";
    return (
      <nav
        ref={ref}
        className={`${styles.nav} ${placementCn} ${typeCn} ${className}`}
        {...rest}
      >
        {children}
      </nav>
    );
  }
);

export default AppBar;
