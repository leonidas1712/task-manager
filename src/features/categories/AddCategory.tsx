import { findAllByDisplayValue } from '@testing-library/react';
import React, { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons'
//import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Formik } from 'formik';
import * as Yup from 'yup';

function AddCategory() {
    const [show, setShow] = useState<boolean>(false);
    // modal backdrop=true keyboard=true, closeButton=true, other closable btns disabled = false when modal is closable
    // not closable: invert above properties, backdrop="static"
    const [canClose, setCanClose] = useState<boolean>(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const disableClose = () => {
        setCanClose(false);

        setTimeout(() => setCanClose(true), 2000);
    }

    const validation = Yup.object({
        name: Yup.string().required("Category name can't be blank")
    });

    return (
        <>
        <Button variant="secondary" className="mx-2 mt-4 d-flex justify-content-center align-items-center"
        onClick={handleShow}>
            <PlusLg size={20} style={{marginRight: "0.5rem"}}/>
            <span className="lead">Add Category</span>
        </Button>

        <Modal show={show} onHide={handleClose} backdrop={canClose || 'static'} keyboard={canClose}>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>

            <Modal.Body> 
                <Formik 
                    initialValues={{
                        name: ''
                    }}
                    validationSchema={validation}
                    onSubmit={(values) => console.log("Add cat ", values)}
                >
                    {/* <Form>
                        <label htmlFor="name">Category name: </label>
                        <Field name="name" type="text"></Field>
                        <ErrorMessage name="name" />
                    </Form> */}

                    {
                        ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors}) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>Name: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={!!errors.name}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Control.Feedback>Looks good</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">Category name can't be blank</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </Form>
                        )
                    }
                </Formik>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Cancel</Button>
                <Button variant="primary" onClick={handleClose} disabled={!canClose}> Add category </Button>
                <Button variant="danger" onClick={disableClose}>Disable close</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default AddCategory;