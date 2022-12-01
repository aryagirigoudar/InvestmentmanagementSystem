import Axios from "axios";
import { useState } from "react";
import { json} from "react-router-dom";
const CA = ()=>{
    const [query, setQuery] = useState(0);
    const [res,setres] = useState(0);
    var h = document.createElement('h1')
      
    const Update=()=>{
        const prices = new Object();
        const a  = document.createElement("h1")
               
                    Axios.put("http://localhost:3001/calc",{}).then(
                        (response) => {
                            
                                console.log(response.data)
                                tableCreate(response.data)
                        }

                              )
                
                
                
           
            // Axios.get("http://localhost:3001/getlol").then(
            //     (response) => {
            //         var r = response.data
            //         console.log(response.data)
            //         for(let i in r)
            //         {
            //             console.log(r[i][0]['FLOOR(DATEDIFF(NOW(), DATE(birthdate))/365)'])
            //             tableCreate(response.data[i])
            //         }
            //         // console.log(r.lastIndexOf("FLOOR(DATEDIFF(NOW(), DATE(birthdate))/365)"))
            //         // console.log(r[417]) procdeure,join,triggers,crud
                    
                   
            //     }
                // );
       }   
    const ComputeAge=()=>{
       }   
    
    //    ["[[{\"FLOOR(DATEDIFF(NOW(), DATE(birthdate))/365)\":0}],{\"fieldCount\":0,\"affectedRows\":0,\"insertId\":0,\"serverStatus\":2,\"warningCount\":0,\"message\":\"\",\"protocol41\":true,\"changedRows\":0}]","[[{\"FLOOR(DATEDIFF(NOW(), DATE(birthdate))/365)\":0}],{\"fieldCount\":0,\"affectedRows\":0,\"insertId\":0,\"serverStatus\":2,\"warningCount\":0,\"message\":\"\",\"protocol41\":true,\"changedRows\":0}]","[[{\"FLOOR(DATEDIFF(NOW(), DATE(birthdate))/365)\":59}],{\"fieldCount\":0,\"affectedRows\":0,\"insertId\":0,\"serverStatus\":2,\"warningCount\":0,\"message\":\"\",\"protocol41\":true,\"changedRows\":0}]"]




       return (
        <>
                    
                        
                        {/* <button onClick={ComputeQuery}>GETAGE</button>
                        <button onClick={ComputeAge}>SHOWAGE</button> */}
                        <center>

                        <button onClick={Update}>Update</button>
                        
                        </center>
                        </>
      )
      
      function tableCreate(items) {
        
          let index = []
        
          for(let i in items)
          {
            for(let j in items[0])
                index.push(j)
                break
    
          }
    
    
          var body = document.getElementsByTagName('body')[0];
          var tbl = document.createElement('table');
          tbl.style.width = '50%';
          tbl.setAttribute('border', '1');
          var tbdy = document.createElement('tbody');
    
    {
    
    
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
                
                tr.appendChild(td)
            }
            tbdy.appendChild(tr)
        }
          
        
    
          tbl.appendChild(tbdy);
          body.appendChild(tbl);
    
                    
    }
    }            

}           
                
                
export default CA;
                