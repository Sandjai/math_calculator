import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import { elementsEntities } from "../constants/elementsSettings";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCalculatorInCanvas } from "../../store/calculator/selectors";
interface IResultsProps {
  className?: string;
  id?: string;
}

export const Results: React.FunctionComponent<IResultsProps> = ({
  className,
  id,
}) => {
  const elementsInCanvas = useSelector(selectCalculatorInCanvas);

  const [IsMoved, setIsMoved] = useState(false);

  useEffect(() => {
    const isInCanvas = elementsInCanvas.includes("Results") ? true : false;
    setIsMoved(isInCanvas);
  }, [elementsInCanvas]);

  return (
    <div
      id={id}
      draggable={IsMoved ? false : true}
      className={classNames(className, styles.root, {
        [styles.moved]: IsMoved,
      })}
    >
      {elementsEntities.Results}
    </div>
  );
};
