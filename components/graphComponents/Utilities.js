import { useSelector } from "react-redux";
import style from "./Utilities.module.css";
import ExpenseForm from "../expenseComponents/ExpenseForm";
import Donut from "./Donut";


const Utilities = () => {
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  const currMonth = new Date().getMonth();
  const totalExpense = useSelector((state) => state.transaction.totalExpenses);
  const totalIncome = useSelector((state) => state.transaction.totalIncome);
  const expenses = useSelector((state) =>
    state.transaction.transactions.filter(
      (transaction) => transaction.type === "expense"
    )
  );

  const data = {
    labels: [],
    datasets: [
      {
        // label: "Total Expense",
        data: [3, 6],
        backgroundColor: ["rgb(242 246 252)", "rgb(83 227 115)"],
        borderColor: ["transparent", "transparent"],
      },
    ],
  };
  //--------------------------------------------------------------------
  const monthlyExpenses = expenses.reduce((prev, curr) => {
    const expenseMonth = new Date(curr.date).getMonth();
    if (expenseMonth == currMonth) {
      return prev + Number(curr.amount);
    } else {
      return prev + 0;
    }
  }, 0);
  const monthlyData = {
    labels: [],
    datasets: [
      {
        // label: "Total Expense",
        data: [monthlyExpenses, totalExpense - monthlyExpenses],
        backgroundColor: ["rgb(255 148 60)", "rgb(242 246 252)"],
        borderColor: ["transparent", "transparent"],
      },
    ],
  };
  //--------------------------------------------------------
  const totalData = {
    labels: [],
    datasets: [
      {
        // label: "Total Expense",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#53e373", "rgb(242 246 252)"],
        borderColor: ["transparent", "transparent"],
      },
    ],
  };
  //--------------------------------------------------------
  const totalExpenseData = {
    labels: [],
    datasets: [
      {
        // label: "Total Expense",
        data: [totalExpense, totalIncome - totalExpense],
        backgroundColor: ["#fa6467", "rgb(242 246 252)"],
        borderColor: ["transparent", "transparent"],
      },
    ],
  };
  //--------------------------------------------------------
  var curr = new Date();
  var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
  var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));

  const currentDate = new Date(); // Get the current date
  const currentYear = currentDate.getFullYear();
  const currentWeek = getWeekNumber(currentDate);

  const weeklyExpenses = expenses.reduce((prev, curr) => {
    const expenseDate = new Date(curr.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseWeek = getWeekNumber(expenseDate);

    if (expenseYear === currentYear && expenseWeek === currentWeek) {
      return prev + Number(curr.amount);
    } else {
      return prev;
    }
  }, 0);

  function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }
  const weeklyData = {
    labels: [],
    datasets: [
      {
        // label: "Total Expense",
        data: [weeklyExpenses, monthlyExpenses - weeklyExpenses],
        backgroundColor: ["rgb(76 88 103)", "rgb(242 246 252)"],
        borderColor: ["transparent", "transparent"],
      },
    ],
  };
  //--------------------------------------------------------
  const options = {};
  return (
    <div className={style.wrapper}>
      {emailVerified && !!photoUrl && !!userName && <ExpenseForm />}
      <Donut
        className={dark ? style.donutdark : style.donut}
        chartTitle={"Total Income"}
        chartAmount={totalIncome}
        data={totalData}
        options={options}
      />
      <Donut
        className={dark ? style.donutdark : style.donut}
        chartTitle={"Total Expense"}
        chartAmount={totalExpense}
        data={totalExpenseData}
        options={options}
      />
      <Donut
        className={dark ? style.donutdark : style.donut}
        chartTitle={"Monthly Expense"}
        chartAmount={monthlyExpenses}
        data={monthlyData}
        options={options}
      />
      <Donut
        className={dark ? style.donutdark : style.donut}
        chartTitle={"Weekly Expense"}
        chartAmount={weeklyExpenses}
        data={weeklyData}
        options={options}
      />
    </div>
  );
};
export default Utilities;
