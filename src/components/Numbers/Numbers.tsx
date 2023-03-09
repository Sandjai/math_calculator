import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import { KeyButton } from "../KeyButton/KeyButton";
import { numbersValues } from "../constants/calcModes";

interface INumbersProps {
  className?: string;
}

export const Numbers: React.FunctionComponent<INumbersProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(className, styles.root)}>
      {numbersValues.map((value) => (
        <KeyButton key={`key${value}`} value={value} />
      ))}
    </div>
  );
};
