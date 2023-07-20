import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function ModAnimalPage(){
    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/Success-modify');
    }
    const navToError = () => {
        navigate('/Error')
    }
    const navToOrg = () => {
        navigate('/organism-modify');
    }
    async function initializeAll(){
        const response = await fetch('https://pv-test.onrender.com/api/organism', {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        if (!response.ok){
            navToError();
            return;
        }
        console.log(data);
        return data;
    }
    function DivMaker(organism){
        const entry = document.createElement('div');
        entry.setAttribute('className', 'orgEntry');
        entry.setAttribute('id', `orgEntry-${organism.orgID}`);
        const common = document.createElement('h4');
        common.innerHTML = `Name: ${organism['Common_Name']}`;
        const genus = document.createElement('h4');
        genus.innerHTML = `Genus: ${organism['Genus']}`;
        const species = document.createElement('h4');
        species.innerHTML = `Species: ${organism['Species']}`;
        const conserve = document.createElement('h4');
        conserve.innerHTML = `Conservation Status: ${organism['Conservation_Status']}`;
        const trashButton = document.createElement('button');
        trashButton.setAttribute('className','trash');
        const editButton = document.createElement('button');
        editButton.setAttribute('className', 'edit');
        entry.appendChild(common);
        entry.appendChild(genus);
        entry.appendChild(species);
        entry.appendChild(conserve);
        entry.appendChild(trashButton);
        entry.appendChild(editButton);
        return entry;
    }
    async function putUpDivs(dataFunc){
        const data = await dataFunc();
        const oldDataIfApplies = document.getElementById('data-container');
        if(oldDataIfApplies){
            console.log(oldDataIfApplies)
            oldDataIfApplies.remove();
        }
        const newSet = document.createElement('div');
        newSet.setAttribute('className','data-container');
        let datapoint = null;
        console.log(data);
        for (let element in data){
            console.log(data[element]);
            datapoint = DivMaker(data[element]);
            newSet.appendChild(datapoint);
            console.log(newSet);
        }
        document.getElementById('forIDPurposes').appendChild(newSet);
    }
    function searchFilter(event){

    }
    return (
        <div className="main-div">
            <TopBar />
            <h2>Which animal would you like to modify:</h2>
            <input className="formItems" type="text" onKeyUp={(event)=>searchFilter(event)} placeholder="Search here for a specific animal"/>
            <div className="body-div" id="forIDPurposes">
                <button onClick={()=>putUpDivs(initializeAll)}>Click to start</button>
                <div className="data-container">
                </div>
            </div>
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToOrg()} specialty={true} />
            </div>
            <p id="loadText" className="load"></p>
        </div>
    )
}