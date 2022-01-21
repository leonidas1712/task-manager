import React from "react"
import useSortBy from "../features/categories/useSortBy";
import { dateISOToDateDisplay } from "../features/common/dateObjects";
import TasksList from "../features/tasks/TasksList";
import { Task } from "../Types"

// pass in date string to display and filtered tasks array to use for TasksList
// pre filter tasks to avoid unnecc. repeated filtering
function UpcomingCard(props: { dateDisplay:string, tasks: Task[]}) {
    const { dateDisplay, tasks } = props;
    const { sortOption, SortByButton } = useSortBy();


    return (
        <div>
            <div className="d-flex align-items-center">
                <h3 className="fs-4">{dateDisplay}</h3>
                <SortByButton />
            </div>
            
            <hr></hr>
            <TasksList tasks={tasks} showCategory sortBy={sortOption}/>
            <div className="mb-5"></div>
        </div>
    );
}

// input: non-empty task with due dates array
// output: object with key as due date ISO, value as array of tasks with that date
type TaskGroupByDate = Record<string, Task[]>;
function groupTasksByDueDate(tasks: Task[]): TaskGroupByDate {
    const dateToTasks: TaskGroupByDate = tasks.reduce((acc:TaskGroupByDate, curr:Task) => {
        let key = curr.due_date;
        // convert to date display str to get tasks with same date regardless of time
        // use it directly for displaying, no extra conversion req.
        key = key ? dateISOToDateDisplay(key) : undefined;
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

    console.log(dateToTasks);

    return dateToTasks;
}

// pass in array of tasks to filter (enables re-use if needed)
function UpcomingList({ tasks }: { tasks: Task[] }) {
    const tasksWithDueDate:Task[] = tasks.filter(t => t.due_date != null);


    const groupToCards = () => {
        const group = groupTasksByDueDate(tasksWithDueDate);

        return Object.keys(group).map((key) => 
            <UpcomingCard key={key} dateDisplay={key} tasks={group[key]} />
        );
    }


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
                {groupToCards()}
            </div>
        )
    }
}

export default UpcomingList;