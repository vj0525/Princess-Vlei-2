
import React from 'react';
import './FancyButton.css';
export default function Button( {title, buttonFunc=null, specialty=false} ){
    let buttonClass = specialty ? "special" : "fancy-button";
    return (
        <div className={buttonClass} onClick={buttonFunc}>
            <p className="textP">{title}</p>
        </div>
    )
}