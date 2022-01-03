import { Category } from "../../Types";
import * as yup from 'yup';
import { selectAllCategories } from './categoriesSlice';
import { useAppSelector } from "../../app/hooks";

// Custom hook to use yup with extra validation, so we can re-use it across components
// TypeScript typing does not work here 

export const isNewCategory = (name:string, categories:Category[]) => {
    return !(categories.map((cat) => cat.name).includes(name));
}

function categoryNames(categories:Category[]): string[] {
    return categories.map((cat) => cat.name);
} 

//https://stackoverflow.com/questions/60525429/how-to-write-a-custom-schema-validation-using-yup-addmethod-for-country-name-a
export default function useYup(): typeof yup {
    const categories = useAppSelector(selectAllCategories);
    const names = categoryNames(categories);

    yup.addMethod(yup.string, 'isValidCategory', function() {
        // custom error message as second arg
        return this.notOneOf(names, "Category name must not already exist")
    })

    return yup;
}