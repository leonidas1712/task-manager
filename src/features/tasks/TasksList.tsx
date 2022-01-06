import React from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { Task } from '../../Types';
import { selectTasksByCategory } from '../common/joinSelectors';
import TaskCard from './TaskCard';
import { sortTasks } from './taskSorter';


// take in array of tasks to enable re-use in upcoming page
type TaskListProps = {
    tasks: Task[],
    sortBy?: string | undefined
}
function TasksList(props: TaskListProps) {
    const { tasks, sortBy } = props;
    const sortedTasks = sortTasks(tasks, sortBy);
    return (
        <div>
            { sortedTasks.map((task) => <TaskCard key={task.id} task={task}/>) }
        </div>
    )
}



export default TasksList;