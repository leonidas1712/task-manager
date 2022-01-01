import React from "react";
import { ListGroup, Nav, Navbar } from "react-bootstrap";
import { sidebarWidth } from "../../Constants";
import "./Sidebar.css";


function Sidebar() {
    return (
        <div className="sidebar" style={{width: sidebarWidth}}> 
                <Nav variant="pills" defaultActiveKey="cat1" className="flex-column" onSelect={(key)=> console.log(key)}>
                    <Nav.Item> 
                        <Nav.Link eventKey="cat1" className="text-white">Cat 1</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey="cat2" className="text-white">Cat 2</Nav.Link>
                    </Nav.Item>
                </Nav>
        </div>
    )
}

export default Sidebar;