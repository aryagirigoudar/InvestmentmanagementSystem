import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [sexf, setSexF] = useState("");
  const [sexm, setSexM] = useState("");
  const [dob, setDob] = useState("");

  const [newsexm, setNewSexM] = useState(0);
  const [newsexf, setNewSexF] = useState(0);
  const [newdob, setNewDob] = useState(0);
  const [newname, setNewName] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  
  const show = () => {
    removetab()
    Axios.get(`http://localhost:3001/inv/mod/${id}`).then((response) => {
      console.log(response.data)
      tableCreate(response.data[0]);
    });
    
  };
  const removetab = ()=>{
    const a = document.getElementById('tab')
    

    for(let i in a)
       a.remove();
  }





  function tableCreate(items) {
    if (Object.keys(items).length === 0)
      return 0;
    let count = 0;
    let index = []


    for (let i in items) {
      for (let j in items[0])
        index.push(j)
      break

    }


    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.setAttribute("id",'tab')
    tbl.style.width = '76%';
    tbl.setAttribute('border', '10');
    var tbdy = document.createElement('tbody');

    

    var tr = document.createElement('tr')
    for (let i in index) {
      var td = document.createElement('th');
      td.appendChild(document.createTextNode(`${index[i]}`))
      tr.appendChild(td)
      tbdy.appendChild(tr)
    }
    tbdy.appendChild(tr)
    for (let i in items) {
      var tr = document.createElement('tr')
      for (let j in items[i]) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(`${items[i][j]}`))
        tr.appendChild(td)
      }
     
     
      tr.appendChild(td)

      tbdy.appendChild(tr)
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);


  }


  return (
    
    <>
    <center>
        <input type='number' placeholder="Enter Max Limit" onChange={(event)=>{
            setId(event.target.value)
        }}/>
        <br></br>
        <br></br>
       

        <button onClick={show}>Show Result</button>
    </center>
      
        
    </>

      
    
  );
}

export default App;
