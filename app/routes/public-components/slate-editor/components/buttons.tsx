import React, { useState, type PropsWithChildren } from "react";
import type { BaseProps, CustomElementFormat, CustomTextKey } from "../types";
import { cx } from "@emotion/css";
import { useSlate } from "slate-react";
import { isAlignType, isBlockActive, isMarkActive } from "../plugins/checker";
import { toggleBlock, toggleMark } from "../plugins/toggle";
import type { IconType } from "react-icons/lib";
import { customToggleBlock } from "../plugins/custom-toggle-block";

export const DropDownButton = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<BaseProps>
>(({ className, children, ...props }, ref) => {
  const [isShow, setIsShow] = useState(false);
  console.log(isShow);
  return (
    <div
      {...props}
      ref={ref}
      className={cx(className, "relative")}
      onMouseOver={() => setIsShow(true)}
      onMouseOut={() => setIsShow(false)}
    >
      <button type="button">test</button>
      {isShow && (
        <DropDownWrapper
          className="bg-white z-50 border"
          onClick={() => setIsShow(false)}
        >
          {children}
        </DropDownWrapper>
      )}
    </div>
  );
});

const DropDownWrapper = React.forwardRef<
  HTMLSpanElement,
  PropsWithChildren<BaseProps>
>(({ className, onClick, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    onClick={onClick}
    className={cx(className, "absolute flex flex-col z-20")}
  />
));

export const Button = React.forwardRef<
  HTMLSpanElement,
  PropsWithChildren<{ active: boolean; revered: boolean } & BaseProps>
>(({ className, active, reversed, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      className,
      "text-gray-600 hover:text-black cursor-pointer p-2"
    )}
  />
));

type BlockButtonProps = {
  format: CustomElementFormat;
  icon: IconType;
};

export const BlockButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate();
  const Icon = icon;

  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        isAlignType(format) ? "align" : "type"
      )}
      onMouseDown={(event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        if (["indent", "outdent", "lineheight"].includes(format)) {
          customToggleBlock(editor, format);
        } else {
          toggleBlock(editor, format);
        }
      }}
    >
      <Icon />
    </Button>
  );
};

type MarkButtonProps = {
  format: CustomTextKey;
  icon: IconType;
};

export const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate();
  const Icon = icon;
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon />
    </Button>
  );
};
