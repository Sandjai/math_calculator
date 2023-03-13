import React, { ReactElement, ReactNode, useRef } from "react";

import styles from "./styles.module.sass";
import { Display } from "../Display/Display";

import { displaySlice } from "../../store/display";
import { numbersSlice } from "../../store/numbers";
import { operationsSlice } from "../../store/operations";
import { calculatorSlice } from "../../store/calculator";
import { resultSlice } from "../../store/result";
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

interface ICalculatorProps {
  mode: string;
}

export const Calculator: React.FC<ICalculatorProps> = ({ mode }) => {
  // const arr: ReactNode[] = [
  //   <Display key="Display" className={styles.display} />,
  //   <Operations key="Operations" className={styles.operations} />,
  //   <Numbers key="Numbers" className={styles.numbers} />,
  //   <Results key="Results" className={styles.results} />,
  // ];

  return (
    <DragWrapper>
      <div className={styles.calc}>
        <div className={styles.calc__elements}>
          <Display id="Display" className={styles.display} />
          <Operations id="Operations" className={styles.operations} />
          <Numbers id="Numbers" className={styles.numbers} />
          <Results id="Results" className={styles.results} />
          {/* {arr.map((item: any) => {
          return (
            <DragWrapper
              key={item.key}
              id={item.key}
              onDragStart={onDragStart}
              onDragLeave={onDragLeave}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              {item}
            </DragWrapper>
          );
        })} */}
        </div>
        <div className={styles.calc__canvas}>
          <Canvas />
        </div>
      </div>
    </DragWrapper>
  );
};
