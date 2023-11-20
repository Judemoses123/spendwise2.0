import style from "./ExpenseItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useContext, useRef, useState } from "react";
import editExpensesAsync from "../../Store/asyncThunk/editExpensesAsync";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import removeTransactionsAsync from "../../Store/asyncThunk/removeTransactionsAsync";
const ExpenseItem = (props) => {
  const dark = useSelector((state) => state.theme.dark);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();
  const dispatch = useDispatch();
  const editHandler = () => {
    setShowEditor((prev) => {
      if (prev === true) {
        const data = {
          amount: amountRef.current.value,
          description: descriptionRef.current.value,
          details: categoryRef.current.value,
          date: dateRef.current.value,
          id: props.id,
        };
        console.log(data);
        dispatch(editExpensesAsync(data));
        return false;
      } else {
        return true;
      }
    });
  };
  const deleteHandler = () => {
    dispatch(removeTransactionsAsync({ id: props.id, amount: props.amount }));
    console.log("props", props.id);
  };
  const [showEditor, setShowEditor] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <>
      <div
        className={style.main}
        style={{
          background: dark ? "black" : "",
          borderBottom: dark ? "1px solid #3b3b3b" : "1px solid #dddddd ",
        }}
      >
        {!showEditor && (
          <div
            className={style.date}
            style={{ fontSize: "0.9rem", color: dark ? " white" : "dimgrey" }}
          >
            <b>{props.date}</b>
          </div>
        )}
        {!showEditor && <div className={style.category}>{props.details}</div>}
        {!showEditor && (
          <div className={style.description}>{props.description}</div>
        )}
        {!showEditor && (
          <div
            className={style.amount}
            style={{
              color: props.type === "income" ? "#53e373" : "#fa6467",
            }}
          >
            <b>{props.amount} &#8377;</b>
          </div>
        )}
        {showEditor && (
          <input
            defaultValue={props.date}
            ref={dateRef}
            className={style.input}
            type="date"
          ></input>
        )}
        {showEditor &&
          (props.type == "income" ? (
            <input
              defaultValue={props.source}
              ref={dateRef}
              className={style.input}
              type="text"
            ></input>
          ) : (
            <select
              defaultValue={props.category}
              placeholder={props.category}
              ref={categoryRef}
              className={style.input}
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
          ))}

        {showEditor && (
          <input
            defaultValue={props.description}
            ref={descriptionRef}
            className={style.input}
          ></input>
        )}
        {showEditor && (
          <input
            defaultValue={props.amount}
            placeholder={props.amount}
            ref={amountRef}
            className={style.input}
          ></input>
        )}
        <div className={style.moreDrawer}>
          <button
            className={style.moreDrawerButton}
            onClick={toggleShowOptions}
            style={{ color: dark ? "white" : "" }}
          >
            <MoreVertIcon />
          </button>
          {showOptions && (
            <div className={style.overlay}>
              <span>Options</span>
              <button onClick={editHandler} className={style.edit}>
                {showEditor ? (
                  "Submit"
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    <EditIcon /> Edit
                  </div>
                )}
              </button>
              <button onClick={deleteHandler} className={style.delete}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "1rem",
                  }}
                >
                  <DeleteIcon />
                  Delete
                </div>
              </button>
            </div>
          )}
        </div>
        <div className={style.filler}></div>
      </div>
    </>
  );
};
export default ExpenseItem;
