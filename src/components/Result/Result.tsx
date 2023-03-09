import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";

interface IResultsProps {
  className?: string;
}

export const Results: React.FunctionComponent<IResultsProps> = (props) => {
  const { className } = props;

  return <div className={classNames(className, styles.root)}>=</div>;
};
