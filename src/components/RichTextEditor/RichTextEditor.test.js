import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RichTextEditor from './RichTextEditor';


test('inserts text into the editor', async () => {

    render(<RichTextEditor
        data={[{ type: "paragraph", children: [{ text: "" }] }]}
        allowEdit={true}
        newNote={true}
        setData={()=>{}}
        handleSubmit={()=>{}}
    />);

    // Insert text into the editor
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'New text inserted.');

    // Check if the inserted text is rendered
    const paragraph = await screen.findByText('New text inserted.');
    expect(paragraph).toBeInTheDocument();
    
});

