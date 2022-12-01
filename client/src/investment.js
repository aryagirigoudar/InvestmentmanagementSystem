import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [amount, setamount] = useState("");
  const [stockId, setstockId] = useState("");
  const [other, setother] = useState("");
  const [realId, setrealId] = useState("");
  const [invid, setinvid] = useState("");
  const [others, setothers] = useState("");
  const [query, setQuery] = useState(0);
  const [newstockId, setNewstockId] = useState(0);
  const [newrealId, setNewrealId] = useState(0);
  const [newother, setNewother] = useState(0);
  const [newothers, setNewothers] = useState(0);
  const [newamount, setNewamount] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const addEmployee = () => {
    Axios.post("http://localhost:3001/invest/create", {
      amount: amount,
      other: other,
      realId:realId,
      stockId:stockId,
      invid:invid
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          amount: amount,
        other: other,
        realId:realId,
        stockId:stockId,
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
      ip.setAttribute('id',  `${items[i].stockId}`)
      var butt1 = document.createElement('button')
      butt1.innerText="Update"
      butt1.addEventListener(
        'click',
        function () {
          var l =document.getElementById(`${items[i].stockId}`);
          updateEmployeeWage(items[i].stockId,l.value)
          console.log(amount)
        }
        ,
        false
      );
      var butt2 = document.createElement('button')
      butt2.addEventListener(
        'click',
        function () {
          deleteEmployee(items[i].stockId)
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
    Axios.get("http://localhost:3001/invest/show").then((response) => {
      setEmployeeList(response.data);
      tableCreate(employeeList)
    });
  };



  const updateEmployeeWage = (id,q1) => {
    console.log("this ID",id)
    Axios.put("http://localhost:3001/invest/update", { invid:invid,amount : amount,other:newother,realId:id,stockId:stockId, query:q1}).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            console.log("VAL",val)
            return val.stockId == id
            ? {
                amount: amount,
                other: other,
                realId:realId,
                stockId:stockId,
                invid:invid,
              }
              : val;
          })
        );
      }
    );
    getEmployees();
  };

  const deleteEmployee = (id) => {
    console.log(id)
    Axios.delete(`http://localhost:3001/invest/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.stockId != id;
        })
      );
    });
    getEmployees();
  };

  return (
    <div className="App">
      <div className="information">
      <label>amount:</label>
        <input
          type="number"
          onChange={(event) => {
            setamount(event.target.value);
          }}
        />
        <br />
        <br />
        <label>otherAsset:</label>
        <input
          type="text"
          onChange={(event) => {
            setother(event.target.value);
          }}
        />
        <br />
        <br />
        <label>RealEstateID:</label>
        <input
          type="number"
          onChange={(event) => {
            setrealId(event.target.value);
          }}
        />
        <br />
        <br />
        
        <label>stockId:</label>
        <input
          type="number"
          onChange={(event) => {
            setstockId(event.target.value);
          }}
        />
        <br />
        <br />
        <label>investorId:</label>
        <input
          type="number"
          onChange={(event) => {
            setinvid(event.target.value);
          }}
        />
        <br />
        <br />

        <button onClick={addEmployee}>Add investment</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show investment</button>
      </div>
    </div>
  );
}

export default App;
