import './InputBox.css';
export default function Input( {value} ){
    return (
        <div className="main-input">
            <input className="input-box" type="text" placeholder={value}/>
        </div>
    )
}