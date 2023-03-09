import * as React from "react";
import styles from "./styles.module.sass";
import { useSelector } from "react-redux";
import { selectDisplayValue } from "../../store/display/selectors";
import classNames from "classnames";
interface IDisplayProps {
  className?: string;
}

export const Display: React.FunctionComponent<IDisplayProps> = ({
  className,
}) => {
  const value = useSelector(selectDisplayValue);
  return <div className={classNames(className, styles.display)}>{value}</div>;
};
