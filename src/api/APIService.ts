import { Category, Task } from "../Types";
import axios from 'axios';

// Assume all inputs have been sanitised at this point

const { REACT_APP_API_URL:API_URL } = process.env;
const CATEGORIES = API_URL + "categories";
const TASKS = API_URL + "tasks"

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

export {
    getCategories,
    addCategory,
    getTasks,
    deleteTask
}



//export default APIService();