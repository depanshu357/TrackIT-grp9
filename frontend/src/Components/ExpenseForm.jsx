import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useExpenseContext } from "../hooks/useExpenseContext";
import "./expenseForm.css";

const ExpenseForm = ({Budget,Food,Health,Shopping,Others}) => {
  const { dispatch } = useExpenseContext();
  const { user } = useAuthContext();

  const [Item, setItem] = useState("");
  const [MoneySpent, setMoneySpent] = useState("");
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState("");
  const [Category, setCategory] = useState("Others");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const options = ["Food", "Health", "Shopping", "Others"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const expense = { Item, MoneySpent, Description, Date, Category };

    const response = await fetch("/api/expense", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      dispatch({ type: "CREATE_EXPENSE", payload: json });
      setItem("");
      setMoneySpent("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
    }
  };

  return (
    <form className="create-expense-form" onSubmit={handleSubmit}>
      <h3>Add a New Purchase</h3>
      <div>
        <label>Expense Details:</label>
        <input
          type="text"
          onChange={(e) => setItem(e.target.value)}
          value={Item}
        // className={emptyFields?.includes("Item") ? "error" : ""}
        />
      </div>
      <div>
        <label>Money Spent:</label>
        <input
          type="number"
          onChange={(e) =>{
            if(e.target.value > Budget - Shopping - Others - Food - Health){alert("Entered Amount exceeds your remaining budget")}
        console.log("changed",Budget, Shopping , Others,Food,Health)
            setMoneySpent(Math.abs(e.target.value==0?1:e.target.value))}}
          value={MoneySpent}
        // className={emptyFields.includes("MoneySpent") ? "error" : ""}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={Description}
        // className={emptyFields.includes("Description") ? "error" : ""}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={Date}
        // className={emptyFields.includes("Date") ? "error" : ""}
        />
      </div>
      <div>
        <label>Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} style={{backgroundColor:"black",color:"white"}}>
          <option style={{backgroundColor:"black",color:"white"}}>Please Select a Category</option>
          {options.map((option, index) => {
            return <option key={index} style={{backgroundColor:"black",color:"white"}}>{option}</option>;
          })}
        </select>
      </div>
      {/* <input type="text"
        value={Category}
        onChange={e => setCategory(e.target.value)}
        className={emptyFields.includes('Category') ? 'error' : ''}
      /> */}
      <div style={{ flexDirection: "row-reverse" }}>

        <button className="add-expense-form" >Add To List</button>
        {error && <div className="error" color="red">{error}</div>}
      </div>
    </form>
  );
};

export default ExpenseForm;
