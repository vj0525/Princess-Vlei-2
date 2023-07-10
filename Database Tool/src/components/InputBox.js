import './InputBox.css';
export default function Input( {value, category="text"} ){
    return (
        <div className="main-input">
            <input className="input-box" type={category} placeholder={value}/>
        </div>
    )
}