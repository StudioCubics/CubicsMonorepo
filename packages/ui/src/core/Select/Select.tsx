import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./Select.module.scss";

type SelectOptionProps = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOptionProps[];
} & ComponentPropsWithoutRef<"select">;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  props,
  ref
) {
  const { options, ...selectProps } = props;
  return (
    <select ref={ref} className={styles.select} {...selectProps}>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
});

export default Select;
