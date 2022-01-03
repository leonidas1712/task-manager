import { findAllByDisplayValue } from '@testing-library/react';
import React, { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons'
import { useFormik } from 'formik';

//import * as Yup from 'yup';
import useYup from './Validation';

import { addCategory } from '../../api/APIService';
import { addNewCategory, selectAllCategories } from './categoriesSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { isNewCategory } from './Validation';




//const { addCategory } = APIService;

function AddCategory() {
    const [show, setShow] = useState<boolean>(false);
    // modal backdrop=true keyboard=true, closeButton=true, other closable btns disabled = false when modal is closable
    // not closable: invert above properties, backdrop="static"
    const [canClose, setCanClose] = useState<boolean>(true);
    
    const categories = useAppSelector(selectAllCategories);
    const dispatch = useAppDispatch();

    const handleShow = () => setShow(true);

    const disableClose = () => {
        setCanClose(false);

        setTimeout(() => setCanClose(true), 2000);
    }

    //TODO: move the validation functions into a new file so can be re-used for rename category
    // TODO: find a way to re-use modal logic
    
    // working
    // const validation = Yup.object({
    //     name: Yup.string().required("Category name can't be blank")
    //         .test('is valid category', 'Category must have a name that does not exist ', (val) => {
    //             //return val !== "Error";
    //             if (val === undefined) {
    //                 return false;
    //             }

    //             return isNewCategory(val, categories);
    //         })
    // });
    const yup:any = useYup();
    const validation = yup.object({
        name: yup.string().required("Category name can't be blank").isValidCategory()
    });

    // I can have a submit button outside the form by setting button form prop to id, and form id to id
    // This does not work on IE11: https://stackoverflow.com/questions/49525057/react-formik-use-submitform-outside-formik
    const id = "add-category-form";

    // useFormik instead of Formik component so I can access resetForm in handleClose
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: async (values, {resetForm}) => {
            console.log(JSON.stringify(values));
            setCanClose(false);
            await dispatch(addNewCategory(values.name));
            setCanClose(true);
            resetForm();
            handleClose();
        },
        validationSchema: validation
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, resetForm } = formik;

    const handleClose = () => { resetForm(); setShow(false); };
    

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
                <Form id={id} noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group>
                            <Form.Label>Name: </Form.Label>
                            <Form.Control
                                type="text"
                                isValid={touched.name && !errors.name}
                                isInvalid={!!errors.name}
                                // this passes in: value, name, onChange, onBlur
                                {...formik.getFieldProps("name")}
                            />
                            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={!canClose} form={id}> Add category </Button>
                {/* <Button variant="danger" onClick={disableClose}>Disable close</Button> */}
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default AddCategory;