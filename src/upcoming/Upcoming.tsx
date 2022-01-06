import React from 'react';
import { useAppSelector } from '../app/hooks';
import TasksList from '../features/tasks/TasksList';
import { selectAllTasks } from '../features/tasks/tasksSlice';



function Upcoming() {
    const tasks = useAppSelector(selectAllTasks);
    return (
        <div>
            <h1>Upcoming</h1>
            <TasksList tasks={tasks} showCategory={true} />
        </div>
    );
}

export default Upcoming;