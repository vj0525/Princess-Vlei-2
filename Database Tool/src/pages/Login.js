import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';
import TopBar from '../components/VleiTopBar.png';
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function Login(){

  const navigate = useNavigate();

    const navToIntro = () => {
      navigate('/intro');
    }

  return (

    //Write stuff here confirming username and password. If inaccurate, just say wrong password and return
    <div className="main-div">
        <img src={TopBar} className="topBar" alt="Header for Princess Vlei Application"/>
        <h2>Welcome to Princess Vlei Forum!<br />
        Please log in with your credentials.</h2>
        <Input value="Username" />
        <Input value="Password" category="password" />
        <FancyButton title="Log in" buttonFunc={navToIntro} />
    </div>
  )
}
