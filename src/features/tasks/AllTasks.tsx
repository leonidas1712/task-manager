import React, {useState} from 'react';
import { useAppSelector } from '../../app/hooks';
import useSortBy from '../common/useSortBy';
import TasksList from './TasksList';
import { selectAllTasks, selectTasksStatus, selectFilteredTasks } from './tasksSlice';
import { Row } from 'react-bootstrap';
import { StandardSpin } from '../common/Spinners';
import { Loading } from '../../Constants';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import useSearchBar from '../common/useSearchBar';

import { Task } from '../../Types';

// input: searchValue as string
// output: function that takes a Task and returns true if we want to include it, false if exclude
function makeTaskFilter(searchValue: string): (task:Task) => boolean {
    const value: string = searchValue.trim().toLowerCase();

    function taskFilter(task: Task) {
        if (value != '') {
            const name: string = task.name || '';
            const desc: string = task.description || '';

            return name.toLowerCase().includes(value) || 
                desc.toLowerCase().includes(value);
        }

        return true;
    }

    return taskFilter;
}

function AllTasks() {
    const { value, setValue, SearchBar } = useSearchBar();
    //let tasks = useAppSelector(selectAllTasks)
    const tasks = useAppSelector(state => selectFilteredTasks(state, makeTaskFilter(value)));
    const status = useAppSelector(selectTasksStatus); 
    
    const { sortOption, SortByButton } = useSortBy();


    const handleSearchValue = (value:string) => {
       setValue(value);
    }


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

    

    return (
        <div>
            <div className="d-flex align-items-center">
                <h2 className="lead fs-2 mr-5">All tasks</h2> 
                <SearchBar handleSearchValue={handleSearchValue} />
                <div className="mx-5"><SortByButton /></div>
     
                
            </div>
            <hr></hr>
            { displayTasks() }
        </div>

    )
}

export default AllTasks;