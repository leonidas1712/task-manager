import React from "react";
import { useParams } from "react-router-dom";

interface CategoryProps {
   
}

function Category(props:{}) {
    const params = useParams();
    return (
        <h1>{params.categoryId}</h1>
    )
}

export default Category;