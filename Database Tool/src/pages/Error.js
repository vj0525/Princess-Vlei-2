import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function ErrorPage(){
    return (
        <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>Sorry, something went wrong.<br />Please try again shortly.</h2>
            <FancyButton title="Return to Start" buttonFunc={()=>console.log("Hello World")} specialty={true} />
            <FancyButton title="Log Out" buttonFunc={()=>console.log("Hello World")} specialty={true} />
        </div>
    )
}