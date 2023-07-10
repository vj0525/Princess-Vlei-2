import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';


// let introPage = (
//     <div className="main-div">
//     <img src='../components/VleiTopBar.png' className="topBar" alt="Header for Princess Vlei Application"/>
//     <h2>Welcome!<br />
//     What type of data would you like to input?</h2>
//     <FancyButton title="Organism" buttonFunc={()=>console.log("Hello World")} />
//     <FancyButton title="Survey" buttonFunc={()=>console.log("Hello World")} />
//     <FancyButton title="Education/Outreach" buttonFunc={()=>console.log("Hello World")} />
//     </div>
// )

export default function IntroPage() {

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

    return (
        <h1>
            <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>Welcome!<br />
                What type of data would you like to input?
            </h2>
            <FancyButton title="Organism" buttonFunc={navToOrg} />
            <FancyButton title="Survey" buttonFunc={navToSury} />
            <FancyButton title="Education/Outreach" buttonFunc={navToOut} />
            </div>
        </h1>
    )
}