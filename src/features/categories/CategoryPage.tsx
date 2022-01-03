import React, {useState} from "react";
import { Container, Button, Row, Modal, } from "react-bootstrap";
import { useParams } from "react-router-dom";
interface CategoryProps {
   
}

function CategoryPage(props:{}) {
    const params = useParams();
    const [show, setShow] = useState<boolean>(false);

    return (
        <Container>
            <div className="d-flex align-items-center">
                <h1>Category: {params.categoryId}</h1>
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