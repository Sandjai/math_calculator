import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames-ts";

interface INumbersProps {
  className?: string;
}

export const Numbers: React.FunctionComponent<INumbersProps> = (props) => {
  const { className } = props;

  return <div className={classNames(className, styles.root)}></div>;
};
