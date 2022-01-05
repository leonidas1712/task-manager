import React, {useState} from "react";
import { Container, Button, Row, Col, Modal, } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectTasksByCategory } from "../common/joinSelectors";
import { selectAllTasks } from "../tasks/tasksSlice";
import { errorCategory, selectCategoryById } from "./categoriesSlice";
import TasksList from  '../tasks/TasksList';
import AddTaskButton from "../tasks/AddTaskButton";
import RenameCategory from "./RenameCategory";

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
        <div className="w-75 px-3 py-3">
            <div>
                <div className="d-flex align-items-center mb-2">
                    <h2>Category: {category.name}</h2>
                    {/* <Button variant="primary mx-3" onClick={() => setShow(true)}> Rename </Button> */}
                    <RenameCategory category={category}/>
                    <Button variant="danger"> Delete </Button>
                </div>

                <hr className="mt-0 mb-0"></hr>

                <AddTaskButton categoryId={id} />
                { displayTasks() }
                
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title> Rename category </Modal.Title>
                        
                    </Modal.Header>

                    <Modal.Body> Body text</Modal.Body>
                </Modal>
            </div>

            
        </div>
    )
}

export default CategoryPage;