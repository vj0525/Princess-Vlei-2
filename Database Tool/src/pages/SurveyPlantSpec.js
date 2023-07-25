import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import { useEffect } from 'react';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function SurveyPlantSpecPage(){
    const location = useLocation();

    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/success', {state:{token_value:location.state.token_value, plant_spec:true}});
    }
    const navToError = () => {
        navigate('/error', {state:{token_value:location.state.token_value}})
    }
    const navToSurvPlant = () => {
        navigate('/surveyplant', {state:{token_value:location.state.token_value}});
    }

    function makeInputs(num){
        const main = document.getElementById('column');
        main.innerHTML = "";
        for(let element = 0; element < num; element++){
            let entry = document.createElement('input');
            entry.setAttribute('class','formItems');
            entry.setAttribute('type','text');
            entry.setAttribute('placeholder',`Species #${element+1}`);
            entry.setAttribute('name',`connection-${element}`);
            entry.setAttribute('id',`connection-${element}`);
            main.appendChild(entry);
        }
    }
    async function submitInfo(event){
        event.preventDefault();
        document.getElementById("loadText").innerHTML = "Loading...";
        const pandorasBox = new FormData(event.target);
        let data = Object.fromEntries(pandorasBox.entries());
        for(let spec = 0; spec < location.state.count; spec++){
            if(document.getElementById(`connection-${spec}`).getAttribute('disabled') || document.getElementById(`connection-${spec}`).value === ""){
                continue;
            }
            let entry = data[`connection-${spec}`];
            const response = await fetch(`https://princessvleiapi.onrender.com/api/flora?common=${entry}`, {
                method: 'GET',
                headers: {"Content-Type": "application/json",
                        "Token": location.state.token_value}
            });
            let dataWID = await response.json();
            if (!response.ok){
                navToError();
                return;
            }
            console.log(dataWID);
            if(dataWID.length === 0){
                //Scientific time
                console.log(entry.indexOf(' '), entry.substring(entry.indexOf(' ')+1))
                if(entry.indexOf(' ') !== -1 && entry.substring(entry.indexOf(' ')+1).indexOf(' ') === -1){
                    //We have a scientific name
                    const response = await fetch(`https://princessvleiapi.onrender.com/api/flora?scientific=${entry}`, {
                        method: 'GET',
                        headers: {"Content-Type": "application/json",
                                "Token": location.state.token_value}
                    });
                    dataWID = await response.json();
                    if (!response.ok){
                        navToError();
                        return;
                    }
                    if(dataWID.length === 0){
                        document.getElementById("loadText").innerHTML = "";
                        speciesDNE(entry);
                        return;    
                    }
                }else{
                    //Neither
                    document.getElementById("loadText").innerHTML = "";
                    speciesDNE(entry);
                    return;
                }
            }
            let orgID = dataWID[0]['floraID'];
            let connector = {floraSID: location.state.floraSID, floraID: orgID};    
            let connectString = JSON.stringify(connector);
            const responseEnd = await fetch(`https://princessvleiapi.onrender.com/api/addflora`, {
                    method: 'POST',
                    headers: {"Content-Type": "application/json",
                            "Token": location.state.token_value},
                    body: connectString,
                });
                const dataFinal = await responseEnd.json();
                if (!responseEnd.ok){
                    navToError();
                    return;
                }
                document.getElementById(`connection-${spec}`).setAttribute('disabled',true);
            }
        navToSuc();
    }
    function speciesDNE(entry){
        const message = `The species ${entry} is not recognized. All other entries before this were submitted. You may want to rewrite this or try adding it to the database `;
        updateMessage(message,'/animal');
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
    useEffect(()=>{
        makeInputs(location.state.count);
    })
    return (
        <div className="main-div">
        <TopBar />
        <h2>Enter as many species as you recognized either by common name or scientific name:</h2>
        <div className="body-div" >
            <div className="panels">
                <form className="quickTest" id="surveyForm" onSubmit={(event)=>submitInfo(event)}>
                    <div id='column'>
                    </div>
                </form>    
            </div>
        </div>
        <p id="loadText" className="load"></p>
        <div id="forErrorMessages">
            </div>
        <div>
            <FancyButton title="Back" buttonFunc={()=>navToSurvPlant()} specialty={true} />
            <button type="submit" form="surveyForm" id="submission"><p className="textP">Submit</p></button>
        </div>
    </div>
    )
}