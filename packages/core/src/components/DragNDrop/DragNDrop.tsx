"use client";
import React, { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import styles from "./DragNDrop.module.scss";

interface DragNDropProps extends ComponentPropsWithoutRef<"input"> {
  handleFileDataChange: (files: FileList | null) => void;
}
const DragNDrop = forwardRef<HTMLInputElement, DragNDropProps>(
  function DragNDropInner(props, ref) {
    const { handleFileDataChange, className, accept, ...rest } = props;

    const [draggedOver, setDraggedOver] = useState<boolean>(false);
    function handleDragOver(e: React.DragEvent) {
      e.preventDefault();
      setDraggedOver(true);
    }
    function handleDragEnd(e: React.DragEvent) {
      e.preventDefault();
      setDraggedOver(false);
    }
    function handleDrop(e: React.DragEvent) {
      e.preventDefault();
      handleFileDataChange(e.dataTransfer.files);
      setDraggedOver(false);
    }

    return (
      <>
        <label htmlFor="fileInput" className={className}>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragEnd}
            className={`${styles.container} ${
              draggedOver ? styles.dragged_over : ""
            }`}
          >
            {draggedOver ? (
              <>Drop your file here</>
            ) : (
              <>
                Click to upload or drag and drop your file <br />
              </>
            )}
          </div>
        </label>
        <input
          type="file"
          onChange={(e) => handleFileDataChange(e.target.files)}
          id="fileInput"
          {...rest}
          hidden={true}
          accept={accept}
          ref={ref}
        />
      </>
    );
  }
);
export default DragNDrop;
