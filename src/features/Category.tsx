import React from "react";

interface CategoryProps {
    name: string
}

function Category(props:CategoryProps) {
    return (
        <h1>{props.name}</h1>
    )
}

export default Category;