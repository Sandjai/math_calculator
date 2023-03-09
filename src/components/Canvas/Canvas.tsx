import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames-ts";

interface ICanvasProps {
  className?: string;
}

export const Canvas: React.FunctionComponent<ICanvasProps> = (props) => {
  const { className } = props;

  return <div className={classNames(className, styles.root)}></div>;
};
