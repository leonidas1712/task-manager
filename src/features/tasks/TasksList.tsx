import React from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { selectTasksByCategory } from '../common/joinSelectors';
import TaskCard from './TaskCard';
import { sortTasks } from './taskSorter';
import './TaskList.css';


// use selectAllTasks instead of ids so that we can change sorting easily
type TaskListProps = {
    categoryId: number,
    sortBy?: string | undefined
}
function TasksList(props: TaskListProps) {
    const { categoryId, sortBy } = props;

    const tasks = useAppSelector(state => selectTasksByCategory(state, categoryId));
    // tasks = sortTasks(tasks, sortBy);
    const sortedTasks = sortTasks(tasks, sortBy);
    return (
        <div className="task-list">
            { sortedTasks.map((task) => <TaskCard key={task.id} task={task}/>) }
        </div>
    )
}



export default TasksList;