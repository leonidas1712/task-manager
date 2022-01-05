import { Category, Task } from "../Types";
import axios from 'axios';

// Assume all inputs have been sanitised at this point

const { REACT_APP_API_URL:API_URL } = process.env;
const CATEGORIES_NAME = "categories";
const TASKS_NAME = "tasks";

const CATEGORIES = API_URL + CATEGORIES_NAME;
const TASKS = API_URL + TASKS_NAME;

// to test loading/spinners
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// GET categories/
async function getCategories(): Promise<Category[]> {
    const res = await axios.get<Category[]>(CATEGORIES);
    return res.data;
}

// POST categories/, body: { name: string }
async function addCategory(name: string): Promise<Category> {
    const res = await axios.post<Category>(CATEGORIES, { name });
    return res.data;
}

// GET tasks/
async function getTasks(): Promise<Task[]> {
    const res = await axios.get<Task[]>(TASKS);
    return res.data;
}

// DELETE tasks/:id
async function deleteTask(id: number): Promise<number> {
    const url = `${TASKS}/${id}`;
    const res = await axios.delete<Task>(url);
    return res.data.id;
}

// POST /categories/:id/tasks
// TODO: refactor API to expose POST /tasks with body including category id, same for edit task
async function addTask(categoryId:number, body: TaskPostObject): Promise<Task> {
    const url = `${CATEGORIES}/${categoryId}/${TASKS_NAME}`;
    const res = await axios.post<Task>(url, body);
    return res.data;
}

// PATCH /categories/:category_id/tasks/:taskid
// receive params in sep. object so can re-use TaskPostObject type
type EditTaskParams = { categoryId:number, taskId: number }
async function editTask(params:EditTaskParams, body: TaskPostObject): Promise<Task> {
    const { categoryId, taskId } = params;
    const url = `${CATEGORIES}/${categoryId}/${TASKS_NAME}/${taskId}`;
    const res = await axios.patch<Task>(url, body);
    return res.data;
}

// object for use in POST request to add task
export type TaskPostObject = {
    name: string;
    description?: string | null;
    due_date?:string | null // ISO string !important TODO: find out if TS has ISO String type
    priority?: string | null
}

export {
    getCategories,
    addCategory,
    getTasks,
    deleteTask,
    addTask,
    editTask
}



//export default APIService();