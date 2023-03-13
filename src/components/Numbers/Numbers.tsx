import * as React from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import { KeyButton } from "../KeyButton/KeyButton";
import { useEffect, useState } from "react";
import { elementsEntities } from "../constants/elementsSettings";
import { useSelector } from "react-redux";
import { selectCalculatorInCanvas } from "../../store/calculator/selectors";

interface INumbersProps {
  className?: string;
  id?: string;
}

export const Numbers: React.FunctionComponent<INumbersProps> = ({
  className,
  id,
}) => {
  const elementsInCanvas = useSelector(selectCalculatorInCanvas);

  const [IsMoved, setIsMoved] = useState(false);

  useEffect(() => {
    const isInCanvas = elementsInCanvas.includes("Numbers") ? true : false;
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
      {elementsEntities.Numbers.map((value) => (
        <KeyButton key={`key${value}`} value={value} />
      ))}
    </div>
  );
};
