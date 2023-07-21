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

    function back() {
        window.history.back();
    }
    
    return (
        <div className="main-div">
            <TopBar />
            <h2>What Survey do you Want to Modify?</h2>

            <div>
            <FancyButton title="Back" buttonFunc={()=>back()} specialty={true} />
            </div>
        </div>
    )
}