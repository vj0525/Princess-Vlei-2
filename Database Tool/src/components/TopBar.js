import logo from "./PVLogo.png"
import "./TopBar.css"
export default function TopBar(){
    return(
        <div className="header">
            <p className="title">PVF Data Entry System</p>
            <img className="logo" src={logo} alt="Princess Vlei Logo" />
        </div>
    )
}