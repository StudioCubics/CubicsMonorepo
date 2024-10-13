import React, {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import useDisclosure from "../../utils/hooks/useDisclosure";
import List from "./List";
import styles from "./List.module.scss";

export type ListItemProps = {
  title: string;
  icon?: JSX.Element;
  path?: string;
  nodes?: ListItemProps[];
  shortened?: boolean;
  selected?: boolean;
  component?: ElementType;
} & ComponentPropsWithoutRef<"li">;

const ListItemInner: ForwardRefRenderFunction<HTMLLIElement, ListItemProps> = (
  props,
  ref
) => {
  const {
    className = "",
    icon,
    title,
    onClick,
    selected,
    shortened = false,
    path,
    component = "li",
    ...liProps
  } = props;

  const selectedClass = selected ? styles.selected : "";
  const Component = path ? "a" : component;
  const { open, handleToggle } = useDisclosure(false);

  // If there are nodes then render the nodes below the parent items
  if (props.nodes && props.nodes.length > 0) {
    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
      if (onClick) onClick(e);
      handleToggle();
    };
    const expandedClass = open ? styles.expanded : "";
    return (
      <>
        <Component
          className={`${styles.listItem} ${className} ${expandedClass} ${selectedClass}`}
          ref={ref}
          onClick={handleClick}
        >
          <span className={styles.details}>
            <h3 className={styles.icon}>{props.icon}</h3>
            {!shortened && <p>{props.title}</p>}
          </span>
          {!shortened && <span className={styles.expandIcon}>{">"}</span>}
        </Component>
        <List
          className={`${styles.listNodes} ${expandedClass}`}
          style={{ "--list-count": props.nodes.length } as CSSProperties}
        >
          {props.nodes.map((node) => (
            <ListItem
              key={node.title}
              selected={selected}
              shortened={shortened}
              {...node}
            />
          ))}
        </List>
      </>
    );
  }
  return (
    <Component
      ref={ref}
      onClick={onClick}
      className={`${styles.listItem} ${className} ${selectedClass}`}
      href={path ? path : undefined}
      {...liProps}
    >
      <h3 className={styles.icon}>{props.icon}</h3>
      {!shortened && <p>{props.title}</p>}
    </Component>
  );
};

const ListItem = forwardRef(ListItemInner);
export default ListItem;
