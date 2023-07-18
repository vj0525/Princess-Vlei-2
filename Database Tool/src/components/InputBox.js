import React from 'react';
import { useState } from 'react';
import './InputBox.css';
function LetMeCallReactHooks(){
const [searchString, setSearchString] = useState("");
const [searchResult, setSearchResult] = useState([]);
}
//const tableOptions = [];
//const testOptions=['abra', 'doobo', 'dabra', 'bar', 'foo', 'gos', 'sisiai'];
function getAllOptions(page, value){
}
/*
function FindResults(searchKey, tableOptions){
    if (searchKey === "" || tableOptions===[])
        return;
    setSearchResult([]);
    let results = [];
    const pattern = new RegExp(searchString, "gi");
    for (entry of tableOptions){ //entry should already be made to be the specific parameter we're searching for at initialization
        if (pattern.test(entry)){
            results.push(entry)
        }
    }
    setSearchResult(results);
    console.log(results)
}
*/
export default function Input( {value, page="unused", category="text"} ){
    
    return (
        <div className="main-input">
            <p>{value}: </p>
            <input className="input-box" type={category} placeholder={value}
            /*onChange={(e)=>setSearchString(e.target.value)}
            onKeyUp={(e)=>FindResults(e.target.value, testOptions)}*/ />
        </div>
    )
}