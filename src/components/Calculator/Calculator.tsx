import React, {
  ReactElement,
  ReactNode,
  useRef,
  useEffect,
  useState,
} from "react";

import styles from "./styles.module.sass";
import { Display } from "../Display/Display";
import { displaySlice } from "../../store/display";
import { numbersSlice } from "../../store/numbers";
import { calculatorSlice } from "../../store/calculator";

//import {canvasSlice} from '../../store/canvas'
import { selectDisplayValue } from "../../store/display/selectors";

import { Operations } from "../Operations/Operations";
import { Numbers } from "../Numbers/Numbers";
import { Results } from "../Result/Result";
import { Canvas } from "../Canvas/Canvas";
import { DragWrapper } from "../DragWrapper/DragEWrapper";
import {
  selectCalculatorActiveEl,
  selectCalculatorMode,
} from "../../store/calculator/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modes } from "../constants/calcModes";
import classNames from "classnames";

interface ICalculatorProps {}

export const Calculator: React.FC<ICalculatorProps> = () => {
  const mode = useSelector(selectCalculatorMode);
  const canvasRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(false);

  function dbClickHandler(event: MouseEvent) {
    dispatch(
      calculatorSlice.actions.dbClickPosition({
        pageX: event.pageX,
        pageY: event.pageY,
      })
    );
  }

  useEffect(() => {
    const ifRuntime = mode === modes.runtime ? true : false;

    setIsHidden(ifRuntime);

    if (mode === modes.constructor && canvasRef.current) {
      canvasRef.current.addEventListener("dblclick", dbClickHandler);
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("dblclick", dbClickHandler);
      }
    };
  }, [mode]);

  return (
    <DragWrapper>
      <div className={styles.calc}>
        <div
          className={classNames(styles.calc__elements, {
            [styles.hidden]: isHidden,
          })}
        >
          <Display id="Display" className={styles.display} />
          <Operations id="Operations" className={styles.operations} />
          <Numbers id="Numbers" className={styles.numbers} />
          <Results id="Results" className={styles.results} />
        </div>
        <div
          className={classNames({
            [styles.hidden]: !isHidden,
          })}
        ></div>
        <div ref={canvasRef} className={styles.calc__canvas}>
          <Canvas />
        </div>
      </div>
    </DragWrapper>
  );
};
