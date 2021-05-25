import React from "react";
import './PointsLoadingSpinner.css'


const PointsLoadingSpinner = () => {
    return(
        <div className="lds-ellipsis" >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default PointsLoadingSpinner;