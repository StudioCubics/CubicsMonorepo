import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./Avatar.module.scss";

export interface AvatarProps extends ComponentPropsWithoutRef<"div"> {
  displayName: string;
  image?: string | null;
  size?: "small" | "medium" | "large";
  button?: boolean;
}
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
      button,
      size = "medium",
      className = "",
      ...divProps
    } = props;

    const getSize = () => {
      switch (size) {
        case "small":
          return 16;
          break;
        case "large":
          return 40;
          break;
        default:
          return 24;
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={`${className} ${styles.container} ${styles[size]}`}
        {...divProps}
      >
        {image ? (
          <img
            src={image}
            alt={displayName}
            width={getSize()}
            height={getSize()}
          />
        ) : (
          <p>{getInitials(displayName)}</p>
        )}
      </div>
    );
  }
);

export default Avatar;
