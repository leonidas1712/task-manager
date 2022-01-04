import React, { useState } from 'react';
import { Button, Modal, Form, Row, FloatingLabel } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import { useAppDispatch } from '../../app/hooks';
import * as yup from 'yup';
import { useFormik } from 'formik';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { format } from 'date-fns';

const DATE_PICKER_FORMAT = "yyyy-MM-dd";


// props: category id to automatically set
type AddTaskButtonProps = {
    categoryId: number
}
function AddTaskButton({ categoryId }: AddTaskButtonProps) {
    const [show, setShow] = useState<boolean>(false);
    const [canClose, setCanClose] = useState<boolean>(true);
    const id = "add-task-button"
    
    
    const dispatch = useAppDispatch();

    const handleShow = () => setShow(true);

    const validation = yup.object({
        title: yup.string().required("Title can't be blank"),
        description: yup.string().max(100, "Description should be shorter than 100 characters"),
        date: yup.date().min(new Date(), "Can't use a date before today"),
        text: yup.string()
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            date: '',
            text: ''
        },
        onSubmit: async (values, {resetForm}) => {
            console.log("Add task form");
            console.log(values);
        },
        validationSchema: validation
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, resetForm, setFieldValue } = formik;

    const handleClose = () => { resetForm(); setShow(false); };


    return (
        <div>
        <Button 
            variant="secondary" 
            className="mx-0 mt-2 mb-3 d-flex justify-content-center align-items-center"
            onClick ={() => handleShow()}
        >
            <PlusLg size={20} style={{marginRight: "0.5rem"}}/>
            <span style={{fontSize: "1.1rem"}}>Add Task </span>
        </Button>

        <Modal show={show} onHide={handleClose} backdrop={canClose || 'static'} keyboard={canClose}>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>

            <Modal.Body> 
                <Form id={id} noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                                type="text"
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                // this passes in: value, name, onChange, onBlur
                                {...formik.getFieldProps("title")}
                            />
                            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Description: </Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="This is optional"
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}
                                {...formik.getFieldProps("description")}
                            />
                            
                            <Form.Control.Feedback></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Date(optional):</Form.Label>
                            <Form.Control type="date" {...formik.getFieldProps("date")} 
                                isValid={touched.date && !errors.date }
                                isInvalid={!!errors.date}
                            />
                            <Form.Control.Feedback></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                        </Form.Group>
                        {/* <Form.Group> */}
                            {/* <Form.Label>Description: </Form.Label> */}
                            {/* <Form.Control
                                as={<DatePicker label="Test" renderInput={(params) => <TextField {...params} />} {...formik.getFieldProps("date")}/>}
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}
                                {...formik.getFieldProps("description")}
                            > */}

                            {/* DatePicker!! */}
                            {/* DatePicker from MUI has weird behavior. onChange doesn't take event, no name attr, etc. */}
                            {/* <DatePicker label="Pick due date" renderInput={(params) => <TextField {...params} />} 
                                value= { values.date }
                                onChange= {(val) =>  setFieldValue("date", val)}
                                minDate = {new Date()}
                                clearable
                            /> */}
                            
                            {/* </Form.Control> */}
                            {/* <Form.Control.Feedback></Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback> */}
                        {/* </Form.Group> */}
                    </Row>

                    <Row>
                        <Form.Group>
                            <Form.Label> Test </Form.Label>
                            <Form.Control
                                type="text"
                                value={values.text}
                                name="text"
                                onChange={handleChange}
                            >

                                
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={!canClose} form={id}> Add task </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

export default AddTaskButton;