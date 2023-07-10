import React from "react";
import { MenuDropdownButton } from "./MenuDropdownButton";
import { TopBar } from "./TopBar";
import "./style.css";

export const StartPage = () => {
  return (
    <div className="start-page">
      <div className="div-2">
        <div className="overlap-group">
          <TopBar className="top-bar-instance" />
          <MenuDropdownButton className="menu-dropdown-button-instance" />
        </div>
        <h1 className="text-wrapper">What would you like to enter data on?</h1>
        <div className="frame">
          <img className="organism" alt="Organism" src="organism.svg" />
        </div>
        <div className="survey-wrapper">
          <img className="survey" alt="Survey" src="survey.svg" />
        </div>
        <div className="outreach-wrapper">
          <img className="outreach" alt="Outreach" src="outreach.png" />
        </div>
      </div>
    </div>
  );
};


