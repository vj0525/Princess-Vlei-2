import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function PlantPage(){
    return (
        <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>Enter the species information for the plant</h2>
            <Input value="Genus" />
            <Input value="Species" />
            <Input value="Common Name" />
            <Input value="Alien Species?" category="checkbox"/>
            <Input value="Invasive?" category="checkbox"/>
            <FancyButton title="Submit" buttonFunc={()=>console.log("Hello World")} specialty={true} />
            <FancyButton title="Back" buttonFunc={()=>console.log("Hello World")} specialty={true} />
        </div>
    )
}