import React, { type PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { css, cx } from "@emotion/css";
import type { BaseProps } from "../types";

export const Instruction = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<BaseProps>
>(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        white-space: pre-wrap;
        margin: 0 -20px 10px;
        padding: 10px 20px;
        font-size: 14px;
        background: #f8f8e8;
      `
    )}
  />
));

export const Menu = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<BaseProps>
>(({ className, ...props }, ref) => (
  <div
    {...props}
    data-test-id="menu"
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }

        /* & > * + * {
          margin-left: 15px;
        } */
      `
    )}
  />
));

export const Portal = ({ children }: { children?: React.ReactNode }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

const Toolbar = React.forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>(
  ({ className, ...props }, ref) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          /* padding: 1px 18px 17px; */
          /* margin: 0 -20px; */
          /* border-bottom: 2px solid #eee; */
          /* margin-bottom: 2; */
        `
      )}
    />
  )
);

export default Toolbar;
