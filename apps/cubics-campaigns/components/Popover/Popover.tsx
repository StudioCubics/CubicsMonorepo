"use client";
import {
  RefObject,
  useRef,
  useEffect,
  useCallback,
  useState,
  type MouseEvent,
  type ComponentPropsWithoutRef,
} from "react";
import styles from "./Popover.module.scss";
import { createPortal } from "react-dom";

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

export default function Popover(props: PopoverProps) {
  const {
    children,
    ref,
    anchorEl,
    anchorOrigin = { vertical: "bottom", horizontal: "left" },
    transformOrigin = { vertical: "top", horizontal: "center" },
    gutter = 8,
    ...rest
  } = props;
  const dialogRef = ref ?? useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleClickToClose(e: MouseEvent<HTMLElement>) {
    dialogRef.current?.close();
  }

  const handlePopoverClick = useCallback(() => {
    if (!anchorEl.current || !contentRef.current || !dialogRef.current) return;
    dialogRef.current?.show();

    const anchorBox = anchorEl.current.getBoundingClientRect();
    const contentBox = contentRef.current.getBoundingClientRect();
    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;

    // Calculate initial position based on anchor origin
    let popoverTop =
      anchorOrigin.vertical === "center"
        ? anchorBox.top + anchorBox.height / 2
        : anchorBox[anchorOrigin.vertical];
    let popoverLeft =
      anchorOrigin.horizontal === "center"
        ? anchorBox.left + anchorBox.width / 2
        : anchorBox[anchorOrigin.horizontal];

    // Calculate transform values based on transform origin
    let transformX =
      transformOrigin.horizontal === "left"
        ? 0
        : transformOrigin.horizontal === "right"
          ? contentBox.width
          : contentBox.width / 2;
    let transformY =
      transformOrigin.vertical === "top"
        ? 0
        : transformOrigin.vertical === "bottom"
          ? contentBox.height
          : contentBox.height / 2;

    // Adjust position to keep content within viewport bounds
    const finalLeft = popoverLeft - transformX;
    const finalTop = popoverTop - transformY;

    // Check and adjust horizontal position
    if (finalLeft + contentBox.width > viewportWidth - gutter) {
      popoverLeft = viewportWidth - gutter - contentBox.width + transformX;
    }
    if (finalLeft < gutter) {
      popoverLeft = gutter + transformX;
    }

    // Check and adjust vertical position
    if (finalTop + contentBox.height > viewportHeight - gutter) {
      popoverTop = viewportHeight - gutter - contentBox.height + transformY;
    }
    if (finalTop < gutter) {
      popoverTop = gutter + transformY;
    }

    // Apply final position
    contentRef.current.style.translate = `-${transformX}px -${transformY}px`;
    contentRef.current.style.setProperty("--popover-top", `${popoverTop}px`);
    contentRef.current.style.setProperty("--popover-left", `${popoverLeft}px`);
  }, [anchorOrigin, transformOrigin, gutter]);

  useEffect(() => {
    if (!anchorEl.current) return;
    anchorEl.current?.addEventListener("click", handlePopoverClick);
    return () => {
      anchorEl.current?.removeEventListener("click", handlePopoverClick);
    };
  }, [handlePopoverClick]);

  return createPortal(
    <dialog ref={dialogRef} className={styles.container} {...rest}>
      <div className={styles.backdrop} onClick={handleClickToClose} />
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </dialog>,
    document.body
  );
}
