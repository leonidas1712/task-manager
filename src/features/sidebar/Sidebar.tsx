import React from "react";
import { ListGroup, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import { sidebarWidth } from "../../Constants";
import "./Sidebar.css";

function CategoryNav(props: {name: string; route: string}) {
    return (
        <Nav.Item> 
            <Nav.Link eventKey={props.route} className="text-white">
                {/* <Link to={props.name}>{props.name}</Link> */}
                {props.name}
            </Nav.Link>
        </Nav.Item>
    )
}

function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="sidebar" style={{width: sidebarWidth}}> 
                <Nav 
                 variant="pills" 
                 defaultActiveKey="cat1" 
                 className="flex-column" 
                 onSelect={(key)=> { if (key != null) {console.log(key); navigate(key)} }}
                 >

                    <CategoryNav name="Cat 1" route="cat1"/>

                    <Nav.Item>
                        <Nav.Link eventKey="cat2" className="text-white">Cat 2</Nav.Link>
                    </Nav.Item>

                    {/* <Nav.Item> <Link to="cat1">Hello</Link></Nav.Item> */}
                </Nav>
        </div>
    )
}

export default Sidebar;