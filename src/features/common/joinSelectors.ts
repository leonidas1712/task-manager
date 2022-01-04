// Selectors that need to bring both tasks and categories together (like a JOIN table)
// Sep. file to avoid circular dep.

import { RootState } from "../../app/store";
import { selectAllTasks } from "../tasks/tasksSlice";

export const selectTasksByCategory = (state:RootState, id:string | number) => {
    return selectAllTasks(state)
            .filter((task) => task.category_id == id)
}