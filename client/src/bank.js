import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [location, setlocation] = useState("");
  const [bankid, setbankid] = useState("");
  const [name, setname] = useState("");
  const [sexm, setSexM] = useState("");
  const [invoice, setinvoice] = useState("");
  const [query, setQuery] = useState(0);
  const [newbankid, setNewbankid] = useState(0);
  const [newsexm, setNewSexM] = useState(0);
  const [newname, setNewname] = useState(0);
  const [newinvoice, setNewinvoice] = useState(0);
  const [newlocation, setNewlocation] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const addEmployee = () => {
    removetab()
    Axios.post("http://localhost:3001/bank/create", 
    {
      location: location,
      bankid: bankid,
      name: name,
     

    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          location: location,
          bankid: bankid,
          name: name,
        


        },
      ]);
    });

  };

  const getEmployees = () => {
    removetab()  
    Axios.get("http://localhost:3001/bank/show").then((response) => {
      setEmployeeList(response.data);
      console.log(response.data)
      tableCreate(employeeList)
      
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
//   const body = document.body,
//   tbl = document.createElement('table');
//   tbl.style.width = '1000px';
//   tbl.style.border = '10px solid black';
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

var td = document.createElement('th');
td.appendChild(document.createTextNode(`UD Operations`))
tr.appendChild(td)
tbdy.appendChild(tr)
for (let i in items) {
  var tr = document.createElement('tr')
  for (let j in items[i]) {
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(`${items[i][j]}`))
    tr.appendChild(td)
  }
  var td = document.createElement('td');
  var ip = document.createElement('input');
  ip.setAttribute('type', 'text')
  ip.setAttribute('id',  `${items[i].bankId}`)
  var butt1 = document.createElement('button')
  butt1.innerText="Update"
  butt1.addEventListener(
    'click',
    function () {
      var l =document.getElementById(`${items[i].bankId}`);
      updateEmployeeWage(items[i].bankId,l.value)
      removetab()
    }
    ,
    false
  );
  var butt2 = document.createElement('button')
  butt2.addEventListener(
    'click',
    function () {
      deleteEmployee(items[i].bankId)
      removetab()
    }
    ,
    false
  );
  butt2.innerText = ("Delete")
  td.appendChild(ip)
  td.appendChild(butt1)
  td.appendChild(butt2)
  tr.appendChild(td)

  tbdy.appendChild(tr)
}
tbl.appendChild(tbdy);
body.appendChild(tbl);


}




  const updateEmployeeWage = (bankid,query) => {

    Axios.put("http://localhost:3001/bank/update", { bankid: bankid ,location : newlocation,name:newname, query:query}).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.bankid == bankid
              ? {
                location: val.location,
                bankid: val.bankid,
                name: val.name,
              }
              : val;
          })
        );
      }
    );
    getEmployees()
   
    
  };

  const deleteEmployee = (bankid) => {
    Axios.delete(`http://localhost:3001/bank/delete/${bankid}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.bankId != bankid;
        })
      );
    });
    
  };

  return (
    <div className="App">
      <div className="information">
        <label>bankid:</label>
        <input
          type="number"
          onChange={(event) => {
            setbankid(event.target.value);
          }}
        />
        <br />
        <br />
        

        location:<input
      
          type="text"
          
          onChange={(event) => {
            setlocation(event.target.value)

          }}
        />
        <br />
        <br />
        <label>name</label>
        <input
          type="text"
          onChange={(event) => {
            setname(event.target.value);
          }}
        />
                <br/>
                <br/>
        <br />
        <br />

        <button onClick={addEmployee}>Add Bank</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Bank</button>

        
       
      </div>
    </div>
  );
}

export default App;
