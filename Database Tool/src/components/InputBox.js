import './InputBox.css';
export default function Input( {value, category="text"} ){
    
    return (
        <div className="main-input">
            {category==="checkbox" && <p>{value}</p>}<input className="input-box" type={category} placeholder={value}/>
        </div>
    )
}