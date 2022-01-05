import React, {useState} from "react";
import { Container, Button, Row, Col, Modal, DropdownButton, Dropdown} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectTasksByCategory } from "../common/joinSelectors";
import { selectAllTasks } from "../tasks/tasksSlice";
import { errorCategory, selectCategoryById } from "./categoriesSlice";
import TasksList from  '../tasks/TasksList';
import AddTaskButton from "../tasks/AddTaskButton";
import RenameCategory from "./RenameCategory";
import DeleteCategory from "./DeleteCategory";
import { OPTION_NAMES } from "../tasks/taskSorter";

// TODO: everytime I switch categories, it should make a network request to update all tasks

function CategoryPage(props:{}) {
    const params = useParams();
    const [show, setShow] = useState<boolean>(false);
    
    const id = Number(params.categoryId);

    const categoryTasks = useAppSelector(state => selectTasksByCategory(state, id));

    // category page in charge of default msg
    const displayTasks = () => {
        if (categoryTasks.length == 0) {
            return <div className="lead"> No tasks in this category! Well done. </div>
        } 
        
        return <TasksList categoryId={id}/>
    }

    let category = useAppSelector((state) => selectCategoryById(state, id));
    category = category ? category : errorCategory();
 
    return (
            <div>
                <div className="d-flex align-items-center mb-2">
                    <h2>{category.name}</h2>
                    <RenameCategory category={category}/>    
                    <DeleteCategory category={category} />

                    {/* marginleft: auto pushes completely to right in flexbox */}
                    <DropdownButton style={{marginLeft:"auto"}} variant="info" title="Sort by: Newest" onSelect={(val) => console.log(val)}>
                        <Dropdown.Item eventKey="alpha">A-Z</Dropdown.Item>
                    </DropdownButton>
                </div>

                <hr className="mt-0 mb-3"></hr>

                <AddTaskButton categoryId={id} />
                { displayTasks() }
            
            </div>
    )
}

export default CategoryPage;