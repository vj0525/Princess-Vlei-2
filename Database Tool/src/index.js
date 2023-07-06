import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Input from './InputBox.js';
import FancyButton from './FancyButton.js';
import topBar from './VleiTopBar.png';
const root = ReactDOM.createRoot(document.getElementById('root'));
let message = (
<h2>Welcome to Princess Vlei Forum!<br />
Please log in with your credentials.</h2>)
let startPage = (
  <div className="main-div">
    <img src={topBar} className="topBar" alt="Header for Princess Vlei Application"/>
    {message}
    <Input value="Username" />
    <Input value="Password" category="password" />
    <FancyButton title="Log in" buttonFunc={()=>LoggingIn()} />
    </div>
)
let introPage = (
    <div className="main-div">
    <img src={topBar} className="topBar" alt="Header for Princess Vlei Application"/>
    <h2>Welcome!<br />
    What type of data would you like to input?</h2>
    <FancyButton title="Organism" buttonFunc={()=>console.log("Hello World")} />
    <FancyButton title="Survey" buttonFunc={()=>console.log("Hello World")} />
    <FancyButton title="Education/Outreach" buttonFunc={()=>console.log("Hello World")} />
    </div>
)
root.render(
  <React.StrictMode>
    {startPage}
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
function LoggingIn(){
  //Write stuff here confirming username and password. If inaccurate, just say wrong password and return
  message = (
    <h2>Welcome!<br />
    What type of data would you like to input?</h2>)
  root.render(
    <React.StrictMode>
      {introPage}
    </React.StrictMode>
  )
  console.log("Hi!")
}