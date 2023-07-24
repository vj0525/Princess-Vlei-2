import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function ErrorPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToLogIn = () => {
        navigate('/');
    }
    const navToIntro = () => {
        navigate('/Intro', {state:{token_value:location.state.token_value}});
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Sorry, something went wrong.<br />Please try again shortly.</h2>
            <div>
                <FancyButton title="Return to Start" buttonFunc={()=>navToIntro()} specialty={true} />
                <FancyButton title="Log Out" buttonFunc={()=>navToLogIn()} specialty={true} />
            </div>
        </div>
    )
}