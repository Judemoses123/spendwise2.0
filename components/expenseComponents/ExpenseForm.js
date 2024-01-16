import { useRef, useState } from "react";
import style from "./ExpenseForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import activatePremiumAsync from "../../Store/asyncThunk/activatePremiumAsync";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import addTransactionAsync from "../../Store/asyncThunk/addTransactionAsync";
const ExpenseForm = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dateInputRef = useRef();
  const SourceInputRef = useRef();
  const dispatch = useDispatch();
  // const totalExpense = useSelector((state) => state.expense.totalExpense);
  // const expenseLimit = useSelector((state) => state.expense.expenseLimit);
  const isPremium = useSelector((state) => state.profile.isPremium);
  const sumbitExpenseHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const expenseObject = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
      date: enteredDate,
      type: "expense",
    };
    console.log(expenseObject);
    dispatch(addTransactionAsync(expenseObject));
    toggleShow();
  };

  const submitIncomeHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredSource = SourceInputRef.current.value;
    const incomeObject = {
      amount: enteredAmount,
      description: enteredDescription,
      source: enteredSource,
      date: enteredDate,
      type: "income",
    };
    dispatch(addTransactionAsync(incomeObject));
    console.log(incomeObject);
    toggleShow();
  };

  const premiumHandler = () => {
    console.log("premium");
    dispatch(activatePremiumAsync());
  };

  const dark = useSelector((state) => state.theme.dark);
  const [showForm, setShowForm] = useState(false);
  const [expenseMode, setExpenseMode] = useState(true);
  const toggleShow = () => {
    setShowForm((prev) => !prev);
  };

  const curr = new Date();
  const date = curr.toISOString().substring(0, 10);

  const expenseHandler = () => {
    toggleShow();
    setExpenseMode(true);
  };

  const incomeHandler = () => {
    toggleShow();
    setExpenseMode(false);
  };

  return (
    <div
      className={showForm ? style.form : style.minimizeForm}
      style={{ background: dark ? "black" : "white" }}
    >
      {showForm && (
        <>
          <CloseIcon
            onClick={toggleShow}
            className={style.CloseIcon}
            style={{ color: dark && "white" }}
          />
          <input
            type="date"
            className={dark ? style.dateInputDark : style.dateInput}
            defaultValue={date}
            ref={dateInputRef}
          ></input>
          <div className={style.inputContainer}>
            <input
              ref={amountInputRef}
              placeholder="Amount"
              className={style.input}
              type="number"
              style={{ backgroundColor: dark ? "rgb(200, 200, 200)" : "" }}
            ></input>
          </div>
          <div className={style.inputContainer}>
            <input
              ref={descriptionInputRef}
              placeholder="Notes"
              className={style.input}
              type="text"
              style={{ backgroundColor: dark ? "rgb(200, 200, 200)" : "" }}
            ></input>
          </div>
          <div className={style.inputContainer}>
            {!expenseMode && (
              <input
                ref={SourceInputRef}
                placeholder="From"
                className={style.input}
                type="text"
                style={{ backgroundColor: dark ? "rgb(200, 200, 200)" : "" }}
              ></input>
            )}
            {expenseMode && (
              <select
                ref={categoryInputRef}
                className={style.input}
                placeholder="Category"
                style={{ backgroundColor: dark ? "rgb(200, 200, 200)" : "" }}
              >
                <option value="Other">Category</option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Education">Education</option>
                <option value="Debt Payments">Debt Payments</option>
                <option value="Savings and Investments">
                  Savings and Investments
                </option>
                <option value="Gifts and Donations">Gifts and Donations</option>
                <option value="Insurance">Insurance</option>
                <option value="Taxes">Taxes</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            )}
          </div>
          {
            <button
              onClick={expenseMode ? sumbitExpenseHandler : submitIncomeHandler}
              className={expenseMode ? style.expense : style.income}
            >
              {expenseMode ? "ADD EXPENSE" : " ADD INCOME"}
            </button>
          }
        </>
      )}
      {!showForm && (
        <>
          <button onClick={incomeHandler} className={style.income}>
            <AddIcon /> Add Income
          </button>
          <button onClick={expenseHandler} className={style.expense}>
            <RemoveIcon /> Add Expense
          </button>
        </>
      )}
    </div>
  );
};
export default ExpenseForm;
