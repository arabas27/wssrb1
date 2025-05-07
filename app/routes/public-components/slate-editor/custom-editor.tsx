import { useCallback, useMemo } from "react";
import {
  Editable,
  Slate,
  withReact,
  type RenderElementProps,
  type RenderLeafProps,
} from "slate-react";
import { withHistory } from "slate-history";
import { createEditor, type Descendant } from "slate";
import Element from "./components/element";
import Leaf from "./components/leaf";
import Toolbar from "./components/toolbar";
import { BlockButton, DropDownButton, MarkButton } from "./components/buttons";
import {
  TbAlignCenter,
  TbAlignJustified,
  TbAlignLeft,
  TbAlignRight,
  TbBold,
  TbIndentDecrease,
  TbIndentIncrease,
  TbItalic,
  TbLineHeight,
  TbNumber1,
  TbUnderline,
} from "react-icons/tb";
import type { CustomTextKey } from "./types";
import { isHotkey } from "is-hotkey";
import { toggleMark } from "./plugins/toggle";
import { customToggleBlock } from "./plugins/custom-toggle-block";

const HOTKEYS: Record<string, CustomTextKey> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  // "mod+`": "code",
  tab: "indent",
  "shift+tab": "outdent",
};

export default function CustomEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  return (
    <div className="border border-gray-600 rounded-lg">
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar>
          <MarkButton format="bold" icon={TbBold} />
          <MarkButton format="italic" icon={TbItalic} />
          <MarkButton format="underline" icon={TbUnderline} />
          <BlockButton format="lineheight" icon={TbLineHeight} />
          <DropDownButton>
            {[1, 2, 3].map((value, i) => (
              <BlockButton key={i} format="lineheight" icon={TbNumber1} />
            ))}
          </DropDownButton>
          {/* <BlockButton format="numbered-list" icon={TbListNumbers} />
          <BlockButton format="bulleted-list" icon={TbListDetails} /> */}
          <BlockButton format="left" icon={TbAlignLeft} />
          <BlockButton format="center" icon={TbAlignCenter} />
          <BlockButton format="right" icon={TbAlignRight} />
          <BlockButton format="justify" icon={TbAlignJustified} />
          <BlockButton format="indent" icon={TbIndentIncrease} />
          <BlockButton format="outdent" icon={TbIndentDecrease} />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey] as any;
                if (["indent", "outdent"].includes(mark)) {
                  customToggleBlock(editor, mark);
                } else {
                  toggleMark(editor, mark);
                }
              }
            }
          }}
          className="p-3"
        />
      </Slate>
    </div>
  );
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

// const initialValue: Descendant[] = [
//   {
//     type: "paragraph",
//     children: [
//       { text: "This is editable " },
//       { text: "rich", bold: true },
//       { text: " text, " },
//       { text: "much", italic: true },
//       { text: " better than a " },
//       { text: "<textarea>", code: true },
//       { text: "!" },
//     ],
//   },
//   {
//     type: "paragraph",
//     children: [
//       {
//         text: "Since it's rich text, you can do things like turn a selection of text ",
//       },
//       { text: "bold", bold: true },
//       {
//         text: ", or add a semantically rendered block quote in the middle of the page, like this:",
//       },
//     ],
//   },
//   {
//     type: "block-quote",
//     children: [{ text: "A wise quote." }],
//   },
//   {
//     type: "paragraph",
//     align: "center",
//     children: [{ text: "Try it out for yourself!" }],
//   },
// ];
