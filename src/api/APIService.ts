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
// TODO: refactor API to expose POST /tasks with body including category id
async function addTask(category_id:number, body: TaskPostObject): Promise<Task> {
    const url = `${CATEGORIES}/${category_id}/${TASKS_NAME}`;
    console.log(url);
    const res = await axios.post<Task>(url, body);
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
    addTask
}



//export default APIService();