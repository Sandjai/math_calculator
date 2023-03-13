import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import { KeyButton } from "../KeyButton/KeyButton";

import { elementsEntities } from "../constants/elementsSettings";

interface INumbersProps {
  className?: string;
  id?: string;
}

export const Numbers: React.FunctionComponent<INumbersProps> = ({
  className,
  id,
}) => {
  return (
    <div
      id={id}
      draggable={true}
      className={classNames(className, styles.root)}
    >
      {elementsEntities.numbers.map((value) => (
        <KeyButton key={`key${value}`} value={value} />
      ))}
    </div>
  );
};
