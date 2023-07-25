import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function SuccessPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToLogIn = () => {
        navigate('/');
    }
    const navToIntro = () => {
        navigate('/Intro', {state:{token_value:location.state.token_value}});
    }

    function back() {
        if(location.state.plant_spec){
            navigate('/surveyplant', {state:{token_value:location.state.token_value}});
            return;
        }
        window.history.back();
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Your data has been successfully submitted!</h2>
            <div>
                <FancyButton title="Enter Another" buttonFunc={()=>back()} specialty={true} />
                <FancyButton title="Return to Start" buttonFunc={()=>navToIntro()} specialty={true} />
                <FancyButton title="Log Out" buttonFunc={()=>navToLogIn()} specialty={true} />
            </div>
        </div>
    )
}