import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [sexf, setSexF] = useState("");
  const [sexm, setSexM] = useState("");
  const [dob, setDob] = useState("");
  const [query, setQuery] = useState(0);
  const [newid, setNewId] = useState(0);
  const [newsexm, setNewSexM] = useState(0);
  const [newsexf, setNewSexF] = useState(0);
  const [newdob, setNewDob] = useState(0);
  const [newname, setNewName] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const addEmployee = () => {
    Axios.post("http://localhost:3001/inv/create", 
    {
      name: name,
      id: id,
      sexf: sexf,
      sexm: sexm,
      dob: dob,
      
    }).then((response) => {
      
      if(response.data['sqlMessage'] != undefined)
      alert(response.data['sqlMessage'])
     
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          id: id,
          sexf: sexf,
          sexm: sexm,
          dob: dob,
        },
      ]);
    });

  };

  const getEmployees = () => {
    removetab()
    Axios.get("http://localhost:3001/inv/show").then((response) => {
      
      setEmployeeList(response.data);
      tableCreate(employeeList);
    });
    
  };
  const removetab = ()=>{
    const a = document.getElementById('tab')
    

    for(let i in a)
       a.remove();
  }



  const updateEmployeeWage = (id,q1) => {
    
    Axios.put("http://localhost:3001/inv/update", { id: id, name: newname, sexf: newsexf, sexm: newsexm, dob: newdob, query: q1 }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.invId == id
              ? {
                name: val.invId,
                id: val.name,
                sexf: val.sex,
                sexm: val.sex,
                dob: val.dob,
              }
              : val;
          })
        );
      }
      );
      getEmployees()
      
      
    
  };



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
      ip.setAttribute('id',  `${items[i].invId}`)
      var butt1 = document.createElement('button')
      butt1.innerText="Update"
      butt1.addEventListener(
        'click',
        function () {
          var l =document.getElementById(`${items[i].invId}`);
          updateEmployeeWage(items[i].invId,l.value)
        }
        ,
        false
      );
      var butt2 = document.createElement('button')
      butt2.addEventListener(
        'click',
        function () {
          deleteEmployee(items[i].invId)
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

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/inv/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
    
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <br />
        <br />
        <label>Sex:</label>

        Male:<input
          name="sex"
          type="radio"
          value="mal"

          onChange={(event) => {
            setSexM(event.target.value);
            setSexF(0);

          }}
        />

        female:<input
          type="radio"
          name="sex"
          value="fem"
          onChange={(event) => {
            setSexF(event.target.value);
            setSexM(0);
          }}
        />
        <br />
        <br />
        <label>dob:</label>
        <input
          type="text"
          onChange={(event) => {
            setDob(event.target.value);
            console.log(setDob)
          }}
        />
        <br />
        <br />
        <label>id:</label>
        <input
          type="number"
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <br />
        <br />

        <button onClick={addEmployee}>Add Investor</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Investor</button>

        {/* {employeeList.map((val, key) => {
          return (
            
            <>
            <div className="employee">
              <div>
                <table border={"5"} width={"60%"}>
                  <tr>
                    <th>
                      Name
                    </th>
                    <th>
                      DOB
                    </th>
                    <th>
                      ID
                    </th>
                    <th>
                      Sex
                    </th>
                    <th>
                      UD Operations
                    </th>
                  </tr>
                  <tr>
                    <td>{val['name']}</td>
                    <td>{val['dob']}</td>
                    <td>{val['invId']}</td>
                    <td>{val['sex']}</td>

                    <input
                      type="text"
                      placeholder="Ex:- name = newname"
                      onChange={(event) => {
                        if (event.target.value.match("=")) {
                          var s = event.target.value.split("=");
                          setQuery(event.target.value);
                        }
                      } } />

                    <button
                      onClick={() => {

                        updateEmployeeWage(val.invId);
                      } }
                    >
                      {" "}
                      Update
                    </button>

                    <button
                      onClick={() => {
                        deleteEmployee(val.invId);

                      } }
                    >
                      Delete
                    </button>
                  </tr>

                </table>
              </div>
              <div>
              </div>
            </div><div>

              </div>
            </>



          );
        })} */}
      </div>
    </div>
  );
}

export default App;
