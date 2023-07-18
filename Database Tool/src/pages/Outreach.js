import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
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
    function submitInfo(){
        //To Add, Check that data submits successfully and nav to error if not
        navToSuc();
    }
    return (
        <div className="main-div">
            <TopBar />
            <h2>Enter the location information from the survey data</h2>
            <Input value="Event Type" page="Education" />
            <Input value="School" page="Education" />
            <Input value="School Grade" />
            <Input value="Number of Learners" />
            <Input value="Average Score" />
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
                <FancyButton title="Submit" buttonFunc={()=>submitInfo()} specialty={true} />
            </div>
        </div>
    )
}