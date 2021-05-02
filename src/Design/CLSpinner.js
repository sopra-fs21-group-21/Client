import React from "react";
import "./ColoredLoadingSpinner.css";



const CLSpinner = () => {
    return(
        <div className="lds-ring2" >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    );
};

export default CLSpinner;