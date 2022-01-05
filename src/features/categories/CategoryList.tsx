import React, {useState, useEffect} from "react";
import { ListGroup, Nav, Navbar, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { Category } from "../../Types";
import { Loading, selectCategoryStatus } from "./categoriesSlice";

type SetActive = React.Dispatch<React.SetStateAction<string>>;

interface CategoryNavProps {
    name: string; 
    route: string;
    setActive:SetActive
}

function CategoryNav(props: CategoryNavProps) {
    return (
        <div className="d-inline-flex align-items-center justify-content-between">
            <Nav.Item onClick={() => props.setActive(props.route)} style={{width:"100%"}} > 
                <Nav.Link eventKey={props.route} className="text-white">
                    {props.name}
                </Nav.Link>
                
            </Nav.Item>  

        </div>
    )
}


function Upcoming(props: {setActive:SetActive}) {
    const name = "Upcoming";
    const route = "upcoming";
    return <CategoryNav name="Upcoming" route="upcoming" setActive={props.setActive}/>;
}

// TODO: move to common
function StandardSpin() {
    return (
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>)
}

interface CategoryListProps {
    categories: Category[];
    setActive:SetActive;
}

function CategoryList(props: CategoryListProps) {
   const { categories, setActive } = props; 
   const categoryStatus = useAppSelector(selectCategoryStatus);

   const categoryToNav = ({ name, id }:Category) => {
       return <CategoryNav name={name} route={id+""} setActive={setActive} key={id}/>
   };

   const categoryList = () => {
       const fulfilledCase = () => {
           return categories.length == 0 ? <p className="text-muted text-start mx-3">No categories</p> :
               categories.map(categoryToNav);  
       }

       // pending: show spinner. fulfilled: either no categories or display as normal. error: error msg
        switch(categoryStatus) {
            case Loading.PENDING:
                return <StandardSpin/>;
            case Loading.FULFILLED:
            case Loading.IDLE: 
                return fulfilledCase();
            case Loading.REJECTED:
                return <p className="text-danger mx-3"> Error loading categories</p>                 
        }
    }

    return (
        <>
            <Upcoming setActive={setActive}/>
            <hr className="mt-0"></hr>
            {categoryList()}
        </>
       ); 
   }


export default CategoryList;