import {
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from "react";
import styles from "./List.module.scss";

export type ListProps = {
  children: ReactNode;
  ordered?: boolean;
} & ComponentPropsWithoutRef<"ul" | "ol">;

const ListInner: ForwardRefRenderFunction<HTMLOListElement, ListProps> = (
  props,
  ref
) => {
  const { children, ordered = false, className = "", ...rest } = props;

  const Component = ordered ? "ol" : "ul";
  return (
    <Component ref={ref} className={`${styles.list} ${className}`} {...rest}>
      {children}
    </Component>
  );
};
const List = forwardRef(ListInner);

export default List;
