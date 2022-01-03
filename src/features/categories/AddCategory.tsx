import React from 'react';
import { Button } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons'
function AddCategory() {
    return (
        <Button variant="secondary" className="mx-2 mt-4 d-flex justify-content-center align-items-center">
            <PlusLg size={20} style={{marginRight: "0.5rem"}}/>
            <span className="lead">Add Category</span>
        </Button>
    )
}

export default AddCategory;