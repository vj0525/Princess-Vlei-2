import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function EditPlantPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/Success', {state:{token_value:location.state.token_value}});
    }
    const navToError = () => {
        navigate('/Error', {state:{token_value:location.state.token_value}})
    }
    function back() {
        window.history.back();
    }
    
    async function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();
        document.getElementById("loadText").innerHTML = "Loading...";

        const pandorasBox = new FormData(event.target);
        const plantData = localStorage.getItem("plantKey");
        let data = Object.fromEntries(pandorasBox.entries());
        data["alien"] = data["alien"]==='on';
        data["invasive"] = data["invasive"]==='on';
        
        const plantObj = JSON.parse(plantData);

        Object.entries(data).forEach(([k1, v1]) => {
            Object.entries(plantObj).forEach(([k2, v2]) => {
                if (k1.toLowerCase() == k2.toLowerCase()) {
                    if (!(v1 === "" || v1 === null || v1 === v2 || v1 === "Please choose a status" || v1 === "Please choose a form"
                        || v1 === "Please choose a method" || v1 === "Please choose a type")) {
                        plantObj[k2] = v1;
                    }
                }
            });
        });

        const dataStringOrg = JSON.stringify(plantObj).toLowerCase();
        console.log(dataStringOrg);
        const responseOrg = await fetch('https://princessvleiapi.onrender.com/api/organism/${plantObj.orgID}', {
            method: 'PUT',
            headers: {"Content-Type": "application/json",
                    "Token": location.state.token_value},
            body: dataStringOrg
        });
        const dataWID = await responseOrg.json();
        if (!responseOrg.ok){
            navToError();
            return;
        }
        
        const dataStringFull = JSON.stringify(data);
        const responseFull = await fetch('https://princessvleiapi.onrender.com/api/flora/${plantObj.floraID}', {
            method: 'PUT',
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
                        <select className="formSelect" name="veg_type" form="plantForm">
                            <option>Please choose a type</option>
                            <option>Cape Flats Dune Strandveld</option>
                            <option>Cape Flats Sand Fynbos</option>
                            <option>Cape Flats Freshwater Vegetation</option>
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
                <FancyButton title="Back" buttonFunc={()=>back()} specialty={true} />
                <button type="submit" form="plantForm" id="submission"><p className="textP">Submit</p></button>
            </div>
            <p id="loadText" className="load"></p>
        </div>
    )
}