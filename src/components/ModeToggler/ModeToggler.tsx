import * as React from "react";
import styles from "./styles.module.sass";
import { modes } from "../constants/calcModes";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { selectCalculatorMode } from "../../store/calculator/selectors";
import { useDispatch } from "react-redux";
import { calculatorSlice } from "../../store/calculator";

interface IModeTogglerProps {}

export const ModeToggler: React.FunctionComponent<IModeTogglerProps> = () => {
  const mode = useSelector(selectCalculatorMode);
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.toggler}>
          {Object.keys(modes).map((curMode) => (
            <Button
              onClick={() =>
                dispatch(calculatorSlice.actions.updateMode(modes[curMode]))
              }
              key={curMode}
              curMode={modes[curMode]}
              btnMode={mode}
              className={styles.button}
              curModeTxt={modes?.[curMode]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
