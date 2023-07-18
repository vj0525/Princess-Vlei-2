import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function SuccessPage(){
    const navigate = useNavigate();

    const navToLogIn = () => {
        navigate('/');
    }
    const navToIntro = () => {
        navigate('/Intro');
    }
    const navToSurvey = () =>{
        navigate('/SurveyOne');
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Your data has been successfully submitted!</h2>
            <div>
                <FancyButton title="Enter Another" buttonFunc={()=>navToSurvey()} specialty={true} />
                <FancyButton title="Return to Start" buttonFunc={()=>navToIntro()} specialty={true} />
                <FancyButton title="Log Out" buttonFunc={()=>navToLogIn()} specialty={true} />
            </div>
        </div>
    )
}