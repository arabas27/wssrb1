import type { RenderElementProps } from "slate-react";
import { isAlignElement } from "../plugins/checker";
import type { AlignType } from "../types";

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style: React.CSSProperties = {};
  if (isAlignElement(element)) {
    style.textAlign = element.align as AlignType;
  }

  switch (element.type) {
    // case "block-quote":
    //   return (
    //     <blockquote style={style} {...attributes}>
    //       {children}
    //     </blockquote>
    //   );
    case "bulleted-list":
      return (
        <ul className="list-disc" style={style} {...attributes}>
          {children}
        </ul>
      );
    // case "heading-one":
    //   return (
    //     <h1 style={style} {...attributes}>
    //       {children}
    //     </h1>
    //   );
    // case "heading-two":
    //   return (
    //     <h2 style={style} {...attributes}>
    //       {children}
    //     </h2>
    //   );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol className="list-decimal" style={style} {...attributes}>
          {children}
        </ol>
      );
    case "indent":
      style.textIndent = 1.25 * element.indent + "cm";
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
    case "lineheight":
      style.lineHeight = element.lineheight * 1.5;
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export default Element;
