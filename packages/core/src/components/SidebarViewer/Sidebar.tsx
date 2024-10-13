import useDisclosure from "../../utils/hooks/useDisclosure";
import {
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from "react";
import IconButton from "../IconButton/IconButton";
import styles from "./SidebarViewer.module.scss";
import List from "../List/List";
import ListItem, { ListItemProps } from "../List/ListItem";

export type SidebarProps = {
  sidebarLinks: ListItemProps[];
  selected?: ListItemProps["selected"];
  children?: ReactNode;
  variant?: "primary" | "secondary";
  renderToggle?: boolean;
  component?: ElementType;
  currentItem?: string;
} & ComponentPropsWithoutRef<"div">;

const SidebarInner: ForwardRefRenderFunction<HTMLDivElement, SidebarProps> = (
  props,
  ref
) => {
  const {
    sidebarLinks,
    selected,
    children,
    currentItem,
    variant = "primary",
    renderToggle = true,
    className = "",
    component = "div",
    ...rest
  } = props;

  const Component = component;
  const { open, handleToggle, handleOpen } = useDisclosure(true);

  return (
    <Component
      className={`${styles.sidebar} ${className} ${styles[variant]} ${
        open ? "" : styles["closed"]
      }`}
      ref={ref}
      {...rest}
    >
      {renderToggle && (
        <IconButton
          variant="ghost"
          className={styles.sidebar_trigger}
          onClick={handleToggle}
        >
          open icon
        </IconButton>
      )}
      {/* {open && children} */}
      <List>
        {sidebarLinks.map((li) => (
          <ListItem
            key={li.title}
            shortened={!open}
            onClick={(e) => {
              handleOpen();
              li.onClick && li.onClick(e);
            }}
            selected={selected}
            {...li}
          />
        ))}
      </List>
    </Component>
  );
};

const Sidebar = forwardRef(SidebarInner);

export default Sidebar;
