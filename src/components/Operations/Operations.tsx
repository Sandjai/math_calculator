import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames-ts";

interface IOperationssProps {
  className?: string;
}

export const Operationss: React.FunctionComponent<IOperationssProps> = (
  props
) => {
  const { className } = props;

  return <div className={classNames(className, styles.root)}></div>;
};
