const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
// {
//     name: newname,
//     id: newid,
// .column {
  // <input
  //                     type="text"
  //                     placeholder="Ex:- name = newname"
  //                     onChange={(event) => {
  //                       if (event.target.value.match("=")) {
  //                         var s = event.target.value.split("=");
  //                         setQuery(event.target.value);
  //                       }
  //                     } } />

  //                   <button
  //                     onClick={() => {

  //                       updateEmployeeWage(val.invId);
  //                     } }
  //                   >
  //                     {" "}
  //                     Update
  //                   </button>

  //                   <button
  //                     onClick={() => {
  //                       deleteEmployee(val.invId);

  //                     } }
  //                   >
  //                     Delete
  //                   </button>
  //                 </tr>


//   float: left;
//   width: 50%;
//   padding: 5px;
// }
//     sex: newsex,
//     dob: newdob,
//   }

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "investment",
});

app.post("/inv/create", (req, res) => {
  const name = req.body.name;
  const dob = req.body.dob;
  const sexf = req.body.sexf;
  const sexm = req.body.sexm;
  const id = req.body.id;
  
    var se = ""
    if(sexf == 0)
        se = "m"
    else
        se = "f"
 console.log(dob)
  db.query(
    "insert into invest(invId,name,dob,sex) values (?,?,?,?);",
    [id,name,dob,se],
    (err, result) => {
      if (err) {
        res.send(err)
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log(name,dob,sexf,sexm,id);
  
});
app.post("/rel/create", (req, res) => {
  const name = req.body.uniqueness;
  const dob = req.body.location;
  const sexf = req.body.sexf;
  const sexm = req.body.regNo;
  const id = req.body.price;
    var se = ""
    if(sexf == 0)
        se = "m"
    else
        se = "f"

  db.query(
    "insert into realEstate(regNo,location,uniqueness,price) values (?,?,?,?);",
    [name,id,dob,sexm],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log(dob,id,name,sexm);

});
app.post("/nom/create", (req, res) => {
  const name = req.body.name;
  const sexf = req.body.sexf;
  const sexm = req.body.sexm;
  const age = req.body.age;
    var se = ""
    if(sexf == 0)
        se = "m"
    else
        se = "f"

  db.query(
    "insert into nominee(name,age,sex) values (?,?,?);",
    [name,age,se],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log(name,sexf,sexm);
  
});
app.post("/tax/create", (req, res) => {
  const tax = req.body.taxId;
  const cred = req.body.cred;
  const taxdesc = req.body.taxdesc;
  const invoice = req.body.invoice;
  const invId = req.body.invid;
    console.log();

  db.query(
    "insert into tax(taxId,cred,invoice,status,invId) values (?,?,?,?,?);",
    [tax,cred,invoice,taxdesc,invId]
,    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  
});
app.post("/invest/create", (req, res) => {
  const amt = req.body.amount;
  const realId = req.body.realId;
  const other = req.body.other;
  const stockId = req.body.stockId;
  const invid = req.body.invid;
  

  db.query(
    "insert into investments(regno,stockid,otherAssest,totalInvestment,investorId) values (?,?,?,?,?);",
    [realId,stockId,other,amt,invid]
,    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
  
});
app.post("/sto/create", (req, res) => {
const stockname= req.body.stockname;
const stockid = req.body.stockID;
const qunatity = req.body.quantity;
const type = req.body.type;
const price = req.body.price;

 
  db.query(
    "insert into stocks(stocksId,name,type,quantity,price) values (?,?,?,?,?);",
    [stockid,stockname,type,qunatity,price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  
  
});
app.post("/bank/create", (req, res) => {
const bankid= req.body.bankid;
const name = req.body.name;
const location = req.body.location;


  
  db.query(
    "insert into bank(bankId,location,name) values (?,?,?);",
    [bankid,location,name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  
  
});
app.post("/ded/create", (req, res) => {
const taxId= req.body.taxId;
const bankId = req.body.bankId;
const transactionId = req.body.transactionId;

console.log(taxId,transactionId,bankId)

  
  db.query(
    "insert into deducts(transactionId,taxId,bankId) values (?,?,?);",
    [transactionId,taxId,bankId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  
  
});

app.get("/nom/show", (req, res) => {
    db.query("SELECT * FROM nominee", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});
app.get("/tax/show", (req, res) => {
    db.query("SELECT * FROM tax", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});



app.get("/sto/show", (req, res) => {
  db.query("SELECT * FROM stocks", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
app.get("/inv/show", (req, res) => {
  db.query("SELECT * FROM invest", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/rel/show", (req, res) => {
  db.query("SELECT * FROM realEstate", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
app.get("/ded/show", (req, res) => {
  db.query("SELECT * FROM deducts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/invest/show", (req, res) => {

  db.query("SELECT * FROM investments", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/sto/show", (req, res) => {
  db.query("SELECT * FROM realEstate", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
app.get("/bank/show", (req, res) => {
  db.query("SELECT * FROM bank", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.put("/inv/update", (req, res) => {
  const name = req.body.name;
  const dob = req.body.dob;
  const sexf = req.body.sexf;
  const sexm = req.body.sexm;
  const id = req.body.id;
  console.log(req.body)
  const query = req.body.query;
  var name1 = query.split("=")
  var quer = query.split("=")
  name1=name1[name1.length-1]
  quer = quer[quer.length-2]
  // console.log(quer);
  
  
  var se = ""
  if(sexf == 0)
  se = "m"
  else
  se = "f"
  var q = `update invest set ${quer}=\"${name1}\" where invid = ${id}`;
  
  db.query(
    q,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
    );
    
  });
  app.put("/ded/update", (req, res) => {
    const transactionId = req.body.transactionId;
    const bankId = req.body.bankId;
    const taxId = req.body.taxId;
    const sexm = req.body.sexm;
    const id = req.body.id;
    const query = req.body.query;
    var name1 = query.split("=")
    var quer = query.split("=")
    name1=name1[name1.length-1]
    quer = quer[quer.length-2]
    var q = `update deducts set ${quer}=\"${name1}\" where taxID = ${taxId}`;
    console.log(req.body)
    
    db.query(
      q,
      (err, result) => {
        if (err) {
          console.log(err);
                      } else {
                console.log(result);
            }
        }
    );
        
});
app.put("/nom/update", (req, res) => {
    const name = req.body.name;
    const sexf = req.body.sexf;
    const sexm = req.body.sexm;
    const query = req.body.query;
    var name1 = query.split("=")
    var quer = query.split("=")
    name1=name1[name1.length-1]
    quer = quer[quer.length-2]
    
    
    
    var se = ""
    if(sexf == 0)
    se = "m"
    else
    se = "f"
    var q = `update nominee set ${quer}=\"${name1}\" where name = \"${req.body.name}\";`;

    db.query(
        q,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
        
});
app.put("/sto/update", (req, res) => {
  const stockname= req.body.stockname;
  const stockid = req.body.stockID;
  const qunatity = req.body.quantity;
  const type = req.body.type;
    const query = req.body.query;
    var name1 = query.split("=")
    var quer = query.split("=")
    name1=name1[name1.length-1]
    quer = quer[quer.length-2]
    
    var q = `update stocks set ${quer}=\"${name1}\" where stocksId = \"${stockid}\";`;
    console.log(q)
  

    db.query(
        q,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
        
});
app.put("/bank/update", (req, res) => {
  const bankid= req.body.bankid;
const name = req.body.name;
const location = req.body.location;
    const query = req.body.query;
    var name1 = query.split("=")
    var quer = query.split("=")
    name1=name1[name1.length-1]
    quer = quer[quer.length-2]

    
    var q = `update bank set ${quer}=\"${name1}\" where bankId = \"${bankid}\";`;
    console.log(q,req.body)
  

    db.query(
        q,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
        
});
app.put("/tax/update", (req, res) => {
  const taxId= req.body.taxId;
    const query = req.body.query;
    var name1 = query.split("=")
    var quer = query.split("=")
    name1=name1[name1.length-1]
    quer = quer[quer.length-2]
    console.log(req.body)
    
    var q = `update tax set ${quer}=\"${name1}\" where taxId = \"${taxId}\";`;
    console.log(q)
  

    db.query(
        q,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
        
});
app.put("/rel/update", (req, res) => {
    const name = req.body.name;
    const sexf = req.body.sexf;
    const sexm = req.body.sexm;
    const query = req.body.query;
    var name1 = query.split("=")
    var quer = query.split("=")
    name1=name1[name1.length-1]
    quer = quer[quer.length-2]
    
    
    
    var se = ""
    if(sexf == 0)
    se = "m"
    else
    se = "f"
    var q = `update realEstate set ${quer}=\"${name1}\" where regNo = ${req.body.regNo};`;
    console.log(q)
    db.query(
        q,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
        
});
app.put("/invest/update", (req, res) => {
  console.log(req.body)
  const amt = req.body.amount;
  const regNo = req.body.realId;
  const other = req.body.other;
  const stockId = req.body.stockId;
    const query = req.body.query;
    var name1 = query.split("=")
    var quer = query.split("=")
    name1=name1[name1.length-1]
    quer = quer[quer.length-2]
    var q = `update investments set ${quer}=\"${name1}\" where regNo = ${regNo};`;
    console.log(q)
    db.query(
        q,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
        
});

app.delete("/inv/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM invest WHERE invid = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/nom/delete/:name", (req, res) => {
  const name = req.params.name;
  db.query("DELETE FROM nominee WHERE name = ?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/invest/delete/:name", (req, res) => {
  const name = req.params.name;
  console.log(req.params)
  db.query("DELETE FROM investments WHERE stockId = ?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/sto/delete/:name", (req, res) => {
  const name = req.params.name;
  db.query("DELETE FROM stocks WHERE stocksId = ?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/tax/delete/:name", (req, res) => {
  const name = req.params.name;
  db.query("DELETE FROM tax WHERE taxId = ?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/rel/delete/:regno", (req, res) => {
  const regno = req.params.regno;
  console.log("this",req.params.regno)
  db.query("DELETE FROM realEstate WHERE regNo = ?", [regno], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/bank/delete/:regno", (req, res) => {
  const regno = req.params.regno;
  console.log("this",req.params)
  db.query("DELETE FROM bank WHERE bankId = ?", [regno], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/aggregate/sum", (req, res) => {
  db.query("SELECT count(invId) FROM invest", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
        
        console.log(result)
    }
})
}
);
app.get("/join", (req, res) => {
  db.query("SELECT invest.invId,stocks.stocksId,stocks.price,stocks.name,realEstate.regNo,realEstate.location,realEstate.price as realestateprice FROM investments INNER JOIN stocks ON investments.stockId=stocks.stocksId Inner join realEstate on investments.regno=realEstate.regNo inner join invest where invest.invId = investments.investorId", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
        
        console.log(result)
    }
})
}
);
app.get("/func", (req, res) => {

  db.query("SELECT quantity,price FROM stocks", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
        
        
    }
})
}
);
app.put("/calc", (req, res) => {
  const price = req.body.price
  // const quantity = req.body.quntity
  db.query("select calc(price,quantity)as totalprice from stocks; ", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
        
        console.log(result)
    }
})
}
);
app.get(`/inv/mod/:name`, (req, res) => {
  const price = req.params.name;
  console.log(price)
  db.query("call modi(?)",[price], (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
        console.log(result)
    }
})
}
);
app.put("/query", (req, res) => {
  db.query(req.body.query,(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(result)
    }
  })

}
);
var data = new Array()
app.put("/getage", (req, res) => {
  const n = req.body.res.length
  for(var i=0;i<n;i++)
  {
    console.log(req.body.res[i])
    db.query(req.body.res[i],(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log(result[0])
        data.push(result[0])
      }
    })
  }
}
);
const ages=[];
          
          app.get("/age", (req, res) => {
            db.query("Select dob From invest",(err,result)=>{
              if(err)
              console.log(err)
              else{
                for(let i in result)
                {
                 
                  var q = JSON.stringify( result[i]['dob'])
                  q = q.split("T")
                  let p = `call determineAge(${q[0]})`
                  ages.push(p)
              } 
             
              
              
            }
            res.send(ages)
          });
          })

app.get("/getlol", (req, res) => {
  res.send(data)

}
);
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
