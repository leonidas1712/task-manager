import React from 'react';
import { Button } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';

// props: category id to automatically set
type AddTaskButtonProps = {
    categoryId: number
}
function AddTaskButton({ categoryId }: AddTaskButtonProps) {
    return (
        <>
        {/* Don't need to make common with Add Category since some settings are diff */}
        <Button 
            variant="secondary" 
            className="mx-0 mt-2 mb-3 d-flex justify-content-center align-items-center"
        >
            <PlusLg size={20} style={{marginRight: "0.5rem"}}/>
            <span style={{fontSize: "1.1rem"}}>Add Task </span>
        </Button>
        </>
    );
}

export default AddTaskButton;