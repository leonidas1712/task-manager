import React, {useState} from 'react';
import { useAppSelector } from '../../app/hooks';
import useSortBy from '../common/useSortBy';
import TasksList from './TasksList';
import { selectAllTasks, selectTasksStatus, selectFilteredTasks } from './tasksSlice';
import { StandardSpin } from '../common/Spinners';
import { Loading } from '../../Constants';
import SearchBar from '../common/SearchBar';

function AllTasks() {
    const [value, setValue] = useState<string>(""); // search value, in order to refresh selector below
    const tasks = useAppSelector(selectAllTasks);
    const status = useAppSelector(selectTasksStatus); 
    
    const { sortOption, SortByButton } = useSortBy();


    const displayTasks = () => {
        if (tasks.length == 0) {
            switch (status) {
                case Loading.PENDING:
                    return <StandardSpin />;
                case Loading.IDLE:
                case Loading.FULFILLED:
                    return  <p className="lead">No tasks to show. Well done!</p>;
                case Loading.REJECTED:
                    return <p className="lead text-danger">Error loading tasks</p>

            }
        }

        return <TasksList tasks={tasks} showCategory showSearch sortBy={sortOption}/>;        
    }

    

    return (
        <div>
            <div className="d-flex align-items-center">
                <h2 className="lead fs-2 mr-5">All tasks</h2> 
                <div className="mx-5"><SortByButton /></div>  
            </div>

            <hr></hr>

            { displayTasks() }
        </div>

    )
}

export default AllTasks;