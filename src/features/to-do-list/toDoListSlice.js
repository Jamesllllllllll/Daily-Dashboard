import { createSlice } from "@reduxjs/toolkit";

const initialToDoList = [];

const toDoListSlice = createSlice({
    name: 'toDoList',
    initialState: initialToDoList,
    reducers: {
        updateTasks: (state, action) => {
            return [...action.payload];
        }
    }
});

export const { updateTasks } = toDoListSlice.actions;
export default toDoListSlice.reducer;