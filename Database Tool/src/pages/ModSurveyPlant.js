import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import { useState } from 'react';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function SurveyPlantPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/Success-modify', {state:{token_value:location.state.token_value}});
    }
    const navToError = () => {
        navigate('/Error', {state:{token_value:location.state.token_value}})
    }

    function back() {
        window.history.back();
    }

    return (
        <div className="main-div">
            <TopBar />
            <TopBar />
            <h3>Type in an plant survey's name to pull up that data point.<br />
            You can also type in part of a name to see multiple entries that match.<br />
            If you'd like to see all entries, just hit enter with nothing in the search box</h3>
            {/* <div className="centerer">
                <input className="formItems" id="modSearchBox" type="text" onChange={(key)=>setSearch(key.target.value)} placeholder="Search here for a specific organism"/>
                <button id="modSearchButton" onClick={()=>putUpDivs(searchFilter,search)}>Enter</button>
            </div>
            <div id="forIDPurposes">
                <div id="data-container">
                </div>
            </div>
            <div>
            <FancyButton title="Back" buttonFunc={()=>back()} specialty={true} />
            </div>
            <p id="loadText" className="load"></p> */}
        </div>
    )
}