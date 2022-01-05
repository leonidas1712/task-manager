import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios';
import { Task } from "../../Types";
import { sortComparer } from "../../Constants";
import { 
    getTasks as getTasksFromAPI, 
    deleteTask as deleteTaskFromAPI,
    addTask as addTaskToAPI,
    editTask as editTaskInAPI,
    EditTaskParams,
    TaskPostObject
} from "../../api/APIService";
import { convertTaskFormToPostObject } from "./ConvertTaskPayload";


const tasksAdapter = createEntityAdapter<Task>({
    sortComparer
});

export const getTasks = createAsyncThunk('tasks/getTasks', async() => {
    return getTasksFromAPI();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async(id:number) => {
    return deleteTaskFromAPI(id);
});

// TODO: find out how to re-use members of one type in another
export type TaskPostArg = {
    category_id:number;
    name: string;
    description?: string | null;
    due_date?:string | null 
    priority?: string | null
}

export type EditTaskArg = {
    params: EditTaskParams,
    body: TaskPostObject
}

export const editTask = createAsyncThunk('tasks/editTask', async(arg: EditTaskArg) => {
    console.log("Edit task arg: " , arg.body);
    return editTaskInAPI(arg.params, arg.body);
});

export const addTask = createAsyncThunk('tasks/addTask', async(arg: TaskPostArg) => {
    const {category_id, ...body} = arg;
    return addTaskToAPI(category_id, body);
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, tasksAdapter.upsertMany)
        .addCase(deleteTask.fulfilled, tasksAdapter.removeOne)
        .addCase(addTask.fulfilled, tasksAdapter.addOne)
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