import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function AnimalPage(){
    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/Success');
    }
    const navToError = () => {
        navigate('/Error')
    }
    const navToOrg = () => {
        navigate('/Organism');
    }
    function submitInfo(){
        //To Add, Check that data submits successfully and nav to error if not
        navToSuc();
    }

    return (
        <div className="main-div">
            <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
            <h2>Enter the location information from the survey data</h2>
            <Input value="Genus" />
            <Input value="Species" />
            <Input value="Common Name" />
            <Input value="Alien Species?" category="checkbox"/> {/*Three options of indigienous, non-invasive alien or invasive alien. Don't allow checkboxes to check invasive but not alien */}
            <Input value="Invasive?" category="checkbox"/>
            <FancyButton title="Submit" buttonFunc={()=>submitInfo()} specialty={true} />
            <FancyButton title="Back" buttonFunc={()=>navToOrg()} specialty={true} />
        </div>
    )
}