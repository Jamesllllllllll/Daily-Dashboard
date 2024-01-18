import React from "react";

import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";

import { cx, css } from "@emotion/css";


const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true
    });

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format
    });

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

export const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format
    });

    return !!match;
};

export const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

export const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }
    switch (element.type) {
        case "block-quote":
            return <blockquote style={style} {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul style={style} {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 style={style} {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 style={style} {...attributes}>{children}</h2>;
        case "list-item":
            return <li style={style} {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol style={style} {...attributes}>{children}</ol>;
        default:
            return <p style={style} {...attributes}>{children}</p>;
    }
};

export const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

export const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    );
};

export const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    );
};

export const Button = React.forwardRef(
    ({ className, active, reversed, ...props }, ref) => (
        <span
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
            cursor: pointer;
            color: ${reversed
                        ? active
                            ? "white"
                            : "#aaa"
                        : active
                            ? "black"
                            : "#ccc"};
          `
            )}
        />
    )
);

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
    <span
        {...props}
        ref={ref}
        className={cx(
            "material-icons",
            className,
            css`
          font-size: 1rem;
          vertical-align: text-bottom;
        `
        )}
    />
));

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={cx(
            className,
            css`
          & > * {
            display: inline-block;
          }
  
          & > * + * {
            margin-left: 15px;
          }
        `
        )}
    />
));

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu
        {...props}
        ref={ref}
        className={cx(
            className,
            css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
        )}
    />
));