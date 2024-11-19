"use client";
import {
  RefObject,
  useRef,
  useEffect,
  useCallback,
  type MouseEvent,
  type ComponentPropsWithoutRef,
} from "react";
import styles from "./Popover.module.scss";

type PopoverProps = {
  ref?: RefObject<HTMLDialogElement>;
  anchorEl: RefObject<HTMLElement>;
  anchorOrigin?: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "center" | "right";
  };
  transformOrigin?: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "center" | "right";
  };
  gutter?: number;
} & ComponentPropsWithoutRef<"dialog">;

export default function Popover({
  children,
  anchorEl,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  transformOrigin = { vertical: "top", horizontal: "center" },
  gutter = 8,
  ...rest
}: PopoverProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleClickToClose(e: MouseEvent<HTMLElement>) {
    dialogRef.current?.close();
  }
  const handlePopoverClick = useCallback(() => {
    if (!anchorEl.current || !contentRef.current) return;
    dialogRef.current?.show();

    const anchorBox = anchorEl.current.getBoundingClientRect();
    // const contentBox = contentRef.current.getBoundingClientRect();
    const contentBox = {
      width: contentRef.current.clientWidth,
      height: contentRef.current.clientHeight,
    };
    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;
    console.log("contentBox", contentBox.width, contentBox.height);
    // Calculate initial position based on anchor origin
    let popoverLeft =
      anchorOrigin.horizontal === "center"
        ? anchorBox.left + anchorBox.width / 2
        : anchorBox[anchorOrigin.horizontal];
    let popoverTop =
      anchorOrigin.vertical === "center"
        ? anchorBox.top + anchorBox.height / 2
        : anchorBox[anchorOrigin.vertical];

    // Calculate transform values based on transform origin
    let transformX =
      transformOrigin.horizontal === "left"
        ? 0
        : transformOrigin.horizontal === "right"
          ? contentBox.width
          : contentBox.width / 2 + gutter / 2;
    let transformY =
      transformOrigin.vertical === "top"
        ? 0
        : transformOrigin.vertical === "bottom"
          ? contentBox.height
          : contentBox.height / 2 + gutter / 2;

    // Adjust position to keep content within viewport bounds
    // transformX and transformY is being subtracted to use `-${transformX}px -${transformY}px`,
    // this allows true transform origin to be set using something like transition origin
    const finalLeft = popoverLeft - transformX;
    const finalTop = popoverTop - transformY;

    // Check and adjust horizontal position
    // Checking if overflowing right edge of viewport, along with adjusting for gutter
    if (finalLeft + contentBox.width > viewportWidth - gutter) {
      popoverLeft = viewportWidth - gutter - contentBox.width + transformX;
    }
    // Checking if overflowing left edge of viewport, along with adjusting for gutter
    if (finalLeft < gutter) {
      popoverLeft = gutter + transformX;
    }

    // Check and adjust vertical position
    // Checking if overflowing bottom edge of viewport, along with adjusting for gutter
    if (finalTop + contentBox.height > viewportHeight - gutter) {
      popoverTop = viewportHeight - gutter - contentBox.height + transformY;
    }
    // Checking if overflowing top edge of viewport, along with adjusting for gutter
    if (finalTop < gutter) {
      popoverTop = gutter + transformY;
    }

    // Apply final position
    contentRef.current.style.translate = `-${transformX}px -${transformY}px`;
    contentRef.current.style.setProperty("--popover-top", `${popoverTop}px`);
    contentRef.current.style.setProperty("--popover-left", `${popoverLeft}px`);
  }, [anchorOrigin, transformOrigin, gutter, contentRef, anchorEl]);

  useEffect(() => {
    if (anchorEl.current)
      anchorEl.current.addEventListener("click", handlePopoverClick);
    return () => {
      if (anchorEl.current)
        anchorEl.current.removeEventListener("click", handlePopoverClick);
    };
  }, [anchorEl, handlePopoverClick]);

  return (
    <dialog
      ref={dialogRef}
      id={"popover"}
      className={styles.container}
      autoFocus={rest.open}
      {...rest}
    >
      <div className={styles.backdrop} onClick={handleClickToClose} />
      <div ref={contentRef} id={"popover_content"} className={styles.content}>
        {children}
      </div>
    </dialog>
  );
}
