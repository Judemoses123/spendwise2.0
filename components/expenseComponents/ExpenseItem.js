import style from "./ExpenseItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import editTransactionAsync from "@/Store/asyncThunk/editTransactionAsync";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import removeTransactionsAsync from "../../Store/asyncThunk/removeTransactionsAsync";
const ExpenseItem = (props) => {
  const dark = useSelector((state) => state.theme.dark);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const sourceRef = useRef();
  const dateRef = useRef();
  const dispatch = useDispatch();
  const editHandler = () => {
    setShowEditor((prev) => {
      if (prev === true) {
        const data = {
          amount: amountRef.current.value,
          description: descriptionRef.current.value,
          date: dateRef.current.value,
          id: props.id,
          type: props.type,
          category: categoryRef.current && categoryRef.current.value,
          source: sourceRef.current && sourceRef.current.value,
        };
        console.log(data);
        dispatch(editTransactionAsync(data));
        hideOption();
        return false;
      } else {
        return true;
      }
    });
  };
  const deleteHandler = () => {
    dispatch(removeTransactionsAsync({ id: props.id, amount: props.amount }));
    hideOption();
  };
  const [showEditor, setShowEditor] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };
  const showOption = () => {
    setShowOptions(true);
  };
  const hideOption = () => {
    setShowOptions(false);
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
          <>
            <div
              className={style.date}
              style={{
                fontSize: "0.8rem",
                letterSpacing: "1px",
                color: dark ? " white" : "dimgrey",
              }}
            >
              <b>
                {new Date(props.date).toLocaleDateString().replace(" ", ", ")}
              </b>
            </div>
            <div className={style.category}>
              {props.type == "expense" ? props.category : props.source}
            </div>
            <div className={style.description}>{props.description}</div>
            <div
              className={style.amount}
              style={{
                color: props.type === "income" ? "#53e373" : "#fa6467",
              }}
            >
              <b>&#8377; {props.amount} </b>
            </div>
          </>
        )}

        {showEditor && (
          <>
            <input
              defaultValue={props.date}
              ref={dateRef}
              className={style.input}
              type="date"
            ></input>
            {props.type == "income" ? (
              <input
                defaultValue={props.source}
                ref={sourceRef}
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
            )}
            <input
              defaultValue={props.description}
              ref={descriptionRef}
              className={style.input}
            ></input>
            <input
              defaultValue={props.amount}
              placeholder={props.amount}
              ref={amountRef}
              className={style.input}
            ></input>
          </>
        )}

        {props.editable && (
          <div className={style.moreDrawer}>
            <button
              className={style.moreDrawerButton}
              onClick={toggleShowOptions}
              style={{ color: dark ? "white" : "" }}
            >
              <MoreVertIcon />
            </button>
            {showOptions && (
              <div
                className={style.overlay}
                style={{
                  backgroundColor: dark ? "black" : "white",
                  color: dark ? "white" : "black",
                }}
              >
                <span>Options</span>
                <button
                  name="menu"
                  onClick={editHandler}
                  className={style.edit}
                >
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
        )}
        <div className={style.filler}></div>
      </div>
    </>
  );
};
export default ExpenseItem;
