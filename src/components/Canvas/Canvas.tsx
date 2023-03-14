import * as React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import styles from "./styles.module.sass";
import classNames from "classnames";
import {
  fillBlue,
  fillWhite,
  drawDefault,
  drawLine,
  drawElements,
} from "../../utils/drawCanvas";
import { canvasSize } from "../constants/canvasSize";
import { useSelector } from "react-redux";
import {
  selectCalculatorActiveEl,
  selectCalculatorInCanvas,
  selectCalculatorMode,
  selectCanvasHeight,
} from "../../store/calculator/selectors";
import {
  elements,
  elementsData,
  entities,
  generalPadding,
} from "../constants/elementsSettings";
import { modes } from "../constants/calcModes";
import { ICanvasProps, Ibreakpoints__width, objArr } from "../../types/data";
import { useDispatch } from "react-redux";
import { operationsSlice } from "../../store/operations";

export const Canvas: React.FunctionComponent<ICanvasProps> = ({
  className,
}) => {
  const mode = useSelector(selectCalculatorMode);
  const [ifWorkingMode, setifWorkingMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  let activeEl = useSelector(selectCalculatorActiveEl);
  const inCanvas = useSelector(selectCalculatorInCanvas);
  const canvasElementsHeight = useSelector(selectCanvasHeight);
  let dispatch = useDispatch();

  useEffect(() => {
    const ifWorkingMode = mode === modes.runtime ? true : false;
    setifWorkingMode(ifWorkingMode);
  }, [mode]);

  // Drag Events
  useEffect(() => {
    const canvas = canvasRef.current;
    let el = entities[activeEl as keyof typeof entities];

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
    if (!ifWorkingMode) {
      canvas.addEventListener("dragenter", dragEnterHandler);
      canvas.addEventListener("drop", dropHandle);
      canvas.addEventListener("dragleave", dragLeaveHandler);
    }

    return () => {
      canvas.removeEventListener("drop", dropHandle);
      canvas.removeEventListener("dragenter", dragEnterHandler);
      canvas.removeEventListener("dragleave", dragLeaveHandler);
    };
  }, [activeEl, canvasElementsHeight, inCanvas, ifWorkingMode]);

  // Click Events
  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;
    const arr: objArr[] = [];

    let breakpoints__height: number[] = [];
    let breakpoints__width_operations: Ibreakpoints__width[] = [
      { from: 4, to: 56 },
      { from: 60, to: 112 },
      { from: 116, to: 168 },
      { from: 172, to: 224 },
    ];
    let breakpoints__width_numbers: Ibreakpoints__width[] = [
      { from: 4, to: 75 },
      { from: 79, to: 150 },
      { from: 154, to: 225 },
    ];

    for (let item of inCanvas) {
      let objItem = {
        id: item,
        height:
          entities[item as keyof typeof entities].height +
          (item === inCanvas.length - 1 ? 0 : generalPadding),
      };
      arr.push(objItem);
    }

    for (let item of arr) {
      breakpoints__height.push(item.height);
    }

    const clickHandler = (e: MouseEvent): void => {
      const target = e.target as any;
      const coordY = e.pageY - target.offsetTop;
      const coordX = e.pageX - target.offsetLeft;
      let clickedOnComponent: string | null = null;

      const getHeight = (index: number) => {
        let height = 0;
        for (let i = 0; i < index; i++) {
          height += breakpoints__height[i];
        }

        return height;
      };

      let ind = 0;
      for (let item of arr) {
        if (activeEl && coordY <= item.height + getHeight(ind)) {
          clickedOnComponent = item.id;
          fillWhite(context);
          drawElements(context, inCanvas, activeEl, item.id);
          break;
        }
        ind++;
      }

      if (clickedOnComponent === "Operations") {
        let index = 0;
        for (let operation of breakpoints__width_operations) {
          if (coordX > operation.from && coordX < operation.to) {
            console.log(elementsData.Operations[index]);
            dispatch(
              operationsSlice.actions.update(elementsData.Operations[index])
            );
            return;
          }
          index++;
        }
      }
    };

    if (ifWorkingMode) {
      canvas.addEventListener("click", clickHandler);
    }

    return () => canvas.removeEventListener("click", clickHandler);
  }, [inCanvas, ifWorkingMode, activeEl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;

    drawDefault(context);
  }, []);

  return (
    <div
      className={classNames(styles.wrapper, {
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
