import React, {useState, useEffect} from "react";
import { DropdownButton, Dropdown} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectTasksByCategory } from "../common/joinSelectors";
import { selectAllTasks } from "../tasks/tasksSlice";
import { errorCategory, Loading, selectAllCategoryIds, selectCategoryById } from "./categoriesSlice";
import TasksList from  '../tasks/TasksList';
import AddTaskButton from "../tasks/AddTaskButton";
import RenameCategory from "./RenameCategory";
import DeleteCategory from "./DeleteCategory";
import { OPTION_NAMES, DEFAULT_OPTION } from "../tasks/taskSorter";
import './CategoryPage.css';
import { useNavigateHelper, CATEGORIES_PATH  } from "../../urlHelper";
import { selectCategoryStatus } from "./categoriesSlice";


// TODO: everytime I switch categories, it should make a network request to update all tasks
    // (or just the clicked category's tasks?)

function CategoryPage(props:{}) {
    const params = useParams();
    const id = Number(params.categoryId);
    const status = useAppSelector(selectCategoryStatus);
    
    const categoryIds = useAppSelector(selectAllCategoryIds);
    
    const categoryTasks = useAppSelector(state => selectTasksByCategory(state, id));
    let category = useAppSelector((state) => selectCategoryById(state, id));
    category = category ? category : errorCategory();

    const [sortOption, setSortOption] = useState(DEFAULT_OPTION || "Error");
    
    if (!categoryIds.includes(id)) {
        switch(status) {
            case Loading.PENDING:
                return <div className="lead display-6">Loading...</div>
            default:
                return (<div className="lead">Category does not exist</div>)
        }
    }

    // category page in charge of default msg
    const displayTasks = () => {
        if (categoryTasks.length == 0) {
            return <div className="lead"> No tasks in this category! Well done. </div>
        } 
        
        return <TasksList categoryId={id} sortBy={sortOption}/>
    }

    const dropDownOptions = () => {
        return OPTION_NAMES.map((name) => {
            return <Dropdown.Item key={name} eventKey={name}>{name}</Dropdown.Item>
        });
    }

    const optionSelectFn = (val:string | null) => {
        if (!val) {
            setSortOption(DEFAULT_OPTION || "Error");
            return;
        }

        setSortOption(val);
    }

    
    return (
            <div className="category-page">
                <div className="d-flex align-items-center mb-2">
                    <h2>{category.name}</h2>
                    <RenameCategory category={category}/>    
                    <DeleteCategory category={category} />

                    {/* marginleft: auto pushes completely to right in flexbox */}
                    {/* TODO: move Sort By button into its own hook (expose sortBy value) */}
                    <DropdownButton style={{marginLeft:"auto"}} variant="info" title={`Sort by: ${sortOption}`} onSelect={optionSelectFn}
                        className="my-dropdown"
                    >
                        
                        { dropDownOptions() }
                    </DropdownButton>
                </div>

                <hr className="mt-0 mb-3"></hr>

                <AddTaskButton categoryId={id} />
                { displayTasks() }
            
            </div>
    )
}

export default CategoryPage;