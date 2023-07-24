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
            <h2>Which Plant Are You Modifying?</h2>

            <div>
            <FancyButton title="Back" buttonFunc={()=>back()} specialty={true} />
            </div>
        </div>
    )
}