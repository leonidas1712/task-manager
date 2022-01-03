import React, {useState, useEffect} from "react";
import { ListGroup, Nav, Navbar, Spinner } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { sidebarWidth } from "../../Constants";
import { selectAllCategories } from "../categories/categoriesSlice";
import "./Sidebar.css";




interface CategoryData {
    name:string;
    route:string;
}

function getCategoryData(): CategoryData[] {
    return [
        {
            name: "Inbox",
            route:"1"
        },

        {
            name: "Cat1",
            route:"2"
        },

        {
            name: "Cat2",
            route:"3"
        }
    ]
}

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

function datumToCategoryNav(datum: CategoryData, setActive:React.Dispatch<React.SetStateAction<string>>) {
    return <CategoryNav key={datum.route} name={datum.name} route={datum.route} setActive={setActive}/>
}

function Sidebar() {
    const navigate = useNavigate();
    const [active, setActive] = useState<string>("");
    const [data, setData] = useState<CategoryData[]>([]);

    const allCategories = useAppSelector(selectAllCategories);

    const Spin = <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>;
    
    // every refresh it navigates to the active URL
    // TODO: change navigation logic to be through updating active category ID in redux store
    useEffect(() => {
        const data = getCategoryData();
        setData(data);
        navigate("categories/" + active);


    }, [active])

    // const onSelect = (key: string | null) => {
    //     if (key == null) {
    //         console.log("Key was null");
    //     } else {
    //         console.log(key);
    //         navigate("categories/" + key);
    //         //setActive(key);
    //     }
    // };

    return (
        <div className="sidebar" style={{width: sidebarWidth}}> 
                <Nav 
                 variant="pills" 
                //  defaultActiveKey="inbox" 
                 className="flex-column px-2" 
                 >
                     <h3 className="text-center mt-2">Task Manager</h3>
                     <div className="mt-3"></div>

                    {data.length === 0 ? "Loading" : datumToCategoryNav(data[0], setActive)}

                    <hr className="mt-0"></hr>

                    {data.slice(1).map((datum) => datumToCategoryNav(datum, setActive)) }
                </Nav>

                {allCategories.length == 0 ? Spin : allCategories.toString()}
        </div>
    )
}

export default Sidebar;