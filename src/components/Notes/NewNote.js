import React, { useState } from 'react';
import { Paper, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


import RichTextEditor from '../RichTextEditor/RichTextEditor';

const NewNote = ({ handleAddNote }) => {

    const theme = createTheme();

    // Initialising the text editor is required
    const initialValue = [
        {
            type: "paragraph",
            children: [
                { text: "" }
            ]
        }
    ]

    const [data, setData] = useState(initialValue);
    const [dateTime, setDate] = useState(new Date().toString());

    const handleSubmit = () => {
        // Do not proceed if text field is empty
        if (data.length === 1 && data[0].children.length === 1 && data[0].children[0].text === '') {
            return;
        };
        // Each note object is idenified by a datetime string
        setDate(new Date().toString());
        // Add to state
        handleAddNote({ dateTime, data });
        // Finally clear data
        setData(initialValue);
    }


    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Paper
                    sx={{
                        width: '60%', // Set the desired maximum width
                        padding: '1rem', // Center the editor on the page
                        height: 'fitContent',
                        border: '1px solid #ccc',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'end',
                        alignItems: 'center'
                    }}
                >
                    <RichTextEditor
                        data={data}
                        allowEdit={true}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        newNote={true}
                    />

                </Paper>
            </ThemeProvider>
        </>
    );
};

export default NewNote;
