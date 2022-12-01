import Axios from "axios";
import "./App.css";
import { useState  } from "react";
const Sum = ()=>{
    var b = document.createElement("h1")
    var cen = document.createElement("center")
    document.body.append(b)
    document.body.append(cen)
    
    const [count, settcount] = useState("");
const getEmployees=()=>{
    Axios.get("http://localhost:3001/aggregate/sum").then((response) => {
        console.log("done")
        b.innerHTML = "Total Number of Investors are "+response.data[0]['count(invId)']
        
       
    })
}
    
    return(
        <>
       <center>
        <button onClick={getEmployees} >Total Investors</button>
       </center>
    </>
        
    )
    
    
};
export default Sum;