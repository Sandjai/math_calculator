import React, { useState } from "react";
import styles from "./App.module.sass";
import { Calculator } from "./components/Calculator/Calculator";
import { modes } from "./components/constants/calcModes";
import { ModeToggler } from "./components/ModeToggler/ModeToggler";

export const App: React.FC = () => {
  const [mode, setMode] = useState(modes.constructor);

  return (
    <div className={styles.App}>
      <ModeToggler mode={mode} setMode={setMode} />
      <Calculator mode={mode} />
    </div>
  );
};
