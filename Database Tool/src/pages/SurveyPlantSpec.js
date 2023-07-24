import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function SurveyPlantSpecPage(){
    const location = useLocation();
    function makeInputs(num){
        const main = document.getElementById('main-div');
        console.log(main);
        for(let element = 0; element < num; element++){
            let entry = document.createElement('input');
            entry.setAttribute('class','formItems');
            entry.setAttribute('type','text');
            main.appendChild(entry);
        }
    }
    return (
       <div id="some-div">
        <h1>Success</h1>
        <div id="main-div"></div>
       </div>
    )
}
