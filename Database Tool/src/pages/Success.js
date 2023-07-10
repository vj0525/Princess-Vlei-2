import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function SuccessPage(){
    return (
        <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>Your data has been successfully submitted!</h2>
            <FancyButton title="Enter Another" buttonFunc={()=>console.log("Submitted!")} specialty={true} />
            <FancyButton title="Return to Start" buttonFunc={()=>console.log("Hello World")} specialty={true} />
            <FancyButton title="Log Out" buttonFunc={()=>console.log("Hello World")} specialty={true} />
        </div>
    )
}