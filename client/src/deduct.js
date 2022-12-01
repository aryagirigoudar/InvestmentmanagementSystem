import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [transactionId, settransactionId] = useState("");
  const [taxId, settaxId] = useState("");
  const [bankId, setbankId] = useState("");
  const [sexm, setSexM] = useState("");
  const [invoice, setinvoice] = useState("");
  const [query, setQuery] = useState(0);
  const [newtaxId, setNewtaxId] = useState(0);
  const [newsexm, setNewSexM] = useState(0);
  const [newbankId, setNewbankId] = useState(0);
  const [newinvoice, setNewinvoice] = useState(0);
  const [newtransactionId, setNewtransactionId] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const addEmployee = () => {
    Axios.post("http://localhost:3001/ded/create", 
    {
      transactionId: transactionId,
      taxId: taxId,
      bankId: bankId,
      

    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          transactionId: transactionId,
          taxId: taxId,
          bankId: bankId,
          


        },
      ]);
    });

  };

  const getEmployees = () => {
removetab()
    Axios.get("http://localhost:3001/ded/show").then((response) => {
      setEmployeeList(response.data);
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

//     //   function tableCreate() {
//   for (var i = 0; i < 3; i++) {
//     var tr = document.createElement('tr');
//     for (var j = 0; j < 2; j++) {
//       if (i == 2 && j == 1) {
//         break
//       } else {
//         var td = document.createElement('td');
//         td.appendChild(document.createTextNode('\u0020'))
//         i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
//         tr.appendChild(td)
//       }
//     }
//     tbdy.appendChild(tr);
//   }
//   tbl.appendChild(tbdy);
//   body.appendChild(tbl)
// }
// tableCreate();

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
 
  td.appendChild(ip)
  td.appendChild(butt1)

  tr.appendChild(td)

  tbdy.appendChild(tr)
}
tbl.appendChild(tbdy);
body.appendChild(tbl);


}



  const updateEmployeeWage = (taxId,query) => {
    
    Axios.put("http://localhost:3001/ded/update", { taxId: taxId ,transactionId : newtransactionId,bankId:newbankId,sexm:newsexm,invoice:newinvoice, query:query}).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.transactionID == transactionId
              ? {
                transactionId: val.transactionID,
                taxId: val.taxID,
                bankId: val.bankID,
              }
              : val;
          })
        );
      }
    );
    removetab()
  };

  const deleteEmployee = (transactionId) => {
    
    Axios.delete(`http://localhost:3001/ded/delete/${transactionId}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.transactionId != transactionId;
        })
      );
    });
   
    removetab()
  };

  return (
    <div className="App">
      <div className="information">
        <label>taxID:</label>
        <input
          type="number"
          onChange={(event) => {
            settaxId(event.target.value);
          }}
        />
        <br />
        <br />
        

        transactionId:<input
      
          type="number"
          
          onChange={(event) => {
            settransactionId(event.target.value)

          }}
        />
        <br />
        <br />
        <label>bankId</label>
        <input
          type="number"
          onChange={(event) => {
            setbankId(event.target.value);
          }}
        />
        
        <br />
        <br />

        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        
      </div>
    </div>
  );
}

export default App;
