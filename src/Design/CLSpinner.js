import React from "react";
import "./ColoredLoadingSpinner.css";



const LoadingSpinner = () => {
    return(
        <div className="lds-ring" style={{marginLeft:'30vh'}}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    );
};

export default LoadingSpinner;