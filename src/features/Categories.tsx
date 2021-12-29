import React, { useEffect, useState } from 'react';

type Category = {
    id: number;
    name:string
}

const url = "http://localhost:3000/categories/";

function Category(props: {category:Category}) {
    return (
        <li> {props.category.name} </li>
    )
}
function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(json => setCategories(json));
    }, []);

    return (
        <ul>
           { categories.map(cat => <Category key={cat.id} category={cat}/>) }
        </ul>
    );
}

export default Categories;
