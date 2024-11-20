import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import styles from "./AppContainer.module.scss";

type AppContainerProps = {
  headerSlot?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

const AppContainer = forwardRef<HTMLDivElement, AppContainerProps>(
  ({ headerSlot, children, className, ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={`${className} ${styles.appContainer}`}
      >
        {headerSlot}
        {children}
      </div>
    );
  }
);

export default AppContainer;
