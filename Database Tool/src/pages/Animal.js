import FancyButton from '../components/FancyButton';
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
    function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();
        const pandorasBox = new FormData(event.target);
        let data = Object.fromEntries(pandorasBox.entries());
        data["Alien"] = data["Alien"]==='on';
        data["Invasive"] = data["Invasive"]==='on';
        const dataString = JSON.stringify(data).toLowerCase();
        const dataBody = JSON.parse(dataString);
        fetch('https://pv-test.onrender.com/api/organism', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: dataString
        });
        console.log("Aooga");
        console.log(dataString);
        //navToSuc();
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
            <form className="quickTest" id="animalForm" onSubmit={(event)=>submitInfo(event)}>
            <input className="formItems" type="text" placeholder="Genus" name="Genus" />
            <input className="formItems" type="text" placeholder="Species" name="Species" />
            <input className="formItems" type="text" placeholder="Common Name" name="Common_Name" />
            <input className="formItems" type="text" placeholder="Conservation Status" name="Conservation_Status" />
            <input className="formBox" type="checkbox" placeholder="Alien" name="Alien" /> {/*Three options of indigienous, non-invasive alien or invasive alien. Don't allow checkboxes to check invasive but not alien */}
            <input className="formBox" type="checkbox" placeholder="Invasive" name="Invasive" />
            </form>
            </div>
            </div>
            <div>
            <FancyButton title="Back" buttonFunc={()=>navToOrg()} specialty={true} />
            <button type="submit" form="animalForm" id="submission"><p className="textP">Submit</p></button>
            </div>
        </div>
    )
}