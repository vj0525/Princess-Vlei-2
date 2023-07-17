import './InputBox.css';
function getAllOptions(page, value){

}
export default function Input( {value, page="unused", category="text"} ){
    
    return (
        <div className="main-input">
            <p>{value}: </p>
            <input className="input-box" type={category} placeholder={value}/>
        </div>
    )
}