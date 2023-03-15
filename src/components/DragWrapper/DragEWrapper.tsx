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

import { calculatorSlice } from "../../store/calculator";

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
    target.hidden = false;
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    const curTargent = e.currentTarget as any;

    const target = e.target as HTMLElement;
    e.preventDefault();
    if (target.tagName && target.tagName === "CANVAS") {
      if (e.dataTransfer.getData("id")) {
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
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    dragStartHandler(e);
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) =>
    dragLeaveHandler(e);
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e);
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => dropHandler(e);

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
