import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function ModDataPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToOrg = () => {
        navigate('/organism-search', {state:{token_value:location.state.token_value}});
    }

    const navToSury = () => {
        navigate('/surveyone-modify', {state:{token_value:location.state.token_value}});
    }

    const navToOut = () => {
        navigate('/outreach-modify', {state:{token_value:location.state.token_value}});
    }

    const navToIntro = () => {
        navigate('/intro', {state:{token_value:location.state.token_value}});
      }
    
    return (
        <div className="main-div">
            <TopBar />
            <h2>What type of data would you like to modify?</h2>
            <FancyButton title="Organism" buttonFunc={()=>navToOrg()}/>
            {/* <FancyButton title="Survey" buttonFunc={()=>navToSury()} />
            <FancyButton title="Education & Outreach" buttonFunc={()=>navToOut()} /> */}
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToIntro()} specialty={true} />
            </div>
        </div>
    )
    }