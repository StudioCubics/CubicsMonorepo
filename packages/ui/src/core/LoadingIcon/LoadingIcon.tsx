import { CSSProperties } from "react";
import styles from "./LoadingIcon.module.scss";

interface LoadingIconProps {
  width?: number;
  height?: number;
  fill?: CSSProperties["fill"];
}

export default function LoadingIcon({
  width = 24,
  height = 24,
  fill = "var(--secondary-text)",
}: LoadingIconProps) {
  return (
    <div className={styles.container}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className={styles.spinner}
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
          fill={fill}
        />
        <rect
          className={`${styles.spinner} ${styles.spinner_trailing}`}
          x="1"
          y="1"
          rx="1"
          width="10"
          height="10"
          fill={fill}
          fillOpacity={0.5}
        />
      </svg>
    </div>
  );
}
