import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import { useState } from 'react';
import {Routes, Route, useNavigate, useParams} from 'react-router-dom';

export default function SurveyPlantPage(){

    const navigate = useNavigate();

    const navContinue = () => {
        console.log(speciesRichness);
        navigate('/surveyplantspec',{ state: {count: Number(speciesRichness)}});
    }
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
    function addToHundred(data){
        return (data.bare_ground + data.annual + data.restiad
            + data.gramnoid + data.erica + data.protea + data.herbpen
            + data.small_shrub + data.large_shrub + data.geophyte) === 100;
    }
    async function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();
        document.getElementById("loadText").innerHTML = "Loading...";
        const pandorasBox = new FormData(event.target);
        let data = Object.fromEntries(pandorasBox.entries());
        data.bare_ground = Number(data.bare_ground);
        data.annual = Number(data.annual);
        data.restiad = Number(data.restiad);
        data.gramnoid = Number(data.gramnoid);
        data.erica = Number(data.erica);
        data.protea = Number(data.protea);
        data.herbpen = Number(data.herbpen);
        data.small_shrub = Number(data.small_shrub);
        data.large_shrub = Number(data.large_shrub);
        data.geophyte = Number(data.geophyte);
        data.num_species = Number(data.num_species);
        data['latitude'] = data['latitude'] ? data['latitude'] : null;
        data['longitude'] = data['longitude'] ? data['longitude'] : null;
        if(!addToHundred(data)){
            updateMessage('These percentages do not add to a hundred percent. Please recheck your values');
            document.getElementById("loadText").innerHTML = "";
            return;
        }
        const dataStringFull = JSON.stringify(data).toLowerCase();
        const responseFull = await fetch(`https://pv-test.onrender.com/api/flora_survey`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: dataStringFull
        });
        if (!responseFull.ok){
            navToError();
            return;
        }
        navContinue();
        
        return;
    }
    const [speciesRichness, setSpeciesRichness] = useState(0);
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
                            <h3 className="formAccessories">Bare Ground Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Annual Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Restiad Area Cover Percentage:</h3>
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
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="bare_ground" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="annual" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="restiad" />
                        </div>
                        <div className='col1' id="titles">
                            <h3 className="formAccessories">Gramnoid Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Erica Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Protea Area Cover Percentage:</h3>
                            <h3 className="formAccessories">HerbPen Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Small Shrub Ground Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Large Shrub Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Geophyte Area Cover Percentage:</h3>
                            <h3 className="formAccessories">Number of species present:</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="gramnoid" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="erica" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="protea" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="herbpen" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="small_shrub" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="large_shrub" />
                            <input className="formItems" type="number" placeholder="%" min="0" max="100" name="geophyte" />
                            <input className="formItems" type="number" placeholder="Number of Species"
                            min="0" max="1000" step="1" name="num_species"
                            onChange={(key)=>setSpeciesRichness(key.target.value)}/>
                        </div>
                    </form>    
                </div>
            </div>
            <div id="forErrorMessages">
            </div>
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToOne()} specialty={true} />
                <button type="submit" form="surveyForm" id="submission"><p className="textP">Continue</p></button>
            </div>
            <p id="loadText" className="load"></p>
        </div>
    )
}