import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function ModSuccessPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToLogIn = () => {
        navigate('/');
    }
    const navToIntro = () => {
        navigate('/Intro', {state:{token_value:location.state.token_value}});
    }

    function back() {
        window.history.back();
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Your data has been successfully modified!</h2>
            <div>
                <FancyButton title="Modify Another" buttonFunc={()=>back()} specialty={true} />
                <FancyButton title="Return to Start" buttonFunc={()=>navToIntro()} specialty={true} />
                <FancyButton title="Log Out" buttonFunc={()=>navToLogIn()} specialty={true} />
            </div>
        </div>
    )
}