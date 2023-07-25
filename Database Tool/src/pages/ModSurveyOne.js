import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';


export default function ModSurveyOnePage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToPlant = () => {
        navigate('/surveyplant-modify', {state:{token_value:location.state.token_value}});
    }

    const navToAni = () => {
        navigate('/surveyanimal-modify', {state:{token_value:location.state.token_value}});
    }
    
    const navToNew = () => {
        navigate('/modify', {state:{token_value:location.state.token_value}});
    }

    function back() {
        window.history.back();
    }
    
    return (
        <div className="main-div">
            <TopBar />
            <h2>What Survey do you Want to Modify?</h2>

            <div>
            <FancyButton title="Back" buttonFunc={()=>back()} specialty={true} />
            </div>
        </div>
    )
}