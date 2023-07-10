import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function OutreachPage(){
    return (
        <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>Enter the location information from the survey data</h2>
            <Input value="Name of Community" />
            <Input value="Number of People" />
            <Input value="Date" />
            <Input value="Money Invested" />
            <FancyButton title="Submit" buttonFunc={()=>console.log("Hello World")} specialty={true} />
            <FancyButton title="Back" buttonFunc={()=>console.log("Hello World")} specialty={true} />
        </div>
    )
}