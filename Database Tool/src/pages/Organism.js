import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';


export default function OrganismPage(){

    const navigate = useNavigate();

    const navToPlant = () => {
        navigate('/plant');
    }

    const navToAni = () => {
        navigate('/animal');
    }
    
    const navToNew = () => {
        navigate('/NewData');
    }

    return (
        <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>What type of organism are you entering?</h2>
            <FancyButton title="Plant" buttonFunc={()=>navToPlant()}/>
            <FancyButton title="Animal" buttonFunc={()=>navToAni()} />
            <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
        </div>
    )
}