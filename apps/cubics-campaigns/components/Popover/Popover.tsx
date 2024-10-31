"use client";
import {
  RefObject,
  useRef,
  useEffect, type MouseEvent,
  type SyntheticEvent,
  type ComponentPropsWithoutRef
} from "react";
import styles from "./Popover.module.scss";

type PopoverProps = {
  open: boolean;
  ref?: RefObject<HTMLDialogElement>;
  anchorEl: RefObject<HTMLElement>;
  anchorOrigin?: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "center" | "right";
  };
} & ComponentPropsWithoutRef<"dialog">;

export default function Popover(props: PopoverProps) {
  const { children, ref, onClose, anchorEl, ...rest } = props;
  const dialogRef = ref ?? useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // TODO merge fowarded ref and localref
  function handleClose(e: SyntheticEvent<HTMLDialogElement>) {
    if (onClose) onClose(e);
  }
  function handleClickToClose(e: MouseEvent<HTMLElement>) {
    dialogRef.current?.close();
  }

  useEffect(() => {
    if (!anchorEl.current || !contentRef.current || !dialogRef.current) {
      return;
    }
    const anchorBox = anchorEl.current.getBoundingClientRect();
    const boundingBox = {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    };
    dialogRef.current.showModal();
    const contentBox = contentRef.current.getBoundingClientRect();
    const popoverTop = anchorBox.bottom;
    const popoverLeft = anchorBox.left;
    dialogRef.current.close();

    console.log("boundingBox", boundingBox, "contentBox", contentBox, {
      popoverLeft,
      popoverTop,
    });
    contentRef.current.style.setProperty("--popover-top", `${popoverTop}px`);
    contentRef.current.style.setProperty("--popover-left", `${popoverLeft}px`);
    contentRef.current.style.translate =
      contentBox.right > boundingBox.width
        ? `-${contentBox.right - boundingBox.width}px 0px`
        : "";
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.container}
      onClose={handleClose}
      {...rest}
    >
      <div className={styles.backdrop} onClick={handleClickToClose} />
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </dialog>
  );
}
