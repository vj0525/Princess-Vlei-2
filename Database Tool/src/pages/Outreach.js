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
    function submitInfo(event){
        //To Add, Check that data submits successfully and nav to error if not
        event.preventDefault();
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

    return (
        <div className="main-div">
            <TopBar />
            <h2>Enter the location information from the survey data</h2>
            <div className="body-div">
                <div className="panels" id="titles">
                    <h3 className="formAccessories">Event Type:</h3>
                    <h3 className="formAccessories">School:</h3>
                    <h3 className="formAccessories">School Grade:</h3>
                    <h3 className="formAccessories">Number of Learners:</h3>
                    <h3 className="formAccessories">Average Score:</h3>
                </div>
                <div className="panels">
                    <form className="quickTest" id="educationForm" onSubmit={(event)=>submitInfo(event)}>
                        <input className="formItems" type="text" placeholder="Event Type" name="Event Type" page="Education" />
                        <input className="formItems" type="text" placeholder="School" name="School" page="Education" />
                        <input className="formItems" type="text" placeholder="School Grade" name="School Grade" />
                        <input className="formItems" type="text" placeholder="Number of Learners" name="Number of Learners" />
                        <input className="formItems" type="text" placeholder="Average Score" name="Average Score" />   
                    </form>    
                </div>
            </div>
            
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
                <button type="submit" form="educationForm" id="submission"><p className="textP">Submit</p></button>
            </div>
        </div>
    )
}