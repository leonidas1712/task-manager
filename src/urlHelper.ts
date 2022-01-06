import { BASE_URL } from "./Constants";
import { useLocation } from "react-router-dom";

// take in url location.pathname from useLocation and return the page id (upcoming or category id)
// format: /BASE_URL/:id e.g '/categories/113', page id might be blank
const pageIdFromUrl = (url:string) => {
    const start = `/${BASE_URL}/`;
    return url.substring(start.length);
}

export function usePageId() {
    const location = useLocation();
    return pageIdFromUrl(location.pathname);
}
