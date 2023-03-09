import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { ReactComponent as SelectorIcon } from "../../assets/images/selector.svg";
import { Imodes } from "../../types/data";
import { modes } from "../constants/calcModes";

interface IButtonProps {
  className?: string;
  curMode: string;
  onClick: () => void;
  btnMode: string;
  curModeTxt: string;
}

export const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const { className, curMode, onClick, btnMode, curModeTxt } = props;
  const isActive = curMode === btnMode;

  return (
    <div
      onClick={onClick}
      className={classNames(className, styles.btn, {
        [styles.btn_active]: isActive,
        [styles.btn_primary]: !isActive,
      })}
    >
      {curModeTxt === modes.runtime && (
        <EyeIcon className={classNames(styles.icon, styles.icon_1)} />
      )}
      {curModeTxt === modes.constructor && (
        <SelectorIcon className={classNames(styles.icon, styles.icon_2)} />
      )}

      {curModeTxt}
    </div>
  );
};
