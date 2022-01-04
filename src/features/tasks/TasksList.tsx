import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTasksByCategory } from '../common/joinSelectors';
import TaskCard from './TaskCard';

// use selectAllTasks instead of ids so that we can change sorting easily
type TaskListProps = {
    categoryId: number,
    sortBy?: string | undefined
}
function TasksList(props: TaskListProps) {
    const { categoryId, sortBy } = props;

    const tasks = useAppSelector(state => selectTasksByCategory(state, categoryId));

    return (
        <div>
            From taskslist
            { tasks.map((task) => <TaskCard key={task.id} task={task}/>) }
        </div>
    )
}



export default TasksList;