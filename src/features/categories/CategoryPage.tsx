import React, { useState } from "react";
import { DropdownButton, Dropdown} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectTasksByCategory } from "../common/joinSelectors";
import { errorCategory, Loading, selectAllCategoryIds, selectCategoryById } from "./categoriesSlice";
import TasksList from  '../tasks/TasksList';
import AddTaskButton from "../tasks/AddTaskButton";
import RenameCategory from "./RenameCategory";
import DeleteCategory from "./DeleteCategory";
import { OPTION_NAMES, DEFAULT_OPTION } from "../tasks/taskSorter";
import './CategoryPage.css';
import { selectCategoryStatus } from "./categoriesSlice";
import { StandardSpin } from "../common/Spinners";
import useSortBy from "./useSortBy";

// TODO: everytime I switch categories, it should make a network request to update all tasks
    // (or just the clicked category's tasks?)

function CategoryPage(props:{}) {
    const params = useParams();
    const id = Number(params.categoryId);
    const status = useAppSelector(selectCategoryStatus);
    
    const categoryIds = useAppSelector(selectAllCategoryIds);
    
    const categoryTasks = useAppSelector(state => selectTasksByCategory(state, id));
    let category = useAppSelector((state) => selectCategoryById(state, id));

    const { sortOption, SortByButton } = useSortBy();

    category = category ? category : errorCategory();
    
    if (!categoryIds.includes(id)) {
        switch(status) {
            case Loading.PENDING:
                return <StandardSpin />
            default:
                return (<div className="lead">Category does not exist</div>)
        }
    }

    // category page in charge of default msg
    const displayTasks = () => {
        if (categoryTasks.length == 0) {
            return <div className="lead"> No tasks in this category! Well done. </div>
        } 
        
        return <TasksList tasks={categoryTasks} sortBy={sortOption} />
    }

    return (
            <div className="category-page">
                <div className="d-flex align-items-center mb-2">
                    <h2 className="display-6 fs-2">{category.name}</h2>
                    <RenameCategory category={category}/>    
                    <DeleteCategory category={category} />                    
                    <SortByButton />
                </div>

                <hr className="mt-0 mb-3"></hr>

                <AddTaskButton categoryId={id} />
                { displayTasks() }
            
            </div>
    )
}

export default CategoryPage;