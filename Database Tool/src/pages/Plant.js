import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function PlantPage(){
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
            <TopBar />
            <h2>Enter the species information for the plant</h2>
            <Input value="Genus" page="Organism" />
            <Input value="Species" page="Organism" />
            <Input value="Common Name" page="Organism" />
            <Input value="Conservation Status" page="Organism" />
            <Input value="Growth Form" page="Flora" />
            <Input value="Growing Method" page="Flora" />
            <Input value="Veg Type" page="Flora" />
            <Input value="Alien" category="checkbox"/>
            <Input value="Invasive" category="checkbox"/>
            <FancyButton title="Submit" buttonFunc={()=>submitInfo()} specialty={true} />
            <FancyButton title="Back" buttonFunc={()=>navToOrg()} specialty={true} />
        </div>
    )
}