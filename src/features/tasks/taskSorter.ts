// A-Z, Z-A, Newest first, Oldest first, Due date (most urgent)
import { sortComparer } from '../../Constants';
import { Task } from '../../Types';

type TaskSorter = (a: Task, b:Task) => number

const sortByAlphaAsc:TaskSorter = (a,b) => {
    return a.name.localeCompare(b.name);
}

const sortByAlphaDesc:TaskSorter = (a,b) => {
    return -1 * sortByAlphaAsc(a, b);
}

// newest/oldest by updated_at - so that if I update a task it comes to the top 
const sortByNewestFirst:TaskSorter = (a,b) => {
    return -1 * sortByOldestFirst(a, b);
}

const sortByOldestFirst:TaskSorter = (a,b) => {
    return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
    
}

// most urgent (smallest date first)
// due date is optional: cases
// a,b both no due date: use default order (alpha or newest first)
// a due, b no due: a comes first
// a no due, b due: b comes first
// a,b both have due: compare date, earlier comes first
const sortByDueDate:TaskSorter = (a,b) => {
    const aDue = a.due_date;
    const bDue = b.due_date;

    if (aDue && bDue) {
        return new Date(aDue).getTime() - new Date(bDue).getTime();
    }

    else if (aDue && !bDue) {
        return -1;
    }

    else if (!aDue && bDue) {
        return 1;
    }

    // WARN: this might lead to recursive loop if default is set to this fn
    return SORT_OPTIONS[DEFAULT_OPTION](a, b);

}

const SORT_OPTIONS: Record<string, TaskSorter> = {
    "A-Z": sortByAlphaAsc,
    "Z-A": sortByAlphaDesc,
    "Newest first": sortByNewestFirst,
    "Oldest first": sortByOldestFirst,
    "Due date": sortByDueDate
}

export const OPTION_NAMES = Object.keys(SORT_OPTIONS);

// set default sorting option: might cause issue if default is sort by due date
export const DEFAULT_OPTION = OPTION_NAMES[0];

export const sortTasks = (tasks: Task[], sortBy: string | undefined | null):Task[] => {
    console.log("Sort by: ", sortBy);
    sortBy = sortBy || DEFAULT_OPTION;
    const sorter = SORT_OPTIONS[sortBy];
    return tasks.map((task) => task).sort(sorter);
} 
