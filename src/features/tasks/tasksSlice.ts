import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios';
import { Task } from "../../Types";
import { sortComparer } from "../../Constants";
import { getTasks as getTasksFromAPI, 
    deleteTask as deleteTaskFromAPI } from "../../api/APIService";


const tasksAdapter = createEntityAdapter<Task>({
    sortComparer
});

export const getTasks = createAsyncThunk('tasks/getTasks', async() => {
    return getTasksFromAPI();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async(id:number) => {
    return deleteTaskFromAPI(id);
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, tasksAdapter.upsertMany)
        .addCase(deleteTask.fulfilled, tasksAdapter.removeOne)
    }
})

export default tasksSlice.reducer;

export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
} = tasksAdapter.getSelectors((state:RootState) => state.tasks)

export const errorTask = ():Task => {
    return {
        id: -1,
        name: "Error",
        description: "",
        due_date: "",
        priority: "",
        category_id: -1,
        created_at: "",
        updated_at: "",
    }
    
}