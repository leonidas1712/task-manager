import React from 'react';
import { Form, Row } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { selectAllCategories } from '../categories/categoriesSlice';


function CategorySelect(props: { formik:any }) {
    const { formik } = props;
    const { touched } = formik;

    const categories = useAppSelector(selectAllCategories);
    const options = () => {
        return categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>);
        
    };

    return (
        <Row className="mb-3">
            <Form.Group>
                <Form.Label>Category:</Form.Label>
                    <Form.Select
                        // isValid={touched.time && !errors.time}
                        // isInvalid={!!errors.time}
                        {...formik.getFieldProps("categoryId")}
                        // {...props}
                        isValid= {touched.categoryId}
                    >   
                    
                    { options() }

                    </Form.Select>
                <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
        </Row>
    );
}

export default CategorySelect;