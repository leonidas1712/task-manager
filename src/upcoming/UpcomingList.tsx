import React from "react"
import { dateISOToDateStr } from "../features/common/dateObjects";
import { Task } from "../Types"

// pass in due date ISO string and filtered tasks array to use for TasksList
// UpcomingCard can decide how it wants to display the date
// pre filter tasks to avoid unnecc. repeated filtering
function UpcomingCard(props: { dueDateISO:string, tasks: Task[]}) {

}

// input: non-empty task with due dates array
// output: object with key as due date ISO, value as array of tasks with that date
function groupTasksByDueDate(tasks: Task[]) {

    type TaskGroup = Record<string, Task[]>;
    const dateToTasks: TaskGroup = tasks.reduce((acc:TaskGroup, curr:Task) => {
        let key = curr.due_date;
        // convert to date str to get tasks with same date regardless of time
        key = key ? dateISOToDateStr(key) : undefined;
        if (key == undefined) { return acc; } // return immediately in case faulty due date

        // if key exists push curr task onto array
        if (key in acc) {
            acc[key].push(curr);
        
        // doesn't exist: make new array with curr task
        } else {
            acc[key] = [curr];
        }

        return acc;

    }, {});
}

// pass in array of tasks to filter (enables re-use if needed)
function UpcomingList({ tasks }: { tasks: Task[] }) {
    const tasksWithDueDate:Task[] = tasks.filter(t => t.due_date != null);


    if (tasksWithDueDate.length === 0) {
        return (
            <> 
                <hr></hr>
                <p className="lead"> No tasks with due date </p>
            </>
        )
    } else {
        return (
            <div>
                got tasks
                {groupTasksByDueDate(tasksWithDueDate)}
            </div>
        )
    }
}

export default UpcomingList;