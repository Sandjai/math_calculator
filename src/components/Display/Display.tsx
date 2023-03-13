import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.sass";
import { useSelector } from "react-redux";
import { selectDisplayValue } from "../../store/display/selectors";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
  selectCalculatorInCanvas,
  selectCalculatorMode,
} from "../../store/calculator/selectors";
import { modes } from "../constants/calcModes";
interface IDisplayProps {
  className?: string;
  id?: string;
}

export const Display: React.FunctionComponent<IDisplayProps> = ({
  className,
  id,
}) => {
  const dispatch = useDispatch();
  const value = useSelector(selectDisplayValue);
  const elementsInCanvas = useSelector(selectCalculatorInCanvas);
  // let isInCanvas: any = useRef(false);

  const [IsMoved, setIsMoved] = useState(false);

  useEffect(() => {
    const isInCanvas = elementsInCanvas.includes("Display") ? true : false;
    setIsMoved(isInCanvas);
  }, [elementsInCanvas]);

  return (
    <div
      id={id}
      draggable={IsMoved ? false : true}
      className={classNames(className, styles.display, {
        [styles.moved]: IsMoved,
      })}
    >
      {value}
    </div>
  );
};
