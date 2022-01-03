import { Category } from "../Types";
import axios from 'axios';

// Assume all inputs have been sanitised at this point

const { REACT_APP_API_URL:API_URL } = process.env;
const CATEGORIES = API_URL + "categories";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCategories(): Promise<Category[]> {
    const res = await axios.get<Category[]>(CATEGORIES);
    return res.data;
}

async function addCategory(name: string): Promise<Category> {
    const res = await axios.post<Category>(CATEGORIES, { name });
    return res.data;
}

export {
    getCategories,
    addCategory
}



//export default APIService();