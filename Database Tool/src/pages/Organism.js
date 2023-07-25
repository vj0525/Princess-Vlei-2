import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';


export default function OrganismPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToPlant = () => {
        navigate('/plant',{state:{token_value:location.state.token_value}});
    }

    const navToAni = () => {
        navigate('/animal',{state:{token_value:location.state.token_value}});
    }
    
    const navToNew = () => {
        navigate('/NewData',{state:{token_value:location.state.token_value}});
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>What type of organism are you entering?</h2>
            <FancyButton title="Plant" buttonFunc={()=>navToPlant()}/>
            <FancyButton title="Animal/Fungi" buttonFunc={()=>navToAni()} />
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
            </div>
        </div>
    )
}