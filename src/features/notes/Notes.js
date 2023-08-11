import React from 'react';
import NoteCard from '../../components/NoteCard/NoteCard';
import NewNote from '../../components/NewNote/NewNote';
import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { notesSelector } from './notesSlice';

const Notes = () => {
  const notes = useSelector(notesSelector);

  return (
    <>
      <Box>
        <h2 className="cardTitle">Notes</h2>
        <NewNote />
        {notes.map((entry) => (
          <NoteCard
            key={entry.dateTime}
            dateTime={entry.dateTime}
            data={entry.data}
          />
        ))}
      </Box>
    </>
  );
};

export default Notes;
