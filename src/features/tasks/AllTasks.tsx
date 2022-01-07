import React from 'react';
import { useAppSelector } from '../../app/hooks';
import useSortBy from '../categories/useSortBy';
import TasksList from './TasksList';
import { selectAllTasks, selectTasksStatus } from './tasksSlice';
import { Row } from 'react-bootstrap';
import { StandardSpin } from '../common/Spinners';
import { Loading } from '../../Constants';





function AllTasks() {
    const tasks = useAppSelector(selectAllTasks)
    const status = useAppSelector(selectTasksStatus);

    const displayTasks = () => {
        if (tasks.length == 0) {
            switch (status) {
                case Loading.PENDING:
                    return <StandardSpin />;
                case Loading.IDLE:
                case Loading.FULFILLED:
                    return  <p className="lead">No tasks to show</p>;
                case Loading.REJECTED:
                    return <p className="lead text-danger">Error loading tasks</p>

            }
        }

        return <TasksList tasks={tasks} showCategory sortBy={sortOption}/>;        
    }

    const { sortOption, SortByButton } = useSortBy();

    return (
        <div>
            <div className="d-flex align-items-center">
                <h2 className="lead fs-2">All Tasks</h2> 
                <div className="mx-5"><SortByButton /></div>
            </div>
            <hr></hr>
            { displayTasks() }
        </div>

    )
}

export default AllTasks;