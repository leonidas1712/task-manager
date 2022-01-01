import React from "react";
import { sidebarWidth } from "../../Constants";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar" style={{width: sidebarWidth}}> 
            <div>List1</div>
            <div>List2</div>
        </div>
    )
}

export default Sidebar;