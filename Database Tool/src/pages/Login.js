import FancyButton from '../components/FancyButton';
import TopBar from '../components/TopBar.js';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useState } from 'react';

export default function Login(){
  const navigate = useNavigate();
  let token = "";
    const navToIntro = () => {
      navigate('/intro', {state:{token_value: token}});
    }
    async function logUser(event) {
      event.preventDefault();
      const pandorasBox = new FormData(event.target);
      let data = Object.fromEntries(pandorasBox.entries()); 
      const dataString = JSON.stringify(data).toLowerCase();
      const response = await fetch('https://pv-test.onrender.com/api/user/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: dataString
    });
    const received = await response.json();
    if(response.status === 500){
      document.getElementById("errorText").innerHTML = received.message;
      return;
    }
    else if(response.status === 200){
      token = received.user.token;
      navToIntro();
    }
    else{
      document.getElementById("errorText").innerHTML = "Some unexpected error occured, please try again.";
      return;
    }
    }

  return (

    //Write stuff here confirming username and password. If inaccurate, just say wrong password and return
    <div className="main-div">
        <TopBar />
        <h2>Welcome to Princess Vlei Forum!<br />
        Please log in with your credentials.</h2>
        <div id="login-div">
            <div id="login-panel">
              <form className='' id='loginForm' onSubmit={(event)=>logUser(event)}>
                <input className="formItems" type="text" placeholder="Username" name="username" />
                <input className="formItems" type="password" placeholder="Password" name="password"/>
              </form>
            </div>
        </div>
        <div id="errorText"></div>
        <div>
          <button type="submit" form="loginForm" id="submission"><p className="textP">Submit</p></button>
        </div>
    </div>
  )
}
