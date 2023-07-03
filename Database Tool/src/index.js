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
root.render(
  <React.StrictMode>
    <div className="main-div">
    <img src={topBar} className="topBar" alt="Header for Princess Vlei Application"/>
    {message}
    <Input value="Username" />
    <Input value="Password" />
    <FancyButton title="Log in" />
    {/*
    <div className="button">Survey Data</div>
    <div className="button">Educational Data</div>
    <div className="button">Donation Data</div>
    <div className="button">New Organism</div>
    <div className="button">New Plant</div>
    */}
    </div>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();