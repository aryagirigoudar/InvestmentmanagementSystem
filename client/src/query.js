import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
 
  const [query, setQuery] = useState(0);
 const [res,setres] = useState(0);
 const removetab = ()=>{
   const a = document.getElementById('tab')
   for(let i in a)
      a.remove();
 } 
    const ComputeQuery=()=>{
      removetab()
      console.log("cfear")
        Axios.put("http://localhost:3001/query", {query:query}).then(
            (response) => {
                setres(response.data);
                
                tableCreate(response.data)
            }
            );
            
            
            
            
        }



 
  return (
    <>
    <center>

                <input
                  type="text"
                  placeholder="Ex:- location = newlocation"
                  onChange={(event) => {
                    
                    setQuery(event.target.value)
                    
                  }}
                  />
                    <button onClick={ComputeQuery}>ComputeQuery</button>
                  </center>
                    </>
  )
  function tableCreate(items) {
    //   const body = document.body,
    //   tbl = document.createElement('table');
    //   tbl.style.width = '1000px';
    //   tbl.style.border = '10px solid black';
      let index = []
      console.log(items)
    
      for(let i in items)
      {
        for(let j in items[0])
            index.push(j)
            break

      }


      var body = document.getElementsByTagName('body')[0];
      var tbl = document.createElement('table');
      tbl.setAttribute('id','tab')
      tbl.style.width = '70%';

      tbl.setAttribute('border', '1');
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
for(let i in index)
{
    var td = document.createElement('th');
    td.appendChild(document.createTextNode(`${index[i]}`))
    tr.appendChild(td)
    tbdy.appendChild(tr)
}
for(let i in items)
{
    var tr = document.createElement('tr')
    for(let j in  items[i])
    {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(`${items[i][j]}`))
            console.log(items[i][j])
            tr.appendChild(td)
        }
        tbdy.appendChild(tr)
    }
      
    

      tbl.appendChild(tbdy);
      body.appendChild(tbl);

                
}
}            
                
                
                export default App;
                