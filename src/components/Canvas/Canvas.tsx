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
} from "../../store/calculator/selectors";
import { elements } from "../constants/elementsSettings";

interface ICanvasProps {
  className?: string;
}

export const Canvas: React.FunctionComponent<ICanvasProps> = (props) => {
  const { className } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let activeEl = useSelector(selectCalculatorActiveEl);
  const inCanvas = useSelector(selectCalculatorInCanvas);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;
    let ElHeight: number;
    if (canvas) {
      canvas.addEventListener("dragenter", (e) => {
        console.log("activeEl", activeEl);
        fillBlue(context);
        for (let element of elements) {
          if (element.id === activeEl) {
            ElHeight = element.height;
          }
        }

        drawLine(context, ElHeight, 0);
      });
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("dragenter", (e) => {
          console.log("activeEl", activeEl);
          fillBlue(context);
          for (let element of elements) {
            if (element.id === activeEl) {
              ElHeight = element.height;
            }
          }

          drawLine(context, ElHeight, 0);
        });
      }
    };
  }, [activeEl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;

    drawDefault(context);

    if (canvas) {
      canvas.addEventListener("drop", (e) => {});
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;
  }, [inCanvas]);

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
