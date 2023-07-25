import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function OutreachPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/Success', {state:{token_value:location.state.token_value}});
    }
    const navToError = () => {
        navigate('/Error', {state:{token_value:location.state.token_value}})
    }
    const navToNew = () => {
        navigate('/NewData', {state:{token_value:location.state.token_value}});
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
        const dataString = JSON.stringify(data).toLowerCase();
        const responseOrg = await fetch('https://princessvleiapi.onrender.com/api/education', {
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
    }

    return (
        <div className="main-div">
            <TopBar />
            <h2>Enter the Information from the Survey Data:</h2>
            <div className="body-div">
                <div className="panels">
                    <form className="quickTest" id="educationForm" onSubmit={(event)=>submitInfo(event)}>
                        <div className='col1' id="titles">
                            <h3 className="formAccessories">Event Type:</h3>
                            <h3 className="formAccessories">Date</h3>
                            <h3 className="formAccessories">Organization:</h3>
                            <h3 className="formAccessories">School Grade (if applicable):</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="text" placeholder="Event Type" name="event_type" page="Education" />
                            <input className="formItems" type="date" placeholder="Date" name="date" />
                            <input className="formItems" type="text" placeholder="School" name="organization" page="Education" />
                            <input className="formItems" type="number" min="0" max="12" placeholder="School Grade" name="school_grade" />
                            
                        </div>
                        <div className='col1' id="titles">
                            <h3 className="formAccessories">Number of Learners:</h3>
                            <h3 className="formAccessories">Connected with Nature Score:</h3>
                            <h3 className="formAccessories">Learned Score:</h3>
                            <h3 className="formAccessories">Enjoyed Experience Score:</h3>
                        </div>
                        <div className='col1'>
                            <input className="formItems" type="number" min="1" max="1000" placeholder="Number of Learners" name="num_of_learners" />
                            <input className="formItems" type="number" min="0" max="100" placeholder="Connected with Nature Score" name="nature_score" />
                            <input className="formItems" type="number" min="0" max="100" placeholder="Educational Score" name="learn_score" />
                            <input className="formItems" type="number" min="0" max="100" placeholder="Enjoyed Experience Score" name="engagement_score" />
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