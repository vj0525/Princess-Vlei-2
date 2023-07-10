import FancyButton from '../components/FancyButton';
import Input from '../components/InputBox';


let introPage = (
    <div className="main-div">
    {/* <img src={topBar} className="topBar" alt="Header for Princess Vlei Application"/> */}
    <h2>Welcome!<br />
    What type of data would you like to input?</h2>
    <FancyButton title="Organism" buttonFunc={()=>console.log("Hello World")} />
    <FancyButton title="Survey" buttonFunc={()=>console.log("Hello World")} />
    <FancyButton title="Education/Outreach" buttonFunc={()=>console.log("Hello World")} />
    </div>
)

export default function Intro() {
    return (
        <h1>
            WOW PAGE 2
        </h1>
    )
}