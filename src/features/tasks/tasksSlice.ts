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
    TaskPostObject,
    TaskPatchObject
} from "../../api/APIService";
import { convertTaskFormToPostObject } from "./ConvertTaskPayload";
import { EntityState, EntityId } from "@reduxjs/toolkit";
import { Category } from "../../Types";
import { deleteCategory } from "../categories/categoriesSlice";


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
    body: TaskPatchObject
}

export const editTask = createAsyncThunk('tasks/editTask', async(arg: EditTaskArg) => {
    return editTaskInAPI(arg.params, arg.body);
});

export const addTask = createAsyncThunk('tasks/addTask', async(arg: TaskPostArg) => {
    const {category_id, ...body} = arg;
    return addTaskToAPI(category_id, body);
});

// For local selectors that operate on state.tasks only.
// Selectors at the bottom of the file operate on root state instead, to use in useAppSelector
const { selectAll:selectAllTasksLocal } = tasksAdapter.getSelectors();

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, tasksAdapter.upsertMany)
        .addCase(deleteTask.fulfilled, tasksAdapter.removeOne)
        .addCase(addTask.fulfilled, tasksAdapter.addOne)
        .addCase(editTask.fulfilled, (state, action) => {
            const { id, ...changes } = action.payload;
            // updateOne expects Update<Task> which is obj = { id, changes }
            const update = {
                id,
                changes
            };

            tasksAdapter.updateOne(state, update);
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            const { id: idDeleted } = action.payload;
            const tasks = selectAllTasksLocal(state);

            // remove tasks with category id same as that of category just deleted
            const tasksToDelete = tasks
                .filter((task) => task.category_id == idDeleted)
                .map((task) => task.id);

            // removeMany expects ids of tasks to remove
            tasksAdapter.removeMany(state, tasksToDelete);
        });
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