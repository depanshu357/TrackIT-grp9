import React, { useState,useEffect } from "react";
import "./AddExpense.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useExpenseContext } from "../hooks/useExpenseContext";
import "./expenseForm.css";
function AddExpense({ setShowPopup, showPopup }) {
  const { expense,dispatch } = useExpenseContext();
  const { user } = useAuthContext();

  const [Item, setItem] = useState("");
  const [MoneySpent, setMoneySpent] = useState("");
  const [Description, setDescription] = useState("");
  const [datum, setDate] = useState("");
  const [Category, setCategory] = useState("Others");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  

  const handleCutButton = () => {
    setShowPopup((e) => !e);
  };

  const options = ["Food", "Health", "Shopping", "Others"];

  useEffect(() => {
    const fetchExpense = async () => {
      const response = await fetch("/api/expense", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EXPENSES", payload: json });
      }
    };

    if (user) {
      fetchExpense();
      console.log(user.rollNo);
    }
  }, [dispatch, user]);

  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let data_to_show;
  let Food = 0;
  let Health = 0;
  let Shopping = 0;
  let Others = 0;
  var date = new Date();
  var current_month = date.getMonth();
  var todays_date = date.getDate();
  var current_year = date.getFullYear();
  var total_data = [];
  var last_ten_days_name = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  var last_ten_days_value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var last_ten_days_data = [];
  var piechart_data = [];
  var bar_graph_progress = 0;
  var total_budget = 20000;
  for (let i = 1; i <= 12; i++) {
    let temp = 0;
    for (let j = 0; expense && j < expense.length; j++) {
      // console.log(expense[j].Date[5] + expense[j].Date[6], current_month);
      if (expense[j].Date[5] + expense[j].Date[6] == current_month + 1) {
        bar_graph_progress += expense[j].MoneySpent;
      }
      if (expense[j].Date[5] + expense[j].Date[6] == i) {
        temp += expense[j].MoneySpent;

        if (todays_date >= 11) {
          if (
            expense[j].Date.substring(0, 4) == current_year &&
            expense[j].Date[5] + expense[j].Date[6] == current_month + 1
          ) {
            if (
              Number(todays_date) - Number(expense[j].Date.substring(8, 10)) <=
                10 &&
              Number(todays_date) - Number(expense[j].Date.substring(8, 10)) > 0
            ) {
              last_ten_days_name[
                10 -
                  (Number(todays_date) -
                    Number(expense[j].Date.substring(8, 10)))
              ] = expense[j].Date.substring(0, 10);
              last_ten_days_value[
                10 -
                  (Number(todays_date) -
                    Number(expense[j].Date.substring(8, 10)))
              ] += expense[j].MoneySpent;
            }
          }
        } else {
          if (
            expense[j].Date.substring(0, 4) == current_year &&
            expense[j].Date[5] + expense[j].Date[6] == current_month + 1
          ) {
            if (
              Number(todays_date) - Number(expense[j].Date.substring(8, 10)) <=
                10 &&
              Number(todays_date) - Number(expense[j].Date.substring(8, 10)) > 0
            ) {
              last_ten_days_name[
                10 -
                  (Number(todays_date) -
                    Number(expense[j].Date.substring(8, 10)))
              ] = expense[j].Date.substring(0, 10);
              last_ten_days_value[
                10 -
                  (Number(todays_date) -
                    Number(expense[j].Date.substring(8, 10)))
              ] += expense[j].MoneySpent;
            }
          } else if (
            expense[j].Date.substring(0, 4) == current_year &&
            expense[j].Date[5] + expense[j].Date[6] == current_month
          ) {
            if (
              current_month == 2 ||
              current_month == 4 ||
              current_month == 6 ||
              current_month == 7 ||
              current_month == 9 ||
              current_month == 11
            ) {
              if (current_month == 2) {
                if (
                  Number(expense[j].Date.substring(8, 10)) >
                  28 - (10 - todays_date + 1)
                ) {
                  last_ten_days_name[
                    28 - Number(expense[j].Date.substring(8, 10)) - 2
                  ] = expense[j].Date.substring(0, 10);
                  last_ten_days_value[
                    28 - Number(expense[j].Date.substring(8, 10)) - 2
                  ] += expense[j].MoneySpent;
                }
              } else {
                if (
                  Number(expense[j].Date.substring(8, 10)) >
                  30 - (10 - todays_date + 1)
                ) {
                  last_ten_days_name[
                    30 - Number(expense[j].Date.substring(8, 10)) - 2
                  ] = expense[j].Date.substring(0, 10);
                  last_ten_days_value[
                    30 - Number(expense[j].Date.substring(8, 10)) - 2
                  ] += expense[j].MoneySpent;
                }
              }
            } else {
              if (
                Number(expense[j].Date.substring(8, 10)) >
                31 - (10 - todays_date + 1)
              ) {
                last_ten_days_name[
                  31 - Number(expense[j].Date.substring(8, 10)) - 2
                ] = expense[j].Date.substring(0, 10);
                last_ten_days_value[
                  31 - Number(expense[j].Date.substring(8, 10)) - 2
                ] += expense[j].MoneySpent;
              }
            }
          }
        }

        if (i == current_month + 1) {
          if (expense[j].Category == "Food") {
            Food += expense[j].MoneySpent;
          }
          if (expense[j].Category == "Health") {
            Health += expense[j].MoneySpent;
          }
          if (expense[j].Category == "Shopping") {
            Shopping += expense[j].MoneySpent;
          }
          if (expense[j].Category == "Others") {
            Others += expense[j].MoneySpent;
          }
        }
      }
    }
    total_data.push({ name: month[i - 1], value: temp });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const expenseS = { Item, MoneySpent, Description, Date, Category };

    const response = await fetch("/api/expense", {
      method: "POST",
      body: JSON.stringify(expenseS),
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
    <div
      className="add-expense-popup"
      style={{ display: showPopup ? "block" : "none" }}
    >
      <form
        className="create-expense-form"
        onSubmit={handleSubmit}
        style={{ display: showPopup ? "block" : "none" }}
      >
        <h3>
          Add a New Purchase
          <span className="add-expense-close-popup" style={{ width: "fit-content", position: "absolute", top: "-5px", right: "-15px", transform: "scale( 1.5 )" }}>
            <img
              src="/images/cross.png"
              alt="close"
              onClick={handleCutButton}
              style={{ cursor: "pointer" }}
            />
          </span>
        </h3>
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
              if(e.target.value > user.budget - Shopping - Others - Food - Health){alert("Entered Amount exceeds your remaining budget")}
          console.log("changed",user.budget, Shopping , Others,Food,Health)
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
            value={datum}
          // className={emptyFields.includes("Date") ? "error" : ""}
          />
        </div>
        <div>
          <label>Category:</label>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option>Please Select a Category</option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        {/* <input type="text"
        value={Category}
        onChange={e => setCategory(e.target.value)}
        className={emptyFields.includes('Category') ? 'error' : ''}
      /> */}
        <div style={{ flexDirection: "row-reverse" }}>
          <button className="add-expense-form">Add To List</button>
          {error && (
            <div className="error" color="red">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
