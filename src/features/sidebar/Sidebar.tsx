import React, {useState, useEffect} from "react";
import {  Nav } from "react-bootstrap";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { sidebarWidth } from "../../Constants";
import { selectAllCategories } from "../categories/categoriesSlice";
import "./Sidebar.css";
import { Category } from '../../Types';
import CategoryList from "../categories/CategoryList";
import AddCategory from "../categories/AddCategory";
import Spacer from "../../Spacer";
import { usePageId } from "../../urlHelper";




function CategoryNav(props: {name: string; route: string, setActive:React.Dispatch<React.SetStateAction<string>> }) {
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

function datumToCategoryNav(datum: Category, setActive:React.Dispatch<React.SetStateAction<string>>) {
    return <CategoryNav key={datum.id} name={datum.name} route={datum.id+""} setActive={setActive}/>
}

// TODO: make sidebar responsive for smaller screen widths,

function Sidebar() {
    const navigate = useNavigate();
    const [active, setActive] = useState<string>("");
    const pageId = usePageId();

    // const location = useLocation();
    // console.log("Location:", location);
    // console.log("Page id:", pageId);
    const allCategories = useAppSelector(selectAllCategories);

    // every refresh it navigates to the active URL
    // TODO: change navigation logic to be through updating active category ID in redux store
    // useEffect(() => {
    //     navigate("categories/113");

    // }, [])

    return (
        <div className="sidebar pt-2" style={{width: sidebarWidth}}> 
            
            <Nav 
                variant="pills" 
                // defaultActiveKey="upcoming"
                onSelect={(key) => { console.log(key);navigate("categories/" + key)}}
                className="flex-column px-2" 
                >
                    <h3 className="text-center mt-2">Task Manager</h3>
                    <div className="mt-3"></div>    
                {/* <AddCategory /> */}
                <CategoryList categories={allCategories} />
                

            </Nav>
            <AddCategory />
            <Spacer />
        </div>
    )
}

export default Sidebar;