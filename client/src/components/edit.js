import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   position: "",
   level: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     name: form.name,
     position: form.position,
     level: form.level,
     item: form.item
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div style={{direction:"rtl",textAlign:"right"}}>
     <h3 style={{margin:"30px"}}>עדכון השאלה</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">שם: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">תפקיד: </label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="item">פריט: </label>
         <input
           type="text"
           className="form-control"
           id="item"
           value={form.item}
           onChange={(e) => updateForm({ item: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionטוראי"
             value="טוראי"
             checked={form.level === "טוראי"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionטוראי" className="form-check-label">טוראי</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionרב'ט"
             value="רב'ט"
             checked={form.level === "רב'ט"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionרב'ט" className="form-check-label">רב'ט</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionסמל"
             value="סמל"
             checked={form.level === "סמל"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionסמל" className="form-check-label">סמל</label>
       </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="עדכון פרטי חייל"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
