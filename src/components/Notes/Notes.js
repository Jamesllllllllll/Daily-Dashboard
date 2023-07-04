import React, { useState } from 'react';
import NoteCard from './NoteCard';
import NewNote from './NewNote';

const Notes = () => {

    // Stores all note objects
    const [notes, setNotes] = useState([]);

    // Retrieves and update an exisiting note
    const handleEditNote = (dateTimeToUpdate, editedNote) => {

        const updatedNotes = notes.map((item) =>
            item.dateTime === dateTimeToUpdate ? { ...item, data: editedNote } : item
        );
        setNotes(updatedNotes);

    }

    // Create a new note object and add to the notes array
    const handleAddNote = (newNote) => {
        setNotes([...notes, newNote]);
    }

    // Deletes a note identified by its datetime string from the notes array 
    const handleDeleteNote = (dateTimeToRemove) => {
        setNotes(notes.filter(item => item.dateTime !== dateTimeToRemove));
        console.log(dateTimeToRemove)
    }


    return (
        <>
            <h1>Penny for your thoughts?</h1>
            <NewNote
                handleEditNote={handleEditNote}
                handleAddNote={handleAddNote}
            />
            {notes.map((entry) =>
                <NoteCard 
                    key={entry.dateTime}
                    dateTime={entry.dateTime} 
                    data={entry.data} 
                    handleEditNote={handleEditNote}
                    handleDeleteNote={handleDeleteNote}
                />
            )}
        </>
    );
};

export default Notes;