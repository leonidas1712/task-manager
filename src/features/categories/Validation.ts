import { Category } from "../../Types";


export const isValidCategory = (name:string, categories:Category[]) => {
    return !(categories.map((cat) => cat.name).includes(name));
}