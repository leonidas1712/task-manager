// A-Z, Z-A, Newest first, Oldest first, Due date (most urgent)
import { Task } from '../../Types';

type TaskSorter = (a: Task, b:Task) => number

const sortByAlphaAsc:TaskSorter = (a,b) => {
    return 1;
}

const sortByAlphaDesc:TaskSorter = (a,b) => {
    return 1;
}

const sortByNewestFirst:TaskSorter = (a,b) => {
    return 1;
}

const sortByOldestFirst:TaskSorter = (a,b) => {
    return 1;
}

const sortByDueDate:TaskSorter = (a,b) => {
    return 1;
}

const SORT_OPTIONS: Record<string, TaskSorter> = {
    "A-Z": sortByAlphaAsc,
    "Z-A": sortByAlphaDesc,
    "Newest first": sortByNewestFirst,
    "Oldest first": sortByOldestFirst,
    "Due date": sortByDueDate
}

export const OPTION_NAMES = Object.keys(SORT_OPTIONS);

let arr:Task[] = [];
// title, due date, default
export {}