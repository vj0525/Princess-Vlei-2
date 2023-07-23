import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';


export default function ModOrganismPage(){

    const navigate = useNavigate();

    const navToPlant = () => {
        navigate('/plant-modify');
    }

    const navToAni = () => {
        navigate('/animal-modify');
    }
    
    const navToNew = () => {
        navigate('/modify');
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>What type of organism are you modifying?</h2>
            <FancyButton title="Plant" buttonFunc={()=>navToPlant()}/>
            <FancyButton title="Animal" buttonFunc={()=>navToAni()} />
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
            </div>
        </div>
    )
}