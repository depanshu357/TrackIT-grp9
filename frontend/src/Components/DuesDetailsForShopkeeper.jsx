import React, { useState } from "react";
import { useDuesContext } from "../hooks/useDuesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./borrowings.css";
import "./DueDetails.css"
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// date fns
const { format } = require("date-fns");

const DuesDetailsForShopkeeper = (props) => {
  const { Dues, dispatch } = useDuesContext();
  const { user } = useAuthContext();
  const [Paid, setPaid] = useState(props.due.Paid);
  // console.log(props.due.Paid)
  //  console.log(props.due.Paid)
  const handleChange = async (e) => {
    if(props.due.Paid) return
    console.log(e.target);
    setPaid(!props.due.Paid);
    const due = { Paid: `${!props.due.Paid}` };
    console.log(due);
    const response = await fetch("/api/dues/" + props.due._id, {
      method: "PATCH",
      body: JSON.stringify(due),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (user) {
      // fetchPaidStatus();
    }
    const jsonAp = await response.json();
    console.log(jsonAp);

    if (response.ok) {
      dispatch({ type: "UPDATE_DUES", payload: jsonAp });
    }
    window.location.reload(true);
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/dues/" + props.due._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_DUES", payload: json });
    }
  };

  return (
    <div >
      
      {console.log("working")}
      <div className="entry-display" >
        <div className="date">
          {format(new Date(props.due.createdAt), "dd.MM.yyyy")}
        </div>
        <div className="Description">{props.due.Item}</div>
        <div className="due-details-for-Shopkeeper-right" style={{width:"30%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>

        <div className="amount">{props.due.Amount}</div>
        <button
          onClick={handleChange}
          style={
            props.due.Paid
              ? { backgroundColor: "#4ce353", borderRadius: "5px",padding:"0 5px" }
              : { backgroundColor: "#ff4c2b", borderRadius: "5px",padding:"0 5px" }
          }
        >
          {props.due.Paid ? "Paid" : "Paid"}
        </button>
        <span
          className="material-symbols-outlined delete-button" 
          onClick={handleClick}
          style={{ cursor: "pointer"}}
        > 
        </span>
        </div>

      </div>
      <div class="collapse dep-collapse-box" id={"collapseExample" + props.due._id} >
        <div class="collapse-inside">Description - {props.due.Description} 
        </div>
        <span
          className="material-symbols-outlined delete-button" 
          onClick={handleClick}
          style={{ cursor: "pointer"}}
        > 
        </span>
      </div>
    </div>
  );
};

export default DuesDetailsForShopkeeper;