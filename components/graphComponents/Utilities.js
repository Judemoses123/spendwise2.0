import { useSelector } from "react-redux";
import style from "./Utilities.module.css";
import ExpenseForm from "../expenseComponents/ExpenseForm";
import Donut from "./Donut";

const Utilities = (props) => {
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  const totalExpense = useSelector((state) => state.transaction.totalExpenses);
  const totalIncome = useSelector((state) => state.transaction.totalIncome);
  const expenses = useSelector((state) =>
    state.transaction.transactions.filter(
      (transaction) => transaction.type === "expense"
    )
  );


  const totalData = createDonutData(totalIncome, totalExpense, ["#53e373", "rgb(242 246 252)"]);
  const monthlyExpenses = calculateMonthlyExpenses(expenses);
  const monthlyData = createDonutData(monthlyExpenses, totalExpense - monthlyExpenses, ["rgb(255 148 60)", "rgb(242 246 252)"]);
  const totalExpenseData = createDonutData(totalExpense, totalIncome - totalExpense, ["#fa6467", "rgb(242 246 252)"]);
  const weeklyExpenses = calculateWeeklyExpenses(expenses);
  const weeklyData = createDonutData(weeklyExpenses, monthlyExpenses - weeklyExpenses, ["rgb(76 88 103)", "rgb(242 246 252)"]);

  const options = {};

  return (
    <div className={props.showForm ? style.wrapper : style.wrapperWithoutForm}>
      {emailVerified && !!photoUrl && !!userName && props.showForm && <ExpenseForm />}
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


function createDonutData(dataValue, remainingValue, backgroundColor) {
  return {
    labels: [],
    datasets: [
      {
        data: [dataValue, remainingValue],
        backgroundColor,
        borderColor: ["transparent", "transparent"],
      },
    ],
  };
}

function calculateMonthlyExpenses(expenses) {
  const currMonth = new Date().getMonth();
  return expenses.reduce((prev, curr) => {
    const expenseMonth = new Date(curr.date).getMonth();
    return prev + (expenseMonth === currMonth ? Number(curr.amount) : 0);
  }, 0);
}

function calculateWeeklyExpenses(expenses) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentWeek = getWeekNumber(currentDate);

  return expenses.reduce((prev, curr) => {
    const expenseDate = new Date(curr.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseWeek = getWeekNumber(expenseDate);

    return prev + (expenseYear === currentYear && expenseWeek === currentWeek ? Number(curr.amount) : 0);
  }, 0);
}

function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
