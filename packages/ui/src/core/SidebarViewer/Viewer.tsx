import {
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from "react";
import styles from "./SidebarViewer.module.scss";

export type ViewerProps = {
  children: ReactNode;
  title?: string;
  component?: ElementType;
} & ComponentPropsWithoutRef<"div">;

const ViewerInner: ForwardRefRenderFunction<HTMLDivElement, ViewerProps> = (
  props,
  ref
) => {
  const { children, title, className = "", component = "div", ...rest } = props;

  const Component = component;

  return (
    <Component
      className={`${styles.main} ${title ? styles.withTitle : ""}`}
      ref={ref}
      {...rest}
    >
      {title && <h3>{title}</h3>}
      {children}
    </Component>
  );
};

const Viewer = forwardRef(ViewerInner);

export default Viewer;
