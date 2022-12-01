import React from 'react';
import ReactDOM from 'react-dom/client';
import Investor from './investordb';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Nominee from './nominee';
import RealE from './realestate'
import Stock from './stock'
import Tax from './tax'
import Bank from './bank'
import Dud from './deduct'
import Invest from './investment'
import Sum from './agger_count'
import Query from './query';
import CalAge from './calc_age'
import Join from './join'
import Mod from './modification'

import Fun from './Func'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
  {/* <Home/>
  <Bank /> */}

    {/* <Investor /> */}
    {/* <Nominee /> */}
    {/* <RealE/> 
    <Stock /> */}
  {/* <Tax/> */}
  {/* <Dud/> */}
  {/* <Invest/> */}
  </>
    
    );
if(window.location.href == "http://localhost:3000/inv")
{
  
  root.render(<>
   <Home/>
  <Investor/>
  </>
  )
}
if(window.location.href == "http://localhost:3000/sto")
{
  
  root.render(<>
    <Home/>
   <Stock/>
   </>
   )
}
if(window.location.href == "http://localhost:3000/rel")
{
  
  root.render(<>
    <Home/>
   <RealE/>
   </>
   )
}
if(window.location.href == "http://localhost:3000/nom")
{
  
  root.render(<>
    <Home/>
   <Nominee/>
   </>
   )
  
}
if(window.location.href == "http://localhost:3000/bank")
{
  
  root.render(<>
    <Home/>
    <Bank/>
   </>
   )

}
if(window.location.href == "http://localhost:3000/invest")
{
  
  root.render(<>
    <Home/>
<Invest/>
   </>
   )

}
if(window.location.href == "http://localhost:3000/ded")
{
  
  root.render(<>
    <Home/>
    <Dud/>
   </>
   )

}
if(window.location.href == "http://localhost:3000/tax")
{
  
  root.render(<>
    <Home/>
    <Tax/>
   </>
   )

}
if(window.location.href == "http://localhost:3000/sum")
{
  
  root.render(
  <>
    <Home/>
    <Sum/>
   </>
   )

}
if(window.location.href == "http://localhost:3000/mod")
{
  
  root.render(
  <>
    <Home/>
    <Mod/>
   </>
   )

}
if(window.location.href == "http://localhost:3000/query")
{
  
  root.render(<>
    <Home/>
    <Query />
   </>
   )

}
if(window.location.href == "http://localhost:3000/age")
{
  
  root.render(<>
    <Home/>
    <CalAge />
   </>
   )

}
if(window.location.href == "http://localhost:3000/fun")
{
  
  root.render(<>
    <Home/>
    <Fun />
   </>
   )

}
if(window.location.href == "http://localhost:3000/join")
{
  
  root.render(<>
    <Home/>
    <Join/>
   </>
  )
}
if(window.location.href == "http://localhost:3000/")
{
  
  root.render(<>
    <Home/>
   </>
   )

}




