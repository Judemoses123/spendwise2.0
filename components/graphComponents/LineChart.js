import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import style from "./LineChart.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function getMonthLength(monthNumber) {
  if (monthNumber < 1 || monthNumber > 12) {
    return "Invalid month number";
  }
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[monthNumber - 1];
}
const LineChart = (props) => {
  const dark = useSelector((state) => state.theme.dark);
  const transactions = useSelector((state) => state.transaction.transactions);

  const [mode, setMode] = useState("week");
  const [expenseData, setExpenseData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [incomeData, setIncomeData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [maxValue, setMaxValue] = useState(0);
  const [maxIncomeValue, setMaxIncomeValue] = useState(0);
  const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState([]);
  const [montlyMaxExpenseValue, setMontlyMaxExpenseValue] = useState(0);
  const [montlyMaxIncomeValue, setMontlyMaxIncomeValue] = useState(0);
  const [stats, setStats] = useState(0);
  const weekHandler = () => setMode("week");
  const monthHandler = () => setMode("month");
  const [totalWeeklyIncome, setTotalWeeklyIncome] = useState(0);
  const [totalWeeklyExpense, setTotalWeeklyExpense] = useState(0);
  const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0);
  const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);
  const getWeeklyData = (type) => {
    const today = new Date();
    const mondayBefore = new Date(today);
    mondayBefore.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    const weeklyData = Array(7).fill(0);
    let maxValue = 0;
    let expense = 0;
    let income = 0;
    for (let i = 0; i < 7; i++) {
      const searchDate = new Date(mondayBefore);
      searchDate.setDate(mondayBefore.getDate() + i);

      const value = transactions.reduce((prev, curr) => {
        const currDate = new Date(curr.date);
        if (
          searchDate.getDate() === currDate.getDate() &&
          searchDate.getMonth() === currDate.getMonth() &&
          searchDate.getFullYear() === currDate.getFullYear() &&
          curr.type === type
        ) {
          return prev + Number(curr.amount);
        }
        return prev;
      }, 0);
      if (type == "expense") expense += Number(value);
      if (type == "income") income += Number(value);

      weeklyData[i] = value;
      maxValue = Math.max(value, maxValue);
    }
    // setTotalWeeklyExpense(expense);
    // console.log(expense);
    // setTotalWeeklyIncome(income);
    // console.log(income);

    return {
      data: weeklyData,
      max: maxValue,
      expense: expense,
      income: income,
    };
  };

  const getMonthlyData = (type) => {
    const today = new Date();
    const firstOfMonth = new Date(today);
    firstOfMonth.setDate(today.getDate() - today.getDate() + 1);

    const monthlyData = [];
    let maxValue = 0;
    const searchDate = new Date(firstOfMonth);
    let expense = 0;
    let income = 0;
    while (searchDate.getMonth() === today.getMonth()) {
      const value = transactions.reduce((prev, curr) => {
        const currDate = new Date(curr.date);
        if (
          searchDate.getDate() === currDate.getDate() &&
          searchDate.getMonth() === currDate.getMonth() &&
          searchDate.getFullYear() === currDate.getFullYear() &&
          curr.type === type
        ) {
          return prev + Number(curr.amount);
        }
        return prev;
      }, 0);

      if (type == "expense") expense += Number(value);
      if (type == "income") income += Number(value);
      monthlyData.push(value);
      maxValue = Math.max(value, maxValue);
      searchDate.setDate(searchDate.getDate() + 1);
    }
    // setTotalMonthlyExpense(expense);
    // console.log(totalMonthlyExpense);
    // setTotalMonthlyIncome(income);
    // console.log(totalMonthlyIncome);

    return {
      data: monthlyData,
      max: maxValue,
      expense: expense,
      income: income,
    };
  };

  useEffect(() => {
    if (!transactions) return;

    const {
      data: weeklyExpenseData,
      max: maxExpenseValue,
      expense: totalWeeklyExpense,
      income: dummyWeeklyIncome,
    } = getWeeklyData("expense");
    const {
      data: weeklyIncomeData,
      max: maxIncomeValue,
      expense: dummyWeeklyExpense,
      income: totalWeeklyIncome,
    } = getWeeklyData("income");

    setExpenseData(weeklyExpenseData);
    setIncomeData(weeklyIncomeData);
    setMaxValue(maxExpenseValue);
    setMaxIncomeValue(maxIncomeValue);
    setTotalWeeklyExpense(totalWeeklyExpense);
    setTotalWeeklyIncome(totalWeeklyIncome);

    const {
      data: monthlyExpenseData,
      max: montlyMaxExpenseValue,
      expense: totalMonthlyExpense,
      income: dummyMonthlyIncome,
    } = getMonthlyData("expense");
    const {
      data: monthlyIncomeData,
      max: montlyMaxIncomeValue,
      expense: dummyMonthlyExpense,
      income: totalMonthlyIncome,
    } = getMonthlyData("income");

    setMonthlyExpenseData(monthlyExpenseData);
    setMonthlyIncomeData(monthlyIncomeData);
    setMontlyMaxExpenseValue(montlyMaxExpenseValue);
    setMontlyMaxIncomeValue(montlyMaxIncomeValue);
    setTotalMonthlyExpense(totalMonthlyExpense);
    setTotalMonthlyIncome(totalMonthlyIncome);
    setStats(getStats());
  }, [transactions]);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: dark ? "#ac1c8c" : "#53e373",
        borderColor: dark ? "#ac1c8c" : "#53e373",
        pointBorderColor: "#transparent",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: dark ? "#059b98" : "#fa6467",
        borderColor: dark ? "#059b98" : "#fa6467",
        pointBorderColor: "#transparent",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const today = new Date();
  const monthArray = Array.from(
    { length: getMonthLength(today.getMonth()) },
    (_, i) => (i + 1).toString()
  );

  const monthlyData = {
    labels: monthArray,
    datasets: [
      {
        label: "Income",
        data: monthlyIncomeData,
        backgroundColor: dark ? "#ac1c8c" : "#53e373",
        borderColor: dark ? "#ac1c8c" : "#53e373",
        pointBorderColor: "#transparent",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: monthlyExpenseData,
        backgroundColor: dark ? "#059b98" : "#fa6467",
        borderColor: dark ? "#059b98" : "#fa6467",
        pointBorderColor: "#transparent",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(maxValue, maxIncomeValue),
      },
    },
    responsive: true,
    aspectRatio: props.aspectRatio ? props.aspectRatio : 4,
    maintainAspectRatio: true,
  };

  const monthlyOptions = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(montlyMaxExpenseValue, montlyMaxIncomeValue),
      },
    },
    responsive: true,
    aspectRatio: props.aspectRatio ? props.aspectRatio : 4,
    maintainAspectRatio: true,
  };
  const getStats = () => {
    const income = mode === "week" ? totalWeeklyIncome : totalMonthlyIncome;
    const expense = mode === "week" ? totalWeeklyExpense : totalMonthlyExpense;
    return income - expense;
  };

  return (
    <div
      className={`${style.container}`}
      style={{
        background: dark ? "black" : "white",
        color: dark && "white",
      }}
    >
      <div className={style.header}>
        <span>
          <b>Total Stats</b> &nbsp;
          <b style={{ color: getStats() >= 0 ? "green" : "salmon" }}>
            {getStats() >= 0 ? "+" : "-"}
            {Math.abs(getStats())}&#8377;
          </b>{" "}
        </span>
        <div className={style.options}>
          <button
            onClick={weekHandler}
            className={`${style.button} ${mode === "week" && style.active}`}
          >
            Weekly
          </button>
          <button
            onClick={monthHandler}
            className={`${style.button} ${mode === "month" && style.active}`}
          >
            Monthly
          </button>
        </div>
      </div>
      <Line
        className={`${dark && style.invert} ${
          props.className && props.className
        }`}
        data={mode === "week" ? data : monthlyData}
        options={mode === "week" ? options : monthlyOptions}
      ></Line>
    </div>
  );
};

export default LineChart;
