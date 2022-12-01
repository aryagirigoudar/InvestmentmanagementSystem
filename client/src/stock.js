import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [stockname, setStockName] = useState("");
  const [stockID, setStockId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setprice] = useState("");
  const [sexm, setSexM] = useState("");
  const [type, setType] = useState("");
  const [query, setQuery] = useState(0);
  const [newStockId, setNewStockId] = useState(0);
  const [newsexm, setNewSexM] = useState(0);
  const [newquantity, setNewQuantity] = useState(0);
  const [newtype, setNewType] = useState(0);
  const [newstockname, setNewStockName] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const addEmployee = () => {
    Axios.post("http://localhost:3001/sto/create", 
    {
      stockname: stockname,
      stockID: stockID,
      quantity: quantity,
      type: type,
      price:price

    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          stockname: stockname,
          stockID: stockID,
          quantity: quantity,
          type: type,
          price:price


        },
      ]);
    });

  };

  const getEmployees = () => {
removetab()
    Axios.get("http://localhost:3001/sto/show").then((response) => {
      setEmployeeList(response.data);
    });
    tableCreate(employeeList)
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
      ip.setAttribute('id',  `${items[i].stocksId}`)
      var butt1 = document.createElement('button')
      butt1.innerText="Update"
      butt1.addEventListener(
        'click',
        function () {
          var l =document.getElementById(`${items[i].stocksId}`);
          updateEmployeeWage(items[i].stocksId,l.value)
        }
        ,
        false
      );
      var butt2 = document.createElement('button')
      butt2.addEventListener(
        'click',
        function () {
          deleteEmployee(items[i].stocksId)
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


  const updateEmployeeWage = (stockID,q1) => {

    Axios.put("http://localhost:3001/sto/update", { stockID: stockID ,stockname : newstockname,quantity:newquantity,sexm:newsexm,price:price,type:newtype, query:q1}).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.stocksId == stockID
              ? {
                stockname: val.stocksId,
                stockID: val.stockname,
                quantity: val.sex,
                sexm: val.sex,
                type: val.type,
                price:price,
              }
              : val;
          })
        );
      }
    );
    
  };

  const deleteEmployee = (stockID) => {
    
    Axios.delete(`http://localhost:3001/sto/delete/${stockID}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.stocksId != stockID;
        })
      );
    });
    removetab()
    getEmployees()
    
    
  };

  return (
    <div className="App">
      <div className="information">
        <label>StockID:</label>
        <input
          type="number"
          onChange={(event) => {
            setStockId(event.target.value);
          }}
        />
        <br />
        <br />
        

        stockname:<input
      
          type="stock"
          
          onChange={(event) => {
            setStockName(event.target.value)

          }}
        />
        <br />
        <br />
        <label>Quantity</label>
        <input
          type="number"
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
                <br/>
                <br/>
        <label>type:</label>
        <input
          type="text"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
        <br />
        <br />
        <label>price:</label>
        <input
          type="number"
          onChange={(event) => {
            setprice(event.target.value);
          }}
        />
        <br />
        <br />

        <button onClick={addEmployee}>Add Stock</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Stocks</button>

        
      </div>
    </div>
  );
}

export default App;
