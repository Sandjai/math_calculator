import * as React from "react";
import styles from "./styles.module.sass";
import { modes } from "../constants/calcModes";
import { Button } from "../Button/Button";

interface IModeTogglerProps {
  mode: string;
  setMode: (mode: string) => void;
}

export const ModeToggler: React.FunctionComponent<IModeTogglerProps> = ({
  mode,
  setMode,
}) => {
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.toggler}>
          {Object.keys(modes).map((curMode) => (
            <Button
              onClick={() => setMode(modes[curMode])}
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
