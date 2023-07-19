import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function SurveyPageOne(){

    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/success');
    }
    const navToError = () => {
        navigate('/Error')
    }
    const navToNew = () => {
        navigate('/NewData');
    }
    function submitInfo(event){
        ///To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();

        document.getElementById("loadText").innerHTML = "Loading...";

        const pandorasBox = new FormData(event.target);
        let data = Object.fromEntries(pandorasBox.entries());
        const dataString = JSON.stringify(data).toLowerCase();
        const dataBody = JSON.parse(dataString);
        fetch('https://pv-test.onrender.com/api/education', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: dataString
        });
        console.log("Aooga");
        console.log(dataString);
        //navToSuc();
    }

    return(
        <div className="main-div">
            <TopBar />
            <h2>Enter the location information from the survey data</h2>
            <div className="body-div">
                <div className="panels" id="titles">
                    <h3 className="formAccessories">Name of Location</h3>
                    <h3 className="formAccessories">HC Score</h3>
                    <h3 className="formAccessories">Surface Area (Hectares)</h3>
                    <h3 className="formAccessories">Date</h3>
                    <h3 className="formAccessories">Amount</h3>
                </div>
                <div className="panels">
                    <form className="quickTest" id="surveyForm" onSubmit={(event)=>submitInfo(event)}>
                        <input className="formItems" type="text" placeholder="Name of Location" name="Name of Location" />
                        <input className="formItems" type="text" placeholder="HC Score" name="HC Score" />
                        <input className="formItems" type="text" placeholder="Surface Area (Hectares)" name="Surface Area (Hectares)" />
                        <input className="formItems" type="text" placeholder="Date" name="Date" />
                        <input className="formItems" type="text" placeholder="Amount" name="Amount" />   
                    </form>    
                </div>
            </div>
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
                <button type="submit" form="surveyForm" id="submission"><p className="textP">Submit</p></button>
            </div>
            <p id="loadText" class="load"></p>
        </div>
    )
}