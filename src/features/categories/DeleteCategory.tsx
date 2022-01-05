import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { useAppDispatch } from '../../app/hooks';
import { Category } from '../../Types';
import { deleteCategory } from './categoriesSlice';


type DeleteCategoryProps = {
    category: Category
}

function DeleteCategory({ category }: DeleteCategoryProps) {
    const [show, setShow] = useState<boolean>(false);
    const [canClose, setCanClose] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleDelete = async () => {
        setCanClose(false);
        await dispatch(deleteCategory({ categoryId: category.id }))
        setCanClose(true);
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
                <Button variant="danger" type="submit" disabled={!canClose} onClick={handleDelete}> Delete category </Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}

export default DeleteCategory;