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
  drawElement,
  drawLine,
} from "../../utils/drawCanvas";
import { canvasSize } from "../constants/canvasSize";
import { useSelector } from "react-redux";
import {
  selectCalculatorActiveEl,
  selectCalculatorInCanvas,
  selectCanvasHeight,
} from "../../store/calculator/selectors";
import { elements, entities } from "../constants/elementsSettings";

interface ICanvasProps {
  className?: string;
}

export const Canvas: React.FunctionComponent<ICanvasProps> = (props) => {
  const { className } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let activeEl = useSelector(selectCalculatorActiveEl);
  const inCanvas = useSelector(selectCalculatorInCanvas);
  const canvasElementsHeight = useSelector(selectCanvasHeight);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;
    // let ElHeight: number;
    let el = entities[activeEl as keyof typeof entities];
    if (canvas && el) {
      canvas.addEventListener("dragenter", (e) => {
        fillBlue(context);
        // for (let element of elements) {
        //   if (element.id === activeEl) {
        //     ElHeight = element.height;
        //   }
        // }

        drawLine(context, el.height, canvasElementsHeight);
      });

      if (canvas) {
        canvas.addEventListener("drop", (e) => {
          if (activeEl) {
            console.log(canvasElementsHeight);
            drawElement(context, el, canvasElementsHeight);
          }
        });
      }
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("dragenter", (e) => {
          fillBlue(context);

          drawLine(context, el.height, canvasElementsHeight);
        });

        canvas.removeEventListener("drop", (e) => {
          if (activeEl) {
            console.log(canvasElementsHeight);
            drawElement(context, el, canvasElementsHeight);
          }
        });
      }
    };
  }, [activeEl, canvasElementsHeight]);

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
      canvas.addEventListener("dragleave", (e) => {
        if (context) {
          fillWhite(context);
          drawDefault(context);
        }
      });
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
    <div className={classNames(className, styles.root)}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className={styles.canvas}
      >
        You browser is not supported.
      </canvas>
    </div>
  );
};
