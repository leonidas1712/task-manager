import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCategoryById } from '../categories/categoriesSlice';

function CategoryName({ id }: { id:number }) {
    const category = useAppSelector(state => selectCategoryById(state, id));

    const msg = category ? category.name : "Unknown";
    
    return (
        <p className="d-inline text-end mx-3">Category: {msg}</p>
    );
}

export default CategoryName;