import { Category } from "../Types";
import axios from 'axios';

function APIService() {
    const { REACT_APP_API_URL:API_URL } = process.env;

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function getCategories(): Promise<Category[]> {
        const url = API_URL + "categories";
        const res = await axios.get<Category[]>(url);
        return res.data;
    }

    return {
        getCategories
    }
}



export default APIService();