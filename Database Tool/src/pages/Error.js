import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function ErrorPage(){
    const navigate = useNavigate();

    const navToLogIn = () => {
        navigate('/Login');
    }
    const navToIntro = () => {
        navigate('/Intro');
    }

    return (
        <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>Sorry, something went wrong.<br />Please try again shortly.</h2>
            <FancyButton title="Return to Start" buttonFunc={()=>navToIntro()} specialty={true} />
            <FancyButton title="Log Out" buttonFunc={()=>navToLogIn()} specialty={true} />
        </div>
    )
}