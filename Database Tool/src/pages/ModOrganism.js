import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';


export default function ModOrganismPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToPlant = () => {
        navigate('/plant-modify', {state:{token_value:location.state.token_value}});
    }

    const navToAni = () => {
        navigate('/animal-modify', {state:{token_value:location.state.token_value}});
    }
    
    const navToNew = () => {
        navigate('/modify', {state:{token_value:location.state.token_value}});
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