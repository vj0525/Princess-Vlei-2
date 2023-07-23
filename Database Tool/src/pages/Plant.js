import FancyButton from '../components/FancyButton';
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
    function updateMessage(error, route=""){
        const oldMessageIfApplies = document.getElementById('errorMessage');
        if(oldMessageIfApplies){
            console.log(oldMessageIfApplies)
            oldMessageIfApplies.remove();
        }
        const paragraph = document.createElement('p');
        paragraph.innerHTML = error;
        paragraph.setAttribute('id','errorMessage');
        if(route){
            const linked = document.createElement('a');
            linked.setAttribute('href',route);
            linked.innerHTML = 'here';
            paragraph.appendChild(linked);
        }
        document.getElementById('forErrorMessages').appendChild(paragraph);
    }
    async function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();

        document.getElementById("loadText").innerHTML = "Loading...";

        const pandorasBox = new FormData(event.target);
        let data = Object.fromEntries(pandorasBox.entries());
        data["alien"] = data["alien"]==='on';
        data["invasive"] = data["invasive"]==='on';
        if(data['conservation_status']==='Please choose a status'){
            updateMessage('Please choose a conservation status before submitting')
            document.getElementById("loadText").innerHTML = "";
            return;
        }
        if(data['growth_form']==='Please choose a form'){
            updateMessage('Please choose a growth form before submitting')
            document.getElementById("loadText").innerHTML = "";
            return;
        }
        if(data['growing_method']==='Please choose a method'){
            updateMessage('Please choose a growing method before submitting')
            document.getElementById("loadText").innerHTML = "";
            return;
        }
        const dataStringOrg = JSON.stringify(data).toLowerCase();
        console.log(dataStringOrg);
        const responseOrg = await fetch('https://pv-test.onrender.com/api/organism', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: dataStringOrg
        });
        const dataWID = await responseOrg.json();
        if (!responseOrg.ok){
            navToError();
            return;
        }
        console.log(dataWID);
        data["floraID"] = dataWID["orgID"];
        const dataStringFull = JSON.stringify(data);
        console.log(dataStringFull)
        const responseFull = await fetch('https://pv-test.onrender.com/api/flora', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: dataStringFull
        });
        if (!responseFull.ok){
            navToError();
            return;
        }
        console.log(data);
        navToSuc();
        return;
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Enter Information for the Plant:</h2>
            <div className="body-div">
                <div className="panels">
                    <form className="quickTest" id="plantForm" onSubmit={(event)=>submitInfo(event)}>
                    <div className='col1' id="titles">
                        <h3 className="formAccessories">Genus:</h3>
                        <h3 className="formAccessories">Species:</h3>
                        <h3 className="formAccessories">Common Name:</h3>
                        <h3 className="formAccessories">Conservation Status:</h3>
                    </div>
                    <div className='col1'>
                        <input className="formItems" type="text" placeholder="Genus" name="genus" />
                        <input className="formItems" type="text" placeholder="Species" name="species" />
                        <input className="formItems" type="text" placeholder="Common Name" name="common_name" />
                        <select className="formSelect" name="conservation_status" form="plantForm">
                            <option>Please choose a status</option>
                            <option>Data Deficient (DD)</option>
                            <option>Not Evaluated (NE)</option>
                            <option>Least Concern (LC)</option>
                            <option>Near Threatened (NT)</option>
                            <option>Vulnerable (VU)</option>
                            <option>Endangered (EN)</option>
                            <option>Critically Endangered (CR)</option>
                            <option>Extinct in the Wild (EW)</option>
                            <option>Extinct (EX)</option>
                        </select>
                    </div>
                    <div className='col1' id="titles">
                        <h3 className="formAccessories">Growth Form:</h3>
                        <h3 className="formAccessories">Growing Method:</h3>
                        <h3 className="formAccessories">Vegetation Type:</h3>
                        <h3 className="formAccessories">Alien?:</h3>
                        <h3 className="formAccessories">Invasive?:</h3>
                    </div>
                    <div className='col1'>
                        <select className="formSelect" name="growth_form" form="plantForm">
                            <option>Please choose a form</option>
                            <option>Restiad</option>
                            <option>Gramnoid</option>
                            <option>Erica</option>
                            <option>Protea</option>
                            <option>HerbPen</option>
                            <option>Small Shrub</option>
                            <option>Large Shrub</option>
                            <option>Geophytes</option>
                            <option>Annual</option>
                        </select>
                        <select className="formSelect" name="growing_method" form="plantForm">
                            <option>Please choose a method</option>
                            <option>Seed</option>
                            <option>Cutting</option>
                        </select>
                        <input className="formItems" type="text" placeholder="Vegetation Type" name="veg_type" />
                        <input className="formBox" type="checkbox" placeholder="Alien" name="alien" /> {/*Three options of indigienous, non-invasive alien or invasive alien. Don't allow checkboxes to check invasive but not alien */}
                        <input className="formBox" type="checkbox" placeholder="Invasive" name="invasive" />
                    </div>    
                    </form>
                </div>
            </div>
            <div id="forErrorMessages">
            </div>
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToOrg()} specialty={true} />
                <button type="submit" form="plantForm" id="submission"><p className="textP">Submit</p></button>
            </div>
            <p id="loadText" className="load"></p>
        </div>
    )
}