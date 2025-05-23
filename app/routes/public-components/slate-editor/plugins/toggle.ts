import { Editor, Transforms, Element as SlateElement } from "slate";
import type {
  CustomEditor,
  CustomElementFormat,
  CustomTextKey,
} from "../types";
import {
  isAlignType,
  isBlockActive,
  isListType,
  isMarkActive,
} from "./checker";

export const toggleBlock = (
  editor: CustomEditor,
  format: CustomElementFormat
) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? "align" : "type"
  );
  const isList = isListType(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;

  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    if (format === "indent") {
      Editor.addMark(editor, format, true);
    } else {
      Editor.addMark(editor, format, true);
    }
  }
};
