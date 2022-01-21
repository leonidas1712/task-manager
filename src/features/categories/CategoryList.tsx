import React, {useState, useEffect} from "react";
import { ListGroup, Nav, Navbar, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { Loading } from "../../Constants";
import { Category } from "../../Types";
import { ALL_TASKS_PATH, UPCOMING_PATH, usePageId } from "../../urlHelper";
import { StandardSpin } from "../common/Spinners";
import AllTasks from "../tasks/AllTasks";
import { selectCategoryStatus } from "./categoriesSlice";




// CategoryList for use in navigation in sidebar only 
type SetActive = React.Dispatch<React.SetStateAction<string>>;

interface CategoryNavProps {
    name: string; 
    route: string;
    //setActive:SetActive
}

function CategoryNav(props: CategoryNavProps) {
    const pageId = usePageId();

    const isActive = () => {
        return pageId == props.route;
    };

    return (
        <div className="d-inline-flex align-items-center justify-content-between">
            {/* onClick={() => props.setActive(props.route)} */}
            <Nav.Item style={{width:"100%"}} > 
                <Nav.Link active= {isActive()} eventKey={props.route} className="text-white">
                    {props.name}
                </Nav.Link>
                
            </Nav.Item>  

        </div>
    )
}


function UpcomingNav() {
    return <CategoryNav name="Upcoming" route={UPCOMING_PATH}/>;
}

function AllTasksNav() {
    return <CategoryNav name="All tasks" route={ALL_TASKS_PATH} />;
}

interface CategoryListProps {
    categories: Category[];
    //setActive:SetActive;
}



function CategoryList(props: CategoryListProps) {
   const { categories } = props; 
   const categoryStatus = useAppSelector(selectCategoryStatus);

   const categoryToNav = ({ name, id }:Category) => {
       return <CategoryNav name={name} route={id+""} key={id}/>
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
            <AllTasksNav />
            <UpcomingNav />
            <hr className="mt-0"></hr>
            {categoryList()}
        </>
       ); 
   }


export default CategoryList;