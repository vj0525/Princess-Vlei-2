import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function OutreachPage(){
    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/Success');
    }
    const navToError = () => {
        navigate('/Error')
    }
    const navToNew = () => {
        navigate('/NewData');
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
    async function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();

        document.getElementById("loadText").innerHTML = "Loading...";

        const pandorasBox = new FormData(event.target);
        let data = Object.fromEntries(pandorasBox.entries());
        const dataString = JSON.stringify(data).toLowerCase();
        const responseOrg = await fetch('https://pv-test.onrender.com/api/education', {
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
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Enter the Information from the Survey Data:</h2>
            <div className="body-div">
                <div className="panels">
                    <form className="quickTest" id="educationForm" onSubmit={(event)=>submitInfo(event)}>
                        <div className='col1'>
                            <h3 className="formAccessories">Event Type:</h3>
                            <h3 className="formAccessories">School:</h3>
                            <h3 className="formAccessories">School Grade:</h3>
                            <h3 className="formAccessories">Number of Learners:</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="text" placeholder="Event Type" name="event_type" page="Education" />
                            <input className="formItems" type="text" placeholder="School" name="school" page="Education" />
                            <input className="formItems" type="number" min="0" max="12" placeholder="School Grade" name="school_grade" />
                            <input className="formItems" type="number" min="1" max="1000" placeholder="Number of Learners" name="num_of_learners" />
                        </div>
                        <div className='col1'>
                            <h3 className="formAccessories">Average Score:</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="number" min="0.0" max="10.0" placeholder="Average Score" name="avg_score" />
                        </div>
                    </form>    
                </div>
            </div>
            <div id="forErrorMessages">
            </div>
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
                <button type="submit" form="educationForm" id="submission" value="Submit"><p className="textP">Submit</p></button>
            </div>
            <p id="loadText" className="load"></p>
        </div>
    )
}