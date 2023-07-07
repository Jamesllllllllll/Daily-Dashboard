import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: []
    },
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
        editNote: (state, action) => {
            const { dateTimeToUpdate, editedNote } = action.payload;
            state.notes = state.notes.map(item =>
                item.dateTime === dateTimeToUpdate ? { ...item, data: editedNote } : item
            );
        },
        deleteNote: (state, action) => {
            const dateTimeToRemove = action.payload;
            state.notes = state.notes.filter(item => item.dateTime !== dateTimeToRemove);
        }
    }
});

export const { editNote, addNote, deleteNote } = notesSlice.actions;

export const notesSelector = (state) => state.notes.notes;

export default notesSlice.reducer;