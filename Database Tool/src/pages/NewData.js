import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function newDataPage(){

    // const navigate = useNavigate();

    // const navToOrg = () => {
    //     navigate('/organism');
    // }

    // const navToSury = () => {
    //     navigate('/surveyone');
    // }

    // const navToOut = () => {
    //     navigate('/outreach');
    // }
    
    return (
        <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>What type of data would you like to input?</h2>
            {/* <FancyButton title="Organism" buttonFunc={navToOrg}/>
            <FancyButton title="Survey" buttonFunc={navToSury} />
            <FancyButton title="Education/Outreach" buttonFunc={navToOut} /> */}
            <FancyButton title="Back" buttonFunc={()=>console.log("Hello World")} specialty={true} />
        </div>
    )
    }