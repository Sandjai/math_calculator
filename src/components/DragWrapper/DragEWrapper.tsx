import * as React from "react";
import { useEffect } from "react";
import styles from "./styles.module.sass";
import {
  selectCalculatorActiveEl,
  selectCalculatorMode,
} from "../../store/calculator/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import classNames from "classnames";
// import {
//   dragEndHandler,
//   dragLeaveHandler,
//   dragOverHandler,
//   dragStartHandler,
// } from "../../utils/dragEveHandlers";
import { calculatorSlice } from "../../store/calculator";
import { checkMovePosition } from "../../utils/drawCanvas";
import { elements } from "../constants/elementsSettings";

interface IDragWrapperProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export const DragWrapper: React.FunctionComponent<IDragWrapperProps> = ({
  className,
  children,
  id,
}) => {
  // useEffect(() => {
  //   document.addEventListener("drop", (e: any) => dropHandler(e));
  //   return () =>
  //     document.removeEventListener("drop", (e: any) => dropHandler(e));
  // }, []);
  const dispatch = useDispatch();

  let activeEl = useSelector(selectCalculatorActiveEl);

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;

    if (target) {
      e.dataTransfer.clearData();
      e.dataTransfer.setData("id", target.id);
      dispatch(calculatorSlice.actions.changeActiveElement(target.id));
    }
  }
  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {}
  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {}
  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const target = e.target as HTMLElement;

    // if (target.tagName && target.tagName === "CANVAS") {
    //   console.log("activeEl", activeEl);
    //   let ElHeight: number;
    //   for (let element of elements) {
    //     if (element.id === activeEl) {
    //       ElHeight = element.height;
    //     }
    //   }
    //   checkMovePosition(e);
    // }

    target.hidden = false;
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    const curTargent = e.currentTarget as any;

    const target = e.target as HTMLElement;
    e.preventDefault();
    if (target.tagName && target.tagName === "CANVAS") {
      if (e.dataTransfer.getData("id")) {
        console.log(curTargent);
        let ElHeight;
        for (let element of elements) {
          if (element.id === activeEl) {
            ElHeight = element.height;
          }
        }

        dispatch(
          calculatorSlice.actions.addToCanvas({
            id: e.dataTransfer.getData("id"),
            ElHeight,
          })
        );
      }
    }
    //  let itemId = e.dataTransfer.getData("id");
  }

  // function enterHandler (e: React.DragEvent<HTMLDivElement>) {
  //   const target = e.target as HTMLElement;
  //   if (target.tagName && target.tagName === "CANVAS") {
  //     console.log("activeEl", activeEl);
  //     let ElHeight: number;
  //     for (let element of elements) {
  //       if (element.id === activeEl) {
  //         ElHeight = element.height;
  //       }
  //     }
  //     checkMovePosition(e);
  //   }
  // }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    dragStartHandler(e);
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) =>
    dragLeaveHandler(e);
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e);
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => dropHandler(e);
  // const on
  return (
    <div
      id={id}
      draggable={false}
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={classNames(className, styles.DragWrapper)}
    >
      {children}
    </div>
  );
};
