import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";
import styles from "./Avatar.module.scss";

export type AvatarProps = {
  displayName: string;
  image?: string | null;
  size?: "small" | "medium" | "large";
  component?: ElementType;
} & ComponentPropsWithoutRef<"div">;

function getInitials(name: string) {
  var words = name.split(" ");
  var initials = "";
  for (var i = 0; i < words.length; i++) {
    initials += words[i][0].toUpperCase();
  }
  return initials;
}
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const {
      children,
      displayName,
      image,
      component: Component = "div",
      size = "medium",
      className = "",
      ...divProps
    } = props;

    return (
      <Component
        ref={ref}
        className={`${className} ${styles.container} ${styles[size]}`}
        {...divProps}
      >
        {image ? (
          <img src={image} alt={displayName} />
        ) : (
          <p>{getInitials(displayName)}</p>
        )}
      </Component>
    );
  }
);

export default Avatar;
