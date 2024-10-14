"use client";
import { useState } from "react";
import styles from "./Accordion.module.scss";

type AllowedDataTypes = {
  id: string;
  summary: string;
  definition: string;
} & {
  [key: string]: any;
};

interface Props {
  data: AllowedDataTypes[];
}

export default function Accordion({ data }: Props) {
  // console.log(data);
  const [active, setActive] = useState(data[0].id);
  return (
    <div className={styles.accordion}>
      {data.map((value) => (
        <div
          key={value.id}
          className={`${styles.accordionItem} ${
            active == value.id ? styles.active : ""
          }`}
          onClick={() => setActive(value.id)}
        >
          <div className={styles.summary}>{value.summary}</div>
          <div className={styles.definition}>{value.definition}</div>
        </div>
      ))}
    </div>
  );
}
