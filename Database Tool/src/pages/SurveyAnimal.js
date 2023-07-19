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
    async function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();
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
            console.log("nothing doing");
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
            <h2>Enter the information you'd like to provide</h2>
            <div className="body-div">
                <div className="panels" id="titles">
                    <h3 className="formAccessories">Common Name:</h3>
                    <h3 className="formAccessories">Date:</h3>
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
        </div>
    )
}