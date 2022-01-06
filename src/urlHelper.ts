import { useLocation, useNavigate } from "react-router-dom";
//import { BASE_URL } from "./Constants";
const CATEGORIES_PATH = "categories";
const UPCOMING_PATH = "upcoming";

// assumption: id is numeric
const isId = (url:string):boolean => {
    return !isNaN(Number(url));
}

// take in url location.pathname from useLocation and return the page id (upcoming or category id)
// format: /BASE_URL/:id e.g '/categories/113', page id might be blank
const pageIdFromUrl = (url:string):string => {
    //const start = `/${CATEGORIES_PATH}/`;
    // use split on "/" to get the very last part of the url: either a string like upcoming or a numeric id
    const arr =  url.split("/");
    return arr[arr.length - 1];
}

export function usePageId() {
    const location = useLocation();
    console.log(location.pathname);
    return pageIdFromUrl(location.pathname);
}

// custom use navigate that takes in only the desired path (last part of url) and routes based on
// whether it is a category id (numeric) or something else
// so that we don't have to keep calling /categories/ etc. inside components
export function useNavigateHelper() {
    const navigate = useNavigate();

    function customNavigate(path: string) {
        if (isId(path)) {
            const url = `${CATEGORIES_PATH}/${path}`;
            return navigate(url);
        }

        return navigate(path);
    }

    return customNavigate;
}