import React from "react";
import { Redirect } from "react-router-dom";


/** a guard to allow user to view profiles using /profile/id iff user is logged in**/
export const PortfolioIdGuard = props => {
    /**user is logged in**/
    if (localStorage.getItem("user")) {
        return props.children;
    }
    else
    {
        alert(`Cant redirect, please log in first`);

        return <Redirect to={"/login"} />;}
};