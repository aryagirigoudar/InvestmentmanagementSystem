import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [taxdesc, settaxdesc] = useState("");
  const [taxId, settaxId] = useState("");
  const [cred, setcred] = useState("");
  const [invid, setinvid] = useState("");
  const [invoice, setinvoice] = useState("");
  const [query, setQuery] = useState(0);
  const [newtaxId, setNewtaxId] = useState(0);
  const [newsexm, setNewSexM] = useState(0);
  const [newcred, setNewcred] = useState(0);
  const [newinvoice, setNewinvoice] = useState(0);
  const [newtaxdesc, setNewtaxdesc] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const addEmployee = () => {
    Axios.post("http://localhost:3001/tax/create", 
    {
      taxdesc: taxdesc,
      taxId: taxId,
      cred: cred,
      invoice: invoice,
      invid:invid

    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          taxdesc: taxdesc,
          taxId: taxId,
          cred: cred,
          invoice: invoice,
          invid:invid


        },
      ]);
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
  ip.setAttribute('id',  `${items[i].taxId}`)
  var butt1 = document.createElement('button')
  butt1.innerText="Update"
  butt1.addEventListener(
    'click',
    function () {
      var l =document.getElementById(`${items[i].taxId}`);
      updateEmployeeWage(items[i].taxId,l.value)
      removetab()
    }
    ,
    false
  );
  var butt2 = document.createElement('button')
  butt2.addEventListener(
    'click',
    function () {
      deleteEmployee(items[i].taxId)
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


  const getEmployees = () => {
    removetab()
    Axios.get("http://localhost:3001/tax/show").then((response) => {
      setEmployeeList(response.data);
      tableCreate(employeeList)

    });
  };



  const updateEmployeeWage = (taxId,query) => {

    Axios.put("http://localhost:3001/tax/update", { taxId: taxId ,taxdesc : newtaxdesc,cred:newcred,sexm:newsexm,invoice:newinvoice, invid:invid,query:query}).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.stocksId == taxId
              ? {
                taxdesc: val.taxdesc,
                taxId: val.taxId,
                cred: val.cred,
                invoice: val.invoice,
                invid:val.invid,
              }
              : val;
          })
        );
      }
    );
    
  };

  const deleteEmployee = (taxId) => {
    
    Axios.delete(`http://localhost:3001/tax/delete/${taxId}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.taxId != taxId;
        })
      );
    });
    console.log(taxId)
    
  };

  return (
    <div className="App">
      <div className="information">
        <label>taxId:</label>
        <input
          type="number"
          onChange={(event) => {
            settaxId(event.target.value);
          }}
        />
        <br />
        <br />
        

        Invoice<input
      
          type="stock"
          
          onChange={(event) => {
            settaxdesc(event.target.value)

          }}
        />
        <br />
        <br />
        <label>Credits</label>
        <input
          type="number"
          onChange={(event) => {
            setcred(event.target.value);
          }}
        />
                <br/>
                <br/>
        <label>Status</label>
        <input
          type="text"
          onChange={(event) => {
            setinvoice(event.target.value);
          }}
        />
        <br />
        <br />
        <label>Investor ID</label>
        <input
          type="number"
          onChange={(event) => {
            setinvid(event.target.value);
          }}
        />
        <br />
        <br />

        <button onClick={addEmployee}>Add Tax Details</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Tax Details</button>

        
      </div>
    </div>
  );
}

export default App;
