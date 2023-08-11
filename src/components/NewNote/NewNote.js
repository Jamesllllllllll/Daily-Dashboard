import React, { useState } from 'react';
import StyledCard from '../LayoutComponents/FeatureCard';

import RichTextEditor from '../RichTextEditor/RichTextEditor';

import { useDispatch } from 'react-redux';
import { addNote } from '../../features/notes/notesSlice';

// const paperStyles = {
//   minWidth: 550, // Set the desired maximum width
//   padding: '1rem', // Center the editor on the page
//   height: 'fitContent',
//   border: '1px solid #ccc',
//   display: 'flex',
//   flexWrap: 'wrap',
//   justifyContent: 'end',
//   alignItems: 'center',
// };

const NewNote = () => {
  const dispatch = useDispatch();

  // Initialising the text editor is required
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];

  const [data, setData] = useState(initialValue);
  const [dateTime, setDateTime] = useState(new Date().toString());

  const handleSubmit = () => {
    // Do not proceed if text field is empty
    if (
      data.length === 1 &&
      data[0].children.length === 1 &&
      data[0].children[0].text === ''
    ) {
      return;
    }
    // Each note object is idenified by a datetime string
    setDateTime(new Date().toString());
    // Add note to notes state
    dispatch(addNote({ dateTime, data }));
    // Finally clear data
    setData(initialValue);
  };

  return (
    <StyledCard content={<RichTextEditor
        data={data}
        allowEdit={true}
        setData={setData}
        handleSubmit={handleSubmit}
        newNote={true}
      />} />
  );
};

export default NewNote;
