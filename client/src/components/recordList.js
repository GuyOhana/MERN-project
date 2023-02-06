import React, { useEffect, useState } from "react";
import { Left, Right } from "react-bootstrap/lib/Media";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const Record = (props) => (
 <tr>
    
   <td>{props.record.name}</td>
   <td>{props.record.position}</td>
   {console.log(props.record.item)}
   <td>{props.record.item}</td>
   <td>{props.record.level}</td>
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

 // This method fetches the records from the database.
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
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
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
 
 // This following section will display the table with the records of individuals.
 return (
   <div style={{ direction: "rtl" }}>
   <SearchBar
      posts = {records}
      setSearchResults = {setSearchRecords}
    />
     <h3 style={{textAlign:"right",margin:"30px" }}>מאגר נתונים</h3>
     <table className="table table-striped table-primary" style={{ marginTop: 20,textAlign:"right" }}>
       <thead>
         <tr>
           <th>שם</th>
           <th>תפקיד</th>
           <th>שם פריט</th>
           <th>דרגה</th>
           <th style={{textAlign:"right",paddingRight:63}}>פעולה</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}
