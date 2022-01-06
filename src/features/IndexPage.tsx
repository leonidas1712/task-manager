import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectCategoryCount, selectCategoryStatus, Loading} from './categories/categoriesSlice';
import { Link, useNavigate } from 'react-router-dom';


function WelcomeMsg(props: { msg: string }) {
    return (
        <span> Welcome! {props.msg} </span>
    )
}

// default page to show when accessing index route from App
function IndexPage() {
    const categoryCount = useAppSelector(selectCategoryCount);
    const status = useAppSelector(selectCategoryStatus);
    const navigate = useNavigate();


    // categories length 0:
        // status pending: loading...
        // status fulfilled: Welcome! Please add a category to get started
    // non-0: Welcome! Please select a category
    const displayWelcome = () => {
        let msg = "";
        if (categoryCount == 0) {
            switch(status) {
                case Loading.IDLE:
                case Loading.FULFILLED:
                    msg = "Add a category to get started"
                    break;
                case Loading.PENDING:
                    return "Loading categories..."
                case Loading.REJECTED:
                    return <span className="text-danger">Error loading categories</span>
            }

            return <WelcomeMsg msg={msg} />
        }

        return <WelcomeMsg msg="Please select a category" />
    };

    return (
        <div>
            <p className="lead display-6">{displayWelcome()}</p>
            <hr></hr>
            {/* <Link to="/categories/upcoming">Upcoming</Link> */}
            <p onClick={() => navigate("/categories/")}>Upcoming</p>
        </div>
    )
}

export default IndexPage;