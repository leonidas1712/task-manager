import React from "react";
import {  Nav } from "react-bootstrap";
import CategoryList from "./CategoryList";
import { useNavigateHelper } from "../../urlHelper";
import { useAppSelector } from "../../app/hooks";
import { selectAllCategories } from "./categoriesSlice";
import AddCategory from "./AddCategory";
import Spacer from "../../Spacer";

export default function CategoryNavigation() {
    const navigate = useNavigateHelper();
    const allCategories = useAppSelector(selectAllCategories);
    return (
        <>
            <Nav 
                variant="pills" 
                onSelect={(key) => { navigate(key)} }
                className="flex-column px-2" 
                >
                    <h3 className="text-center mt-2">Task Manager</h3>
                    <div className="mt-3"></div>    
                    
                <CategoryList categories={allCategories} />
            </Nav>

            <AddCategory />
            <Spacer />
        </>
    )
}

