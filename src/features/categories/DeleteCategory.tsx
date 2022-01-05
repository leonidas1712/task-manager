import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { Category } from '../../Types';

type DeleteCategoryProps = {
    category: Category
}

function DeleteCategory({ category }: DeleteCategoryProps) {
    const [show, setShow] = useState<boolean>(false);
    const [canClose, setCanClose] = useState<boolean>(true);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleDelete = () => {

        handleClose();
    }

    return (
        <>
        <Button variant="danger" onClick={handleShow}> Delete </Button>

        <Modal show={show} onHide={handleClose} backdrop={canClose || 'static'} keyboard={canClose}>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>Delete category: {category.name} </Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-danger"> 
                <span className="lead">Are you sure? This will delete all tasks in <b>{category.name}</b> </span>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Cancel</Button>
                <Button variant="danger" type="submit" disabled={!canClose}> Delete category </Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}

export default DeleteCategory;