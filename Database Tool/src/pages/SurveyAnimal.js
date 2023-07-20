import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function SurveyAnimalPage(){

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
    function animalDNE(dataWID){
        let message = "";
        if(dataWID.length === 0){
            message = ""
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
            animalDNE(dataWID);
            document.getElementById("loadText").innerHTML = "";
            return;
        }
        data["faunaID"] = orgID;
        const dataStringFull = JSON.stringify(data);
        console.log(dataStringFull);
        const responseFull = await fetch('https://pv-test.onrender.com/api/fauna_survey', {
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

    return(
        <div className="main-div">
            <TopBar />
            <h2>Enter the Information you'd like to Provide:</h2>
            <div className="body-div">
                <div className="panels" id="titles">
                    <h3 className="formAccessories">Common Name:</h3>
                    <h3 className="formAccessories">Date:</h3>
                    <h3 className="formAccessories">Location:</h3>
                    <h3 className="formAccessories">Latitude:</h3>
                    <h3 className="formAccessories">Longitude:</h3>
                    <h3 className="formAccessories">Sex:</h3>
                    <h3 className="formAccessories">Activity:</h3>
                    <h3 className="formAccessories">Life Stage:</h3>
                </div>
                <div className="panels">
                    <form className="quickTest" id="surveyForm" onSubmit={(event)=>submitInfo(event)}>
                        <input className="formItems" type="text" placeholder="Animal Name" name="common_name" required/>
                        <input className="formItems" type="date" placeholder="Date" name="survey_date" required/>
                        <select className="formItems" name="location" form="surveyForm">
                            <option>Please choose a location</option>
                            <option>East</option>
                            <option>West</option>
                            <option>North</option>
                            <option>South</option>
                        </select>
                        <input className="formItems" type="text" placeholder="Latitude" name="latitude" />
                        <input className="formItems" type="text" placeholder="Longitude" name="longitude" />
                        <input className="formItems" type="text" placeholder="Sex" name="sex" />
                        <input className="formItems" type="text" placeholder="Activity" name="activity" />
                        <input className="formItems" type="text" placeholder="Life Stage" name="life_stage" />
                    </form>    
                </div>
            </div>
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToOne()} specialty={true} />
                <button type="submit" form="surveyForm" id="submission"><p className="textP">Submit</p></button>
            </div>
            <p id="loadText" className="load"></p>
        </div>
    )
}