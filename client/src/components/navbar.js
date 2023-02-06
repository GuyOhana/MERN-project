import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import "./../style.css"
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ direction: "rtl" }}>
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link1" to="/create">
                 הכנס חייל
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link2" to="https://www.idf.il/%D7%90%D7%AA%D7%A8%D7%99-%D7%99%D7%97%D7%99%D7%93%D7%95%D7%AA/%D7%90%D7%92%D7%A3-%D7%94%D7%AA%D7%A7%D7%A9%D7%95%D7%91-%D7%95%D7%94%D7%94%D7%92%D7%A0%D7%94-%D7%91%D7%A1%D7%91-%D7%A8/%D7%9B%D7%9C-%D7%94%D7%9B%D7%AA%D7%91%D7%95%D7%AA/%D7%9B%D7%AA%D7%91%D7%95%D7%AA-%D7%9B%D7%9C%D7%9C%D7%99%D7%95%D7%AA/%D7%9E%D7%9E%D7%A8-%D7%9D/">
                 <img className="logo" src = {require('./../Images/Mamram.png')} />
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}
