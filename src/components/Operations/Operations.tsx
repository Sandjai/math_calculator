import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import { KeyButton } from "../KeyButton/KeyButton";
import { operValues } from "../constants/calcModes";

interface IOperationssProps {
  className?: string;
}

export const Operations: React.FunctionComponent<IOperationssProps> = (
  props
) => {
  const { className } = props;

  return (
    <div className={classNames(className, styles.root)}>
      {operValues.map((value) => (
        <KeyButton key={`key${value}`} value={value} />
      ))}
    </div>
  );
};
