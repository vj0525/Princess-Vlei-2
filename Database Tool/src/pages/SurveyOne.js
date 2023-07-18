import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
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
    function submitInfo(){
        //To Add, Check that data submits successfully and nav to error if not
        navToSuc();
    }

    return(
        <div className="main-div">
            <TopBar />
            <h2>Enter the location information from the survey data</h2>
            <Input value="Name of Location" />
            <Input value="HC Score" />
            <Input value="Surface Area (Hectares)" />
            <Input value="Date" />
            <Input value="Amount" />
            <div>
                <FancyButton title="Back" buttonFunc={()=>navToNew()} specialty={true} />
                <FancyButton title="Submit" buttonFunc={()=>submitInfo()} specialty={true} />
            </div>
        </div>
    )
}