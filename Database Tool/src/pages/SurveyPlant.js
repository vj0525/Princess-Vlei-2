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
    function plantDNE(dataWID){
        const oldMessageIfApplies = document.getElementById('errorMessage');
        if(!oldMessageIfApplies){
            console.log(typeof(oldMessageIfApplies))
            oldMessageIfApplies.remove();
        }
        let midMessage = "";
        if(dataWID.length === 0){
            midMessage = ""
        }
        else if(dataWID.length === 1){
            midMessage = `You may have meant ${dataWID[0]['Common_Name']}`
        }else{
            midMessage = `You may have meant ${dataWID[0]['Common_Name']} or ${dataWID[1]['Common_Name']}`
        }
        const linked = document.createElement('a');
        linked.setAttribute('href','/plant');
        linked.innerHTML = 'here';
        const paragraph = document.createElement('p');
        paragraph.innerHTML = `No plant in the database matches that name. ${midMessage}. If you did not, you may want to try entering this plant in the plant database `;
        paragraph.appendChild(linked);
        paragraph.setAttribute('id','errorMessage');
        document.getElementById('forErrorMessages').appendChild(paragraph);
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
        const responseID = await fetch(`https://pv-test.onrender.com/api/organism?title=${data["common_name"].toLowerCase()}`, {
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
            //Write function here for having user input an organism into the database
            plantDNE(dataWID);
            document.getElementById("loadText").innerHTML = "";
            return;
        }
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
        return;
    }

    return(
        <div className="main-div">
            <TopBar />
            <h2>Enter the location information from the survey data</h2>
            <div className="body-div">
                <div className="panels" id="titles">
                    <h3 className="formAccessories">Common Name:</h3>
                    <h3 className="formAccessories">Date:</h3>
                    <h3 className="formAccessories">Latitude:</h3>
                    <h3 className="formAccessories">Longitude:</h3>
                </div>
                <div className="panels">
                    <form className="quickTest" id="surveyForm" onSubmit={(event)=>submitInfo(event)}>
                        <input className="formItems" type="text" placeholder="Plant Name" name="common_name" required/>
                        <input className="formItems" type="date" placeholder="Date" name="survey_date" required/>
                        <input className="formItems" type="text" placeholder="Latitude" name="latitude" required/>
                        <input className="formItems" type="text" placeholder="Longitude" name="longitude" required/> 
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