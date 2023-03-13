import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import { elementsEntities } from "../constants/elementsSettings";

interface IResultsProps {
  className?: string;
  id?: string;
}

export const Results: React.FunctionComponent<IResultsProps> = ({
  className,
  id,
}) => {
  return (
    <div
      id={id}
      draggable={true}
      className={classNames(className, styles.root)}
    >
      {elementsEntities.results}
    </div>
  );
};
