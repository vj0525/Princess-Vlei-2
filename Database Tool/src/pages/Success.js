import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function SuccessPage(){
    const navigate = useNavigate();

    const navToLogIn = () => {
        navigate('/Login');
    }
    const navToIntro = () => {
        navigate('/Intro');
    }
    const navToSurvey = () =>{
        navigate('/SurveyOne');
    }

    return (
        <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>Your data has been successfully submitted!</h2>
            <FancyButton title="Enter Another" buttonFunc={()=>navToSurvey()} specialty={true} />
            <FancyButton title="Return to Start" buttonFunc={()=>navToIntro()} specialty={true} />
            <FancyButton title="Log Out" buttonFunc={()=>navToLogIn()} specialty={true} />
        </div>
    )
}