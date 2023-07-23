import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function SurveyPlantPage(){

    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/success');
    }
    const navToError = () => {
        navigate('/Error')
    }
    const navToOne = () => {
        navigate('/surveyone');
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
    function plantDNE(dataWID){
        let message = "";
        if(dataWID.length === 0){
            message = ""
        }
        else if(dataWID.length === 1){
            message = `You may have meant ${dataWID[0]['Common_Name']}, or you may want to try entering this plant in the plant database `
        }else{
            message = `You may have meant ${dataWID[0]['Common_Name']} or ${dataWID[1]['Common_Name']}, or you may want to try entering this plant in the plant database `
        }
        updateMessage(message,'/plant')
    }
    async function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();
        /*
        document.getElementById("loadText").innerHTML = "Loading...";

        const pandorasBox = new FormData(event.target);
        let data = Object.fromEntries(pandorasBox.entries());
        data['latitude'] = data['latitude'] ? data['latitude'] : null;
        data['longitude'] = data['longitude'] ? data['longitude'] : null;
        const dataStringForID = JSON.stringify(data).toLowerCase();
        console.log(dataStringForID);
        const responseID = await fetch(`https://pv-test.onrender.com/api/organism?name=${data["common_name"].toLowerCase()}`, {
            method: 'GET'
        });
        console.log(responseID);
        const dataWID = await responseID.json();
        if (!responseID.ok){
            navToError();
            return;
        }
        console.log(dataWID);
        let orgID = -1;
        for (let entry in dataWID){
            console.log(dataWID[entry]);
            console.log(dataWID[entry]['Common_Name']);
            if (dataWID[entry]['Common_Name'] === data['common_name'].toLowerCase()){
                console.log("Caught one");
                orgID = dataWID[entry]['orgID'];
                break;
            }
        }
        if (orgID < 0){
            plantDNE(dataWID);
            document.getElementById("loadText").innerHTML = "";
            return;
        }
        //Next make sure it's a flora
        //Gonna have to test tomorrow with database consistency
        data["floraID"] = orgID;
        const dataStringFull = JSON.stringify(data);
        console.log(dataStringFull);
        const responseFull = await fetch('https://pv-test.onrender.com/api/flora_survey', {
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
        */
        return;
    }

    return(
        <div className="main-div">
            <TopBar />
            <h2>Enter the Location Information from the Survey Data:</h2>
            <div className="body-div">
                <div className="panels">
                    <form className="quickTest" id="surveyForm" onSubmit={(event)=>submitInfo(event)}>
                        <div className='col1' id="titles">
                            <h3 className="formAccessories">Date:</h3>
                            <h3 className="formAccessories">Vegetation Type:</h3>
                            <h3 className="formAccessories">Location:</h3>
                            <h3 className="formAccessories">Latitude (if known):</h3>
                            <h3 className="formAccessories">Longitude (if known):</h3>
                            <h3 className="formAccessories">Number of species present:</h3>
                            <h3 className="formAccessories">Annual Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Bare Ground Area Cover Percentage:</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="date" placeholder="Date" name="survey_date" required/>
                            <select className="formItems" name="veg_type" form="surveyForm">
                                <option>Please choose a vegetation type</option>
                                <option>Cape Flats Dune Standveld</option>
                                <option>Cape Flats Sand Fynbos</option>
                                <option>Cape Flats Freshwater Vegetation</option>
                            </select>
                            <select className="formItems" name="location" form="surveyForm">
                                <option>Please choose a location</option>
                                <option>Civic Dunes</option>
                                <option>South Shore</option>
                                <option>Button Dunes</option>
                                <option>Elegia Nuda Drainage Line</option>
                                <option>Slipway</option>
                                <option>North Shore</option>
                                <option>South Field</option>
                                <option>East Shore</option>
                            </select>
                            <input className="formItems" type="text" placeholder="Latitude" name="latitude" />
                            <input className="formItems" type="text" placeholder="Longitude" name="longitude" />
                            <input className="formItems" type="number" placeholder="Number of Species" min="0" max="1000" step="1" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="annual_cover" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="bare_ground_cover" />
                        </div>
                        <div className='col1' id="titles">
                            <h3 className="formAccessories">Restiad Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Gramnoid Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Erica Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Protea Area Cover Percentage:</h3>
                            <h3 className="formAccessories">HerbPen Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Small Shrub Ground Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Large Shrub Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Geophyte Area Cover Percentage:</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="restiad_cover" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="gramnoid_cover" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="erica_cover" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="protea_cover" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="herbpen_cover" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="small_shrub_cover" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="large_shrub_cover" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="geophyte_cover" />
                        </div>
                    </form>    
                </div>
            </div>
            <div id="forErrorMessages">
            </div>
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToOne()} specialty={true} />
                <button type="submit" form="surveyForm" id="submission"><p className="textP">Submit</p></button>
            </div>
            <p id="loadText" className="load"></p>
        </div>
    )
}