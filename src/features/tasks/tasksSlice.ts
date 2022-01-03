import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios';
import { Task } from "../../Types";
import { sortComparer } from "../../Constants";
import { getTasks as getTasksFromAPI } from "../../api/APIService";

const tasksAdapter = createEntityAdapter<Task>({
    sortComparer
});

export const getTasks = createAsyncThunk('tasks/getTasks', async() => {
    return getTasksFromAPI();
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, tasksAdapter.upsertMany)
    }
})

export default tasksSlice.reducer;