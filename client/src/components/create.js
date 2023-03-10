import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   position: "",
   level: "",
   item:"",
   numItem: "",
   personalNum: ""
 });
 const navigate = useNavigate();
 
 // update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 //  handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
   
   setForm({ name: "", position: "", level: "",item:"",numItem:""});
   navigate("/");
 }
 
 // display the form that takes the input from the user.
 return (
   <div style={{direction:"rtl", textAlign: "right"}}>
     <h3 style={{margin:"30px"}}>הכנס השאלה חדשה</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">שם</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">תפקיד</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="item">פריט</label>
         <input
           type="text"
           className="form-control"
           id="item"
           value={form.item}
           onChange={(e) => updateForm({ item: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <label htmlFor="numItem">כמות</label>
         <input
           type="text"
           className="form-control"
           id="numItem"
           value={form.numItem}
           onChange={(e) => updateForm({ numItem: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="personalNum">מספר אישי</label>
         <input
           type="text"
           className="form-control"
           id="personalNum"
           value={form.personalNum}
           onChange={(e) => updateForm({ personalNum: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="טוראי"
             value="טוראי"
             checked={form.level === "טוראי"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="טוראי" className="form-check-label">טוראי</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="רב'ט"
             value="רב'ט"
             checked={form.level === "רב'ט"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="רב'ט" className="form-check-label">רב'ט</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="סמל"
             value="סמל"
             checked={form.level === "סמל"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="סמל" className="form-check-label">סמל</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="הכנס חייל"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
