import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/TopBar.js';
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
            <TopBar />
            <h2>Enter the location information from the survey data</h2>
            <div className="body-div">
            <div className="panels" id="titles">
                <h3 className="formAccessories">Genus:</h3>
                <h3 className="formAccessories">Species:</h3>
                <h3 className="formAccessories">Common Name:</h3>
                <h3 className="formAccessories">Conservation Status:</h3>
                <h3 className="formAccessories">Alien Species?:</h3>
                <h3 className="formAccessories">Invasive Species?:</h3>
            </div>
            <div className="panels">
            <form className="quickTest">
            <input className="formItems" type="text" placeholder="Genus" />
            <input className="formItems" type="text" placeholder="Species" />
            <input className="formItems" type="text" placeholder="Common Name" />
            <input className="formItems" type="text" placeholder="Conservation Status" />
            <input className="formBox" type="checkbox" placeholder="Alien" /> {/*Three options of indigienous, non-invasive alien or invasive alien. Don't allow checkboxes to check invasive but not alien */}
            <input className="formBox" type="checkbox" placeholder="Invasive" />
            </form>
            </div>
            </div>
            <FancyButton title="Submit" buttonFunc={()=>submitInfo()} specialty={true} />
            <FancyButton title="Back" buttonFunc={()=>navToOrg()} specialty={true} />
        </div>
    )
}