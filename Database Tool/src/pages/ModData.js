import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function ModDataPage(){

    const navigate = useNavigate();

    const navToOrg = () => {
        navigate('/organism-modify');
    }

    const navToSury = () => {
        navigate('/surveyone-modify');
    }

    const navToOut = () => {
        navigate('/outreach-modify');
    }

    const navToIntro = () => {
        navigate('/intro');
      }
    
    return (
        <div className="main-div">
            <TopBar />
            <h2>What type of data would you like to modify?</h2>
            <FancyButton title="Organism" buttonFunc={()=>navToOrg()}/>
            <FancyButton title="Survey" buttonFunc={()=>navToSury()} />
            <FancyButton title="Education & Outreach" buttonFunc={()=>navToOut()} />
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToIntro()} specialty={true} />
            </div>
        </div>
    )
    }