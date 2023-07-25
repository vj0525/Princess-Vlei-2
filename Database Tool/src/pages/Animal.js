import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function AnimalPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/Success', {state:{token_value:location.state.token_value}});
    }
    const navToError = () => {
        navigate('/Error', {state:{token_value:location.state.token_value}})
    }
    const navToOrg = () => {
        navigate('/Organism', {state:{token_value:location.state.token_value}});
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
        const responseSci = await fetch(`https://princessvleiapi.onrender.com/api/organism/noflora?scientific=${data['genus']} ${data['species']}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json",
                    "Token": location.state.token_value},
        });
        const dataSci = await responseSci.json();
        if (dataSci.length !== 0){
            updateMessage(`An organism of this exact genus and species has already been inputted in the database with the common name: ${dataSci[0]['Common_Name']}`)
            document.getElementById("loadText").innerHTML = "";
            return;
        }
        const dataString = JSON.stringify(data).toLowerCase();
        const responseOrg = await fetch('https://princessvleiapi.onrender.com/api/organism', {
            method: 'POST',
            headers: {"Content-Type": "application/json",
                        "Token": location.state.token_value},
            body: dataString
        });
        await responseOrg.json();
        if (!responseOrg.ok){
            navToError();
            return;
        }
        navToSuc();
        return;
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Enter Information on this Animal:</h2>
            <div className="body-div">
                <div className="panels">
                    <form className="quickTest" id="animalForm" onSubmit={(event)=>submitInfo(event)}>
                        <div className='col1'>
                            <h3 className="formAccessories" id="titles">Genus*:</h3>
                            <h3 className="formAccessories" id="titles">Species*:</h3>
                            <h3 className="formAccessories" id="titles">Common Name (if applicable):</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="text" placeholder="Genus" name="genus" required/>
                            <input className="formItems" type="text" placeholder="Species" name="species" required/>
                            <input className="formItems" type="text" placeholder="Common Name" name="common_name"/>
                        </div>
                        <div className='col1'>
                            <h3 className="formAccessories" id="titles">Conservation Status*:</h3>
                            <h3 className="formAccessories" id="titles">Alien Species?*:</h3>
                            <h3 className="formAccessories" id="titles">Invasive Species?*:</h3>
                        </div>
                        <div className='col1'>
                            <select className="formItems" name="conservation_status" form="animalForm">
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
                <button type="submit" form="animalForm" id="submission"><p className="textP">Submit</p></button>
            </div>
            <p id="loadText" className="load"></p>
        </div>
    )
}