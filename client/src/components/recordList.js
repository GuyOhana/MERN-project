import React, { useEffect, useState } from "react";
import { Left, Right } from "react-bootstrap/lib/Media";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const Record = (props) => (
 <tr>
    
   <td>{props.record.name}</td>
   <td>{props.record.position}</td>
   <td>{props.record.item}</td>
   {console.log(props.record.numItem)}
   <td>{props.record.numItem}</td>
   <td>{props.record.level}</td>
   <td>{props.record.personalNum}</td>
   <td>
     <Link style= {{color: "purple", textDecoration:"underline"}} to={`/edit/${props.record._id}`}>לשנות</Link> |
     <button style= {{color: "purple", background: "none", border:"none",textDecoration:"underline"}}
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       מחיקה
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const [searchRecords, setSearchRecords] = useState([]);

 //  fetch the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     
     const records = await response.json();
     setRecords(records);
     setSearchRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // map out the searched records on the table
 function recordList() {
  if(!searchRecords.length) return <h2>אין התאמות</h2>
   return searchRecords.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // display the table with the records of individuals.
 return (
   <div style={{ direction: "rtl" }}>
   <SearchBar
      posts = {records}
      setSearchResults = {setSearchRecords}
    />
     <h3 style={{textAlign:"right",margin:"30px" }}>מאגר נתונים</h3>
     <table className="table table-striped table-primary" style={{ textAlign:"right" }}>
       <thead>
         <tr>
           <th>שם</th>
           <th>תפקיד</th>
           <th>שם פריט</th>
           <th>כמות</th>
           <th>דרגה</th>
           <th>מספר אישי</th>
           <th style={{textAlign:"right"}}>פעולה</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}
