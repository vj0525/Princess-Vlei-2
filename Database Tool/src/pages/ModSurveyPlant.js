import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import { useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function SurveyPlantPage(){

    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/Success-modify');
    }
    const navToError = () => {
        navigate('/Error')
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