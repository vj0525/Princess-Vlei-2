import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import { useState } from 'react';
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
        entry.setAttribute('class', 'orgEntry');
        entry.setAttribute('id', `${organism.orgID}`);
        const common = document.createElement('h4');
        common.innerHTML = `Name: ${organism['Common_Name']}`;
        const genus = document.createElement('h4');
        genus.innerHTML = `Genus: ${organism['Genus']}`;
        const species = document.createElement('h4');
        species.innerHTML = `Species: ${organism['Species']}`;
        const conserve = document.createElement('h4');
        conserve.innerHTML = `Conservation Status: ${organism['Conservation_Status']}`;
        const trashButton = document.createElement('button');
        trashButton.setAttribute('class','trash');
        trashButton.addEventListener('click',()=>areYouSure(organism.orgID));
        trashButton.innerHTML = 'Delete Organism';
        const editButton = document.createElement('button');
        editButton.setAttribute('class', 'edit');
        editButton.innerHTML = 'Edit Organism';
        entry.appendChild(common);
        entry.appendChild(genus);
        entry.appendChild(species);
        entry.appendChild(conserve);
        entry.appendChild(trashButton);
        entry.appendChild(editButton);
        return entry;
    }
    async function putUpDivs(dataFunc, key=""){
        const button = document.getElementById('modSearchButton');
        button.innerHTML = "Loading data...";
        const data = await dataFunc(key);
        const oldDataIfApplies = document.getElementById('data-container');
        if(oldDataIfApplies){
            console.log(oldDataIfApplies)
            oldDataIfApplies.remove();
        }
        const newSet = document.createElement('div');
        newSet.setAttribute('id','data-container');
        let datapoint = null;
        console.log(data);
        for (let element in data){
            console.log(data[element]);
            datapoint = DivMaker(data[element]);
            newSet.appendChild(datapoint);
            console.log(newSet);
        }
        document.getElementById('forIDPurposes').appendChild(newSet);
        button.innerHTML = "enter";
    }
    async function searchFilter(key){
        let keyString = key.toLowerCase();
        const response = await fetch(`https://pv-test.onrender.com/api/organism?name=${keyString}`, {
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
    function areYouSure(id=0){
        console.log("hello", id);
        const entry = document.getElementById(id);
        entry.innerHTML = "Are you sure you want to delete this organism?";
        const unsure = document.createElement('button');
        unsure.innerHTML = "No";
        unsure.addEventListener('click',()=>undoDelete(id));
        entry.appendChild(unsure);
        const sure = document.createElement('button');
        sure.innerHTML = "Yes";
        sure.addEventListener('click',()=>deleteOrganism(id));
        entry.appendChild(sure);
    }
    async function undoDelete(id){
        const response = await fetch(`https://pv-test.onrender.com/api/organism/${id}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        if (!response.ok){
            navToError();
            return;
        }
        const entry = document.getElementById(id);
        entry.innerHTML = "";
        const common = document.createElement('h4');
        common.innerHTML = `Name: ${data['Common_Name']}`;
        const genus = document.createElement('h4');
        genus.innerHTML = `Genus: ${data['Genus']}`;
        const species = document.createElement('h4');
        species.innerHTML = `Species: ${data['Species']}`;
        const conserve = document.createElement('h4');
        conserve.innerHTML = `Conservation Status: ${data['Conservation_Status']}`;
        const trashButton = document.createElement('button');
        trashButton.setAttribute('class','trash');
        trashButton.addEventListener('click',()=>areYouSure(id));
        trashButton.innerHTML = 'Delete Organism';
        const editButton = document.createElement('button');
        editButton.setAttribute('class', 'edit');
        editButton.innerHTML = 'Edit Organism';
        entry.appendChild(common);
        entry.appendChild(genus);
        entry.appendChild(species);
        entry.appendChild(conserve);
        entry.appendChild(trashButton);
        entry.appendChild(editButton);
    }
    async function deleteOrganism(id){
        const response = await fetch(`https://pv-test.onrender.com/api/organism/${id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        if (!response.ok){
            navToError();
            return;
        }
        document.getElementById(id).innerHTML = "Organism was deleted successfully!";
        console.log(data);
        return data;
    }
    const [search, setSearch] = useState("");
    return (
        <div className="main-div">
            <TopBar />
            <h3>Type in an animal's name to pull up that data point.<br />
            You can also type in part of a name to see multiple entries that match.<br />
            If you'd like to see all entries, just hit enter with nothing in the search box</h3>
            <div className="centerer">
            <input className="formItems" id="modSearchBox" type="text" onChange={(key)=>setSearch(key.target.value)} placeholder="Search here for a specific animal"/>
            <button id="modSearchButton" onClick={()=>putUpDivs(searchFilter,search)}>Enter</button>
            </div>
            <div id="forIDPurposes">
                <div id="data-container">
                </div>
            </div>
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToOrg()} specialty={true} />
            </div>
            <p id="loadText" className="load"></p>
        </div>
    )
}