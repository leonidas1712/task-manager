import { findAllByDisplayValue } from '@testing-library/react';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons'

function AddCategory() {
    const [show, setShow] = useState<boolean>(false);
    // modal backdrop=true keyboard=true, closeButton=true, other btns disabled = false when modal is closable
    // not closable: invert above properties, backdrop="static"
    const [canClose, setCanClose] = useState<boolean>(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const disableClose = () => {
        setCanClose(false);

        setTimeout(() => setCanClose(true), 2000);
    }

    return (
        <>
        <Button variant="secondary" className="mx-2 mt-4 d-flex justify-content-center align-items-center"
        onClick={handleShow}>
            <PlusLg size={20} style={{marginRight: "0.5rem"}}/>
            <span className="lead">Add Category</span>
        </Button>

        <Modal show={show} onHide={handleClose} backdrop={canClose ? canClose : "static"} keyboard={canClose}>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>

            <Modal.Body> Modal Body</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Close</Button>
                <Button variant="primary" onClick={handleClose} disabled={!canClose}> Save Changes</Button>
                <Button variant="danger" onClick={disableClose}>Disable close</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default AddCategory;