import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import { useEffect } from 'react';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function SurveyPlantSpecPage(){
    const location = useLocation();

    const navigate = useNavigate();

    const navToSuc = () => {
        navigate('/success', {state:{token_value:location.state.token_value}});
    }
    const navToError = () => {
        navigate('/error', {state:{token_value:location.state.token_value}})
    }
    const navToSurvPlant = () => {
        navigate('/surveyplant', {state:{token_value:location.state.token_value}});
    }

    function makeInputs(num){
        const main = document.getElementById('column');
        main.innerHTML = "";
        console.log(main);
        console.log(num);
        for(let element = 0; element < num; element++){
            let entry = document.createElement('input');
            entry.setAttribute('class','formItems');
            entry.setAttribute('type','text');
            entry.setAttribute('placeholder',`Species #${element+1}`);
            entry.setAttribute('name',`connection-${element}`);
            main.appendChild(entry);
        }
    }
    async function submitInfo(event){
        event.preventDefault();
        return;
    }
    useEffect(()=>{
        makeInputs(location.state.count);
    })
    return (
        <div className="main-div">
        <TopBar />
        <h2>Enter as many species as you recognized:</h2>
        <div className="body-div" >
            <div className="panels">
                <form className="quickTest" id="surveyForm" onSubmit={(event)=>submitInfo(event)}>
                    <div id='column'>
                    </div>
                </form>    
            </div>
        </div>
        <div>
            <FancyButton title="Back" buttonFunc={()=>navToSurvPlant()} specialty={true} />
            <button type="submit" form="surveyForm" id="submission"><p className="textP">Submit</p></button>
        </div>
        <p id="loadText" className="load"></p>
    </div>
    )
}