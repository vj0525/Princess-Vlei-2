import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

export default function SurveyPlantSpecPage(){
    const location = useLocation();
    return (
       <h1>{location.state.count}</h1>
    )
}
