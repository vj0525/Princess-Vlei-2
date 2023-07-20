import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function NewDataPage(){

    const navigate = useNavigate();

    const navToOrg = () => {
        navigate('/organism');
    }

    const navToSury = () => {
        navigate('/surveyone');
    }

    const navToOut = () => {
        navigate('/outreach');
    }

    const navToIntro = () => {
        navigate('/intro');
      }
    
    return (
        <div className="main-div">
            <TopBar />
            <h2>What type of data would you like to input?</h2>
            <FancyButton title="Organism" buttonFunc={()=>navToOrg()}/>
            <FancyButton title="Survey" buttonFunc={()=>navToSury()} />
            <FancyButton title="Education & Outreach" buttonFunc={()=>navToOut()} />
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToIntro()} specialty={true} />
            </div>
        </div>
    )
    }