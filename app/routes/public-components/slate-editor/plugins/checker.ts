import { Editor, Element as SlateElement } from "slate";
import {
  LIST_TYPES,
  TEXT_ALIGN_TYPES,
  type AlignType,
  type CustomEditor,
  type CustomElement,
  type CustomElementFormat,
  type CustomElementWithAlign,
  type CustomTextKey,
  type ListType,
} from "../types.d";

export const isAlignElement = (
  element: CustomElement
): element is CustomElementWithAlign => {
  return "align" in element;
};

export const isBlockIndent = (
  element: CustomElement
): element is CustomElementWithAlign => {
  return "align" in element;
};

export const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: "type" | "align" = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === "align" && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    })
  );

  return !!match;
};

export const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const isAlignType = (
  format: CustomElementFormat
): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType);
};

export const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType);
};
