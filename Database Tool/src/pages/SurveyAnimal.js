import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function SurveyAnimalPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/success', {state:{token_value:location.state.token_value}});
    }
    const navToError = () => {
        navigate('/Error', {state:{token_value:location.state.token_value}})
    }
    const navToOne = () => {
        navigate('/surveyone', {state:{token_value:location.state.token_value}});
    }
    function updateMessage(error, route=""){
        const oldMessageIfApplies = document.getElementById('errorMessage');
        if(oldMessageIfApplies){
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
    function animalDNE(dataWID){
        let message = "";
        if(dataWID.length === 0){
            message = "There is no animal with a similar name in our database. You may want to try entering this animal in the animal database "
        }
        else if(dataWID.length === 1){
            message = `You may have meant ${dataWID[0]['Common_Name']}, or you may want to try entering this animal in the animal database `
        }else{
            message = `You may have meant ${dataWID[0]['Common_Name']} or ${dataWID[1]['Common_Name']}, or you may want to try entering this animal in the animal database `
        }
        updateMessage(message,'/animal')
    }
    async function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();
        
        document.getElementById("loadText").innerHTML = "Loading...";

        const pandorasBox = new FormData(event.target);
        let data = Object.fromEntries(pandorasBox.entries());
        if(data['location']==='Please choose a location'){
            updateMessage('Please choose a location before submitting')
            document.getElementById("loadText").innerHTML = "";
            return;
        }
        data['latitude'] = data['latitude'] ? data['latitude'] : null;
        data['longitude'] = data['longitude'] ? data['longitude'] : null;
        data['sex'] = data['sex'] === 'N/A' ? 'N' : data['sex'];
        let entry = data['_name'];
        const response = await fetch(`https://princessvleiapi.onrender.com/api/organism/noflora?common=${entry}`, {
                method: 'GET',
                headers: {"Content-Type": "application/json",
                        "Token": location.state.token_value}
            });
            let dataName = await response.json();
            if (!response.ok){
                navToError();
                return;
            }
            if(dataName.length === 0){
                //Scientific time
                if(entry.indexOf(' ') !== -1 && entry.substring(entry.indexOf(' ')+1).indexOf(' ') === -1){
                    //We have a scientific name
                    const response = await fetch(`https://princessvleiapi.onrender.com/api/organism/noflora?scientific=${entry}`, {
                        method: 'GET',
                        headers: {"Content-Type": "application/json",
                                "Token": location.state.token_value}
                    });
                    dataName = await response.json();
                    if (!response.ok){
                        navToError();
                        return;
                    }
                    if(dataName.length === 0){
                        document.getElementById("loadText").innerHTML = "";
                        animalDNE(entry);
                        return;    
                    }
                }else{
                    //Neither
                    document.getElementById("loadText").innerHTML = "";
                    animalDNE(entry);
                    return;
                }
            }
        data["faunaID"] = dataName[0]['orgID'];
        const dataStringFull = JSON.stringify(data);
        const responseFull = await fetch('https://princessvleiapi.onrender.com/api/fauna_survey', {
            method: 'POST',
            headers: {"Content-Type": "application/json",
                    "Token": location.state.token_value},
            body: dataStringFull
        });
        if (!responseFull.ok){
            navToError();
            return;
        }
        navToSuc();
        return;
    }

    return(
        <div className="main-div">
            <TopBar />
            <h2>Enter the Information you'd like to Provide:</h2>
            <div className="body-div">
                <div className="panels">
                    <form className="quickTest" id="surveyForm" onSubmit={(event)=>submitInfo(event)}>
                        <div className='col1'>
                            <h3 className="formAccessories" id="titles">Name (Scientific or Common)*:</h3>
                            <h3 className="formAccessories" id="titles">Sex:</h3>
                            <h3 className="formAccessories" id="titles">Activity:</h3>
                            <h3 className="formAccessories" id="titles">Life Stage:</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="text" placeholder="Animal Name" name="_name" required/>
                            <select className="formItems" name="sex" form="surveyForm">
                                <option>N/A</option>
                                <option>M</option>
                                <option>F</option>
                            </select>
                            <input className="formItems" type="text" placeholder="Activity" name="activity" />
                            <input className="formItems" type="text" placeholder="Life Stage" name="life_stage" />
                        </div>
                        <div className='col1'>
                            <h3 className="formAccessories" id="titles">Date*:</h3>
                            <h3 className="formAccessories" id="titles">Location*:</h3>
                            <h3 className="formAccessories" id="titles">Latitude (if known):</h3>
                            <h3 className="formAccessories" id="titles">Longitude (if known):</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="date" placeholder="Date" name="survey_date" required/>
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