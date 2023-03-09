import React, { useState } from "react";
import styles from "./App.module.sass";
import { Calculator } from "./components/Calculator/Calculator";
import { Provider } from "react-redux";
import { store } from "./store";
import { modes } from "./components/constants/calcModes";
import { Button } from "./components/Button/Button";
import { ModeToggler } from "./components/ModeToggler/ModeToggler";

export const App: React.FC = () => {
  const [mode, setMode] = useState(Object.keys(modes)[1]);

  return (
    <Provider store={store}>
      <div className={styles.App}>
        <ModeToggler mode={mode} setMode={setMode} />
        <Calculator mode={mode} />
      </div>
    </Provider>
  );
};
