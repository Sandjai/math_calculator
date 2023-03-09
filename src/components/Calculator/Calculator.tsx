import React from "react";

import styles from "./styles.module.sass";
import { Display } from "../Display/Display";
import { useDispatch } from "react-redux";
import { displaySlice } from "../../store/display";
import { numbersSlice } from "../../store/numbers";
import { operationsSlice } from "../../store/operations";
import { resultSlice } from "../../store/result";
//import {canvasSlice} from '../../store/canvas'
import { selectDisplayValue } from "../../store/display/selectors";
import { useSelector } from "react-redux";
import { Operations } from "../Operations/Operations";

interface IDisplayProps {
  mode: string;
}
export const Calculator: React.FC<IDisplayProps> = ({ mode }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.calc}>
      <div className={styles.calc__elements}>
        <Display className={styles.display} />
        <Operations className={styles.operations} />
      </div>
      <div className={styles.calc__canvas}></div>
    </div>
  );
};
