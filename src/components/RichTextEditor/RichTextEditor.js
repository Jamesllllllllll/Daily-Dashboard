import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";

import { Button } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import {
    Element,
    Leaf,
    Toolbar,
    MarkButton,
    BlockButton,
    toggleMark
} from './slateComponents';


const RichTextEditor = ({
    data,
    allowEdit,
    newNote,
    setData,
    handleSubmit
}) => {

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);

    const handleClearText = (editor) => {
        const point = { path: [0, 0], offset: 0 }
        editor.selection = { anchor: point, focus: point };
        editor.history = { redos: [], undos: [] };
        editor.children = [{
            type: "paragraph",
            children: [{ text: "" }]
        }];
    };

    const handleOnChange = (newData) => {
        setData(newData);
    };

    const handleSave = () => {
        handleSubmit();
        if (newNote) {
            handleClearText(editor);
        };
    }

    return (
        <>
            <Slate
                editor={editor}
                initialValue={data}
                onChange={handleOnChange}
            >
                {
                    allowEdit
                        ?
                        (<Toolbar style={toolbarStyles} >
                            <MarkButton format="bold" icon={<FormatBoldIcon />} />
                            <MarkButton format="italic" icon={<FormatItalicIcon />} />
                            <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
                            <MarkButton format="code" icon={<CodeIcon />} />
                            <BlockButton format="heading-one" icon={<LooksOneIcon />} />
                            <BlockButton format="heading-two" icon={<LooksTwoIcon />} />
                            <BlockButton format="block-quote" icon={<FormatQuoteIcon />} />
                            <BlockButton format="numbered-list" icon={<FormatListNumberedIcon />} />
                            <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon />} />
                        </Toolbar>)
                        :
                        null
                }
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder=""
                    spellCheck
                    onKeyDown={event => {
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event)) {
                                event.preventDefault();
                                const mark = HOTKEYS[hotkey];
                                toggleMark(editor, mark);
                            }
                        }
                    }}
                    readOnly={!allowEdit}
                    style={editableStyles}
                />
            </Slate>
            {
                allowEdit
                    ?
                    (<Button
                        variant="outlined"
                        size="small"
                        onClick={handleSave}
                        sx={buttonStyles}
                    >
                        Save
                    </Button>)
                    :
                    null
            }

        </>

    );
};

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code"
};

const toolbarStyles = {
    width: '100%',
    margin: '1rem auto',
    fontSize: '1rem',
    textAlign: 'center'
}
const editableStyles = {
    // padding: '0 0.75rem',
    minHeight: '10rem',
    // margin: '1rem',
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    fontSize: '1rem',
    lineHeight: 'normal',
    textAlign: 'start',
    border: '1px solid #ddd',
}

const buttonStyles = {
    marginTop: '1rem',
    position: 'relative',
    right: '.75rem'
}

export default RichTextEditor;
