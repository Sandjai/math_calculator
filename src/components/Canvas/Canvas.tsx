import * as React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import {
  fillBlue,
  fillWhite,
  drawDefault,
  checkMovePosition,
  drawElements,
  drawLine,
} from "../../utils/drawCanvas";
import { canvasSize } from "../constants/canvasSize";
import { useSelector } from "react-redux";
import {
  selectCalculatorActiveEl,
  selectCalculatorInCanvas,
  selectCalculatorMode,
  selectCanvasHeight,
} from "../../store/calculator/selectors";
import { elements, entities } from "../constants/elementsSettings";
import { modes } from "../constants/calcModes";

interface ICanvasProps {
  className?: string;
}

export const Canvas: React.FunctionComponent<ICanvasProps> = ({
  className,
}) => {
  const mode = useSelector(selectCalculatorMode);
  const [ifWorkingMode, setifWorkingMode] = useState(false);

  useEffect(() => {
    const ifWorkingMode = mode === modes.runtime ? true : false;
    setifWorkingMode(ifWorkingMode);
  }, [mode]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  let activeEl = useSelector(selectCalculatorActiveEl);
  const inCanvas = useSelector(selectCalculatorInCanvas);
  const canvasElementsHeight = useSelector(selectCanvasHeight);

  useEffect(() => {
    const canvas = canvasRef.current;
    let el = entities[activeEl as keyof typeof entities];

    if (!canvas || !el) return;

    const dropHandle = () => {
      if (activeEl) {
        fillWhite(context);
        drawElements(context, inCanvas, activeEl);
      }
    };

    const dragEnterHandler = () => {
      fillBlue(context);
      drawLine(context, el.height, canvasElementsHeight);
    };

    const dragLeaveHandler = () => {
      if (context && activeEl) {
        if (inCanvas.length === 0) {
          fillWhite(context);
          drawDefault(context);
        } else {
          drawElements(context, inCanvas, activeEl);
        }
      }
    };

    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;

    canvas.addEventListener("dragenter", dragEnterHandler);
    canvas.addEventListener("drop", dropHandle);
    canvas.addEventListener("dragleave", dragLeaveHandler);

    return () => {
      canvas.removeEventListener("drop", dropHandle);
      canvas.removeEventListener("dragenter", dragEnterHandler);
      canvas.removeEventListener("dragleave", dragLeaveHandler);
    };
  }, [activeEl, canvasElementsHeight, inCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;

    drawDefault(context);

    if (canvas) {
      // canvas.addEventListener("drop", (e) => {
      //   if (activeEl) {
      //     drawElement(context, activeEl);
      //   }
      // });
      // canvas.addEventListener("dragover", (e) => {
      //   e.preventDefault();
      //   checkMovePosition(e);
      // });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("dragleave", (e) => {
          if (context) {
            fillWhite(context);
            drawDefault(context);
          }
        });
      }
    };
  }, []);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context: CanvasRenderingContext2D | null = canvas
  //     ? canvas.getContext("2d")
  //     : null;
  // }, [inCanvas]);

  return (
    <div
      className={classNames(className, styles.root, {
        [styles.runtime]: ifWorkingMode,
        [styles.constr]: !ifWorkingMode,
      })}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      >
        You browser is not supported.
      </canvas>
    </div>
  );
};
