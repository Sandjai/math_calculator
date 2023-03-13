import React, { useEffect, useState } from "react";
import styles from "./App.module.sass";
import { Calculator } from "./components/Calculator/Calculator";
import { modes } from "./components/constants/calcModes";
import { ModeToggler } from "./components/ModeToggler/ModeToggler";
import { useSelector } from "react-redux";
import { selectCalculatorMode } from "./store/calculator/selectors";

export const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <ModeToggler />
      <Calculator />
    </div>
  );
};
