import React, { useState, useEffect } from 'react';
import { Button, Row, Modal, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTaskById, errorTask } from './tasksSlice';
import { TaskValidationProps, validateTaskFields } from './Validation'
import { convertTaskFormToPostObject, convertTaskValuesForEdit } from './ConvertTaskPayload';
import { useFormik } from 'formik';
import { dateISOToDateStr, dateISOToTimeStr } from './taskValidationCommon';
import { editTask } from '../tasks/tasksSlice';
import { Task } from '../../Types';

type EditTaskProps = {
    disabled: boolean;
    // taskId: number
    task: Task
}
// use a selector to get task by id instead of relying on task from two levels down (might be stale)
function EditTaskButton(props: EditTaskProps) {
    useEffect(() => {
        console.log("---Edit task button render start-----");
        console.log(props.task);
        console.log("Edit Task button render end\n--------------")
    
    });


    const { disabled } = props;
    //let optionalTask = useAppSelector(state => selectTaskById(state, taskId), () => true);
    // const task = optionalTask || errorTask();
    const { task } = props;

    const dispatch = useAppDispatch();

    const [show, setShow] = useState<boolean>(false);
    const [canClose, setCanClose] = useState<boolean>(true);
    const id = "edit-task-form";
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            // task.name would never be blank
            title: task.name,
            // text area description should not be null. if desc is false already it will go to ''
            description: task.description || '',
            // if due date not present use empty fields
            date: task.due_date ? dateISOToDateStr(task.due_date) : '',
            time: task.due_date ? dateISOToTimeStr(task.due_date) : ''
        },
        
        onSubmit: async (values:TaskValidationProps, {resetForm}) => {
            setCanClose(false);
            const editTaskArg = convertTaskValuesForEdit(task, values);
            await dispatch(editTask(editTaskArg));
            //await editTask(params, postObj);
            console.log("Edit done");
            //const taskPostArg:TaskPostArg = {category_id: categoryId, ...postObj};
            //await dispatch(addTask(taskPostArg));
            setCanClose(true);
            handleClose();
       
        },
        validate: validateTaskFields,
        // enableReininit is necc. because by default formik does not re-render when init values change which caused
        // issue where after editing task, opening again would use only the old values from the first render of the 
        // edit modal. 
        // https://stackoverflow.com/questions/60241872/how-to-re-render-formik-values-after-updated-it-react-native
        enableReinitialize:true
    });
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, resetForm, setFieldValue } = formik;

    const handleClose = () => { resetForm(); setShow(false); };

    const [title, setTitle] = useState<string>(task.name);

    return (
        <>
        <Button variant="success" disabled={disabled} onClick={handleShow}>Edit</Button>

        <Modal show={show} onHide={handleClose} backdrop={canClose || 'static'} keyboard={canClose}>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>Edit Task</Modal.Title>
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
                            <Form.Label>Date<span className="text-muted">(optional):</span></Form.Label>
                            <Form.Control type="date" {...formik.getFieldProps("date")} 
                                isValid={touched.date && !errors.date }
                                isInvalid={!!errors.date}
                            />
                            <Form.Control.Feedback>Note: incomplete dates are ignored</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Firefox has no dropdown for picking the time  */}
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Time<span className="text-muted">(e.g 08:10am)</span> </Form.Label>
                            <Form.Control type="time"
                                isValid={touched.time && !errors.time}
                                isInvalid={!!errors.time}
                                {...formik.getFieldProps("time")}
                            />
                            <Form.Control.Feedback>Note: incomplete times are ignored</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={!canClose}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={!canClose} form={id}> Edit task </Button>
            </Modal.Footer>
            {/* <pre>{JSON.stringify(values)}</pre> */}
        </Modal>
        </>
    )
}

export default EditTaskButton;