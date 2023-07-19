import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function AnimalPage(){
    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/Success');
    }
    const navToError = () => {
        navigate('/Error')
    }
    const navToOrg = () => {
        navigate('/Organism');
    }
    async function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();

        document.getElementById("loadText").innerHTML = "Loading...";

        const pandorasBox = new FormData(event.target);
        let data = Object.fromEntries(pandorasBox.entries());
        data["alien"] = data["alien"]==='on';
        data["invasive"] = data["invasive"]==='on';
        const dataString = JSON.stringify(data).toLowerCase();
        console.log(dataString);
        const responseOrg = await fetch('https://pv-test.onrender.com/api/organism', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: dataString
        });
        await responseOrg.json();
        if (!responseOrg.ok){
            navToError();
            return;
        }
        console.log(dataString);
        navToSuc();
        return;
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Enter the data on this animal here:</h2>
            <div className="body-div">
                <div className="panels" id="titles">
                    <h3 className="formAccessories">Genus:</h3>
                    <h3 className="formAccessories">Species:</h3>
                    <h3 className="formAccessories">Common Name:</h3>
                    <h3 className="formAccessories">Conservation Status:</h3>
                    <h3 className="formAccessories">Alien Species?:</h3>
                    <h3 className="formAccessories">Invasive Species?:</h3>
                </div>
                <div className="panels">
                    <form className="quickTest" id="animalForm" onSubmit={(event)=>submitInfo(event)}>
                        <input className="formItems" type="text" placeholder="Genus" name="genus" />
                        <input className="formItems" type="text" placeholder="Species" name="species" />
                        <input className="formItems" type="text" placeholder="Common Name" name="common_name" />
                        <input className="formItems" type="text" placeholder="Conservation Status" name="conservation_status" />
                        <input className="formBox" type="checkbox" placeholder="Alien" name="alien" /> {/*Three options of indigienous, non-invasive alien or invasive alien. Don't allow checkboxes to check invasive but not alien */}
                        <input className="formBox" type="checkbox" placeholder="Invasive" name="invasive" />
                    </form>
                </div>
            </div>
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToOrg()} specialty={true} />
                <button type="submit" form="animalForm" id="submission"><p className="textP">Submit</p></button>
            </div>
            <p id="loadText" class="load"></p>
        </div>
    )
}