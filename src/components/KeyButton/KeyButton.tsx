import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { ReactComponent as SelectorIcon } from "../../assets/images/selector.svg";
import { Imodes } from "../../types/data";
import { modes } from "../constants/calcModes";

interface IKeyButtonProps {
  value: string;
  className?: string;
}

export const KeyButton: React.FunctionComponent<IKeyButtonProps> = ({
  className,
  value,
}) => <div className={classNames(className, styles.root)}>{value}</div>;
