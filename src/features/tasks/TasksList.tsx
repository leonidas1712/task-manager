import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { Task } from '../../Types';
import { selectTasksByCategory } from '../common/joinSelectors';
import SearchBar from '../common/SearchBar';
import TaskCard from './TaskCard';
import { sortTasks } from './taskSorter';
import { makeTaskFilter } from './tasksSlice';

// take in array of tasks to enable re-use in upcoming page
type TaskListProps = {
    tasks: Task[],
    sortBy?: string | undefined,
    showCategory?: boolean | undefined,
    showSearch?:boolean | undefined
}
function TasksList(props: TaskListProps) {
    const { tasks, sortBy, showCategory, showSearch } = props;
    const [value, setValue] = useState<string>("");

    const filteredTasks = tasks.filter(makeTaskFilter(value));
    const sortedTasks = sortTasks(filteredTasks, sortBy);    

    const showTasks = (tasks:Task[]) => {
        return tasks.length == 0 ? <p className="lead">No tasks to show</p> : 
            tasks.map((task) => <TaskCard key={task.id} task={task} showCategory={showCategory ? true : false} />)
    }


    return (
        <div>
            { showSearch ? <SearchBar handleSearchValue={(val:string) => setValue(val)}/> : ''}
            <div className="mt-3"></div>
            { showTasks(sortedTasks) }
        </div>
    )
}



export default TasksList;