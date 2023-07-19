import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';


export default function SurveyOnePage(){

    const navigate = useNavigate();

    const navToPlant = () => {
        navigate('/surveyplant');
    }

    const navToAni = () => {
        navigate('/surveyanimal');
    }
    
    const navToNew = () => {
        navigate('/NewData');
    }
<<<<<<< HEAD
=======
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
>>>>>>> dec64ba2e00dbf2443c9ad6152d45aedb167570e

    return (
        <div className="main-div">
            <TopBar />
            <h2>What type of organism do you have survey data on?</h2>
            <FancyButton title="Plant" buttonFunc={()=>navToPlant()}/>
            <FancyButton title="Animal" buttonFunc={()=>navToAni()} />
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
            </div>
            <p id="loadText" class="load"></p>
        </div>
    )
}