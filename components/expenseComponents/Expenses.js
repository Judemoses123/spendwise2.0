import style from "./Expenses.module.css";
import { useSelector } from "react-redux";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Papa from "papaparse";
import ExpenseItem from "./ExpenseItem";
const Expenses = () => {
  const dark = useSelector((state) => state.theme.dark);
  const totalExpense = useSelector((state) => state.transaction.totalExpenses);
  const totalIncome = useSelector((state) => state.transaction.totalIncome);
  const isPremium = useSelector((state) => state.profile.isPremium);
  // const expenses = useSelector((state) => state.expense.expenses);
  const transactions = useSelector((state) => state.transaction.transactions);
  const downloadHandler = () => {
    console.log("download");

    const csv = Papa.unparse(transactions);

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className={dark ? `${style.containerDark}` : `${style.container}`}>
      {isPremium && (
        <div className={style.infoBar}>
          <span className={style.expenseValue}>
            Savings: {totalIncome - totalExpense} &#8377;
          </span>
          <button onClick={downloadHandler} className={style.downloadButton}>
            <span>Get Report</span>
            <CloudDownloadIcon />
          </button>
        </div>
      )}
      {transactions.map((item) => {
        return (
          <ExpenseItem
            key={item.id}
            amount={item.amount}
            description={item.description}
            details={item.type === "income" ? item.source : item.category}
            date={item.date}
            id={item.id}
            type={item.type}
          />
        );
      })}
    </div>
  );
};
export default Expenses;
