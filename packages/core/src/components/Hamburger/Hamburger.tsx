import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./Hamburger.module.scss";

export interface IHamburger extends ComponentPropsWithoutRef<"div"> {
  open: boolean;
}

const Hamburger = forwardRef<HTMLDivElement, IHamburger>(function Hamburger(
  props,
  ref
) {
  const { open, className = "", ...divProps } = props;
  return (
    <div
      ref={ref}
      className={`${styles.hamburgerIcon} ${
        open ? styles.open : ""
      } ${className}`}
      {...divProps}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
});
export default Hamburger;
