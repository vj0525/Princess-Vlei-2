
import React from 'react';
import ReactDOM from 'react-dom/client';
import './FancyButton.css';
export default function Button( {title, buttonFunc=null} ){
    return (
        <div className="fancy-button" onClick={buttonFunc}>
            <p>{title}</p>
        </div>
    )
}