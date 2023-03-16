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
  clearRect,
} from "../../utils/drawCanvas";
import { canvasSize } from "../constants/canvasSize";
import { useSelector } from "react-redux";
import {
  selectCalculatorActiveEl,
  selectCalculatorInCanvas,
  selectCalculatorMode,
  selectCanvasHeight,
  selectNumbersvalue,
  selectdbClickPosition,
  selectindexOfNumbers,
} from "../../store/calculator/selectors";
import {
  numbersMatrix,
  elementsData,
  entities,
  generalPadding,
} from "../constants/elementsSettings";
import { modes } from "../constants/calcModes";
import {
  ICanvasProps,
  Ibreakpoints__width,
  Ibreakpoints__width_numbers,
  objArr,
  IElHeightArr,
} from "../../types/data";
import { useDispatch } from "react-redux";
import { calculatorSlice } from "../../store/calculator";

export const Canvas: React.FunctionComponent<ICanvasProps> = ({
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const mode = useSelector(selectCalculatorMode);
  const inCanvas = useSelector(selectCalculatorInCanvas);
  const canvasElementsHeight = useSelector(selectCanvasHeight);
  const numbersIndex: number = useSelector(selectindexOfNumbers);

  let activeEl = useSelector(selectCalculatorActiveEl);

  const dbClickPosition = useSelector(selectdbClickPosition);
  let dispatch = useDispatch();

  const [elHeightArr, setElHeightArr] = useState<any>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;

    if (dbClickPosition.length) {
      const canvasFromTop = canvasRef.current.getBoundingClientRect().top;

      let index = 0;
      for (let item of elHeightArr) {
        let elements = elHeightArr.slice(0, index + 1);
        const totalH = elements.reduce(
          (totalH: number, el: any) => totalH + el.height,
          0
        );

        const itemFrom = totalH - +item.height;
        const itemTo = totalH;

        if (
          +dbClickPosition[1] - canvasFromTop > itemFrom &&
          +dbClickPosition[1] - canvasFromTop < itemTo
        ) {
          dispatch(calculatorSlice.actions.removeFromCanvas(item.id));
          dispatch(calculatorSlice.actions.updateHight(item.height));

          setElHeightArr(
            elHeightArr.filter(
              (el: { id: string; height: number }) => el.id !== item.id
            )
          );
          fillWhite(context);
          const filteredinCanvas = inCanvas.filter(
            (id: string) => id !== item.id
          );
          drawElements(context, filteredinCanvas);

          break;
        }
        index++;
      }
    }
  }, [dbClickPosition]);

  const [ifWorkingMode, setifWorkingMode] = useState(false);
  const [numbersValue, setnumbersValue] = useState("");

  useEffect(() => {
    const ifWorkingMode = mode === modes.runtime ? true : false;
    setifWorkingMode(ifWorkingMode);
  }, [mode]);

  // Drag Events
  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas
      ? canvas.getContext("2d")
      : null;
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
          drawDefault(context);
        } else {
          drawElements(context, inCanvas, activeEl);
        }
      }
    };

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
      { from: 2, to: 54 },
      { from: 58, to: 116 },
      { from: 114, to: 173 },
      { from: 177, to: 241 },
    ];
    let breakpoints__width_numbers: Ibreakpoints__width_numbers[] = [
      {
        x: { from: 2, to: 73 },
        y: [
          { from: 2, to: 50 },
          { from: 54, to: 102 },
          { from: 106, to: 154 },
        ],
      },
      {
        x: { from: 77, to: 148 },
        y: [
          { from: 2, to: 50 },
          { from: 54, to: 102 },
          { from: 106, to: 154 },
        ],
      },
      {
        x: { from: 152, to: 223 },
        y: [
          { from: 2, to: 50 },
          { from: 54, to: 102 },
          { from: 106, to: 154 },
        ],
      },
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

    setElHeightArr(arr);

    const clickHandler = (e: MouseEvent): void => {
      if (mode === modes.constructor) return;

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
          drawElements(context, inCanvas, activeEl, item.id, numbersValue);
          break;
        }
        ind++;
      }

      if (clickedOnComponent === "Operations") {
        let index = 0;
        for (let operation of breakpoints__width_operations) {
          if (coordX > operation.from && coordX < operation.to) {
            dispatch(
              calculatorSlice.actions.updateOperations(
                elementsData.Operations[index]
              )
            );
            break;
          }
          index++;
        }
      }

      if (clickedOnComponent === "Numbers") {
        const numbersHeight = getHeight(numbersIndex);
        if (coordY > 175 + numbersHeight && coordY < 223 + numbersHeight) {
          if (coordX > 4 && coordX < 150) {
            setnumbersValue(elementsData.Numbers[9] + numbersValue);
            dispatch(
              calculatorSlice.actions.updateNumbers(elementsData.Numbers[9])
            );

            clearRect(context);

            drawElements(
              context,
              inCanvas,
              null,
              null,
              numbersValue + elementsData.Numbers[9]
            );
          }
          if (coordX > 154 && coordX < 225) {
            setnumbersValue(elementsData.Numbers[10] + numbersValue);
            dispatch(
              calculatorSlice.actions.updateNumbers(elementsData.Numbers[10])
            );

            clearRect(context);

            drawElements(
              context,
              inCanvas,
              null,
              null,
              numbersValue + elementsData.Numbers[10]
            );
          }
        } else {
          let x = 0;
          for (let item of breakpoints__width_numbers) {
            if (coordX > item.x.from && coordX < item.x.to) {
              let y = 0;
              for (let point of breakpoints__width_numbers[x].y) {
                if (
                  coordY > point.from + numbersHeight &&
                  coordY < point.to + numbersHeight
                ) {
                  setnumbersValue(numbersValue + numbersMatrix[x][y]);
                  dispatch(
                    calculatorSlice.actions.updateNumbers(numbersMatrix[x][y])
                  );

                  clearRect(context);
                  drawElements(
                    context,
                    inCanvas,
                    null,
                    null,
                    numbersValue + numbersMatrix[x][y]
                  );

                  break;
                }
                y++;
              }

              break;
            }
            x++;
          }
        }
      }
    };

    if (ifWorkingMode) {
      canvas.addEventListener("click", clickHandler);
    }

    return () => canvas.removeEventListener("click", clickHandler);
  }, [inCanvas, ifWorkingMode, activeEl, selectindexOfNumbers, numbersValue]);

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
