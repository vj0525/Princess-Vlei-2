import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
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

    const navToNew = () => {
        navigate('/NewData');
    }
/* For once we make modifying data option
    const navToModify = () => {
        navigate('/modify');
    }*/

    const navToLogIn = () => {
        navigate('/');
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Welcome!<br />
            What would you like to do?</h2>
            <FancyButton title="Enter New Data" buttonFunc={()=>navToNew()}/>
            <FancyButton title="Modify Existing Data" buttonFunc={()=>console.log("Hello World")} />
            <div>
                <FancyButton title="Log Out" buttonFunc={()=>navToLogIn()} specialty={true} />
            </div>
        </div>
    )
}