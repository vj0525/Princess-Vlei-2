import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';


export default function ModSurveyOnePage(){

    const navigate = useNavigate();

    const navToPlant = () => {
        navigate('/surveyplant-modify');
    }

    const navToAni = () => {
        navigate('/surveyanimal-modify');
    }
    
    const navToNew = () => {
        navigate('/modify');
    }
    
    return (
        <div className="main-div">
            <TopBar />
            <h2>What type of organism do you want to see survey data on?</h2>
            <FancyButton title="Plant" buttonFunc={()=>navToPlant()}/>
            <FancyButton title="Animal" buttonFunc={()=>navToAni()} />
            <div>
            <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
            </div>
        </div>
    )
}