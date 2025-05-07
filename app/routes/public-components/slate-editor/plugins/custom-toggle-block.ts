import { Editor, Element as SlateElement, Transforms } from "slate";
import type { CustomEditor } from "../types";

export function customToggleBlock(editor: CustomEditor, format: string) {
  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n),
  });

  if (match) {
    const [node, path] = match as any;

    let newProperties: Partial<SlateElement>;
    if (["indent", "outdent"].includes(format)) {
      const currentIndent = node.indent || 0;
      newProperties = {
        type: "indent",
        indent: format === "indent" ? currentIndent + 1 : currentIndent - 1,
      };
    } else if (format === "lineheight") {
      const currentLineHeight = node.lineheight || 0;
      newProperties = {
        type: "lineheight",
        lineheight: currentLineHeight + 1,
      };
    }

    Transforms.setNodes(editor, newProperties, { at: path });
  }
}
