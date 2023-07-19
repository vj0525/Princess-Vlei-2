import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';


export default function SurveyOnePage(){

    const navigate = useNavigate();

    const navToPlant = () => {
        navigate('/surveyplant');
    }

    const navToAni = () => {
        navigate('/surveyanimal');
    }
    
    const navToNew = () => {
        navigate('/NewData');
    }
    
    return (
        <div className="main-div">
            <TopBar />
            <h2>What type of organism do you have survey data on?</h2>
            <FancyButton title="Plant" buttonFunc={()=>navToPlant()}/>
            <FancyButton title="Animal" buttonFunc={()=>navToAni()} />
            <div>
            <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
            </div>
        </div>
    )
}