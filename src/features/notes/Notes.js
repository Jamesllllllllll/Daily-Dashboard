import React from 'react';
import NoteCard from '../../components/NoteCard/NoteCard';
import NewNote from '../../components/NewNote/NewNote';

import { useSelector } from 'react-redux';
import { notesSelector } from './notesSlice';


const Notes = () => {

    const notes = useSelector(notesSelector);

    return (
        <>
            <h1>Penny for your thoughts?</h1>
            <NewNote />
            {notes.map((entry) =>
                <NoteCard 
                    key={entry.dateTime}
                    dateTime={entry.dateTime} 
                    data={entry.data} 
                />
            )}
        </>
    );
};

export default Notes;