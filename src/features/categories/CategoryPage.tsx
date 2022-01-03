import React, {useState} from "react";
import { Container, Button, Row, Modal, } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { errorCategory, selectCategoryById } from "./categoriesSlice";


interface CategoryProps {
   
}

function CategoryPage(props:{}) {
    const params = useParams();
    const [show, setShow] = useState<boolean>(false);

    const id = Number(params.categoryId);

    let category = useAppSelector((state) => selectCategoryById(state, id));
    category = category ? category : errorCategory();
 
    return (
        <Container>
            <div className="d-flex align-items-center">
                <h1>Category: {category.name}</h1>
                <Button variant="primary mx-3" onClick={() => setShow(true)}> Rename </Button>
                <Button variant="danger"> Delete </Button>

                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title> Rename category </Modal.Title>
                        
                    </Modal.Header>

                    <Modal.Body> Body text</Modal.Body>
                </Modal>
            </div>
        </Container>
    )
}

export default CategoryPage;