import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format, startOfWeek, endOfWeek, subDays } from "date-fns";
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

const LineChart = () => {
  const dark = useSelector((state) => state.theme.dark);

  const [mode, setMode] = useState("week");
  const monthHandler = () => {
    setMode("month");
  };
  const weekHandler = () => {
    setMode("week");
  };

  const [expenseData, setExpenseData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [incomeData, setIncomeData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [maxValue, setMaxValue] = useState(0);
  const [maxIncomeValue, setMaxIncomeValue] = useState(0);
  const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState([]);
  const [montlyMaxExpenseValue, setMontlyMaxExpenseValue] = useState(0);
  const [montlyMaxIncomeValue, setMontlyMaxIncomeValue] = useState(0);
  const transactions = useSelector((state) => state.transaction.transactions);
  const getWeeklyExpenseData = () => {
    if (!!!transactions) return;
    const today = new Date();
    const mondayBefore = new Date();
    if (today.getDay() === 1) {
      mondayBefore.setDate(today.getDate());
    } else {
      mondayBefore.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    }

    const weeklyData = [];
    let maxValue = 0;
    for (let i = 0; i < 7; i++) {
      const searchDate = new Date();
      searchDate.setDate(mondayBefore.getDate() + i);
      const value = transactions.reduce((prev, curr) => {
        const currDate = new Date(curr.date);
        if (
          searchDate.getDate() == currDate.getDate() &&
          searchDate.getMonth() === currDate.getMonth() &&
          searchDate.getFullYear() === currDate.getFullYear() &&
          curr.type === "expense"
        ) {
          return prev + Number(curr.amount);
        }
        return prev;
      }, 0);
      weeklyData.push(value);
      maxValue = Math.max(value, maxValue);
    }
    setMaxValue(maxValue);
    return weeklyData;
  };

  const getWeeklyIncomeData = () => {
    if (!!!transactions) return;
    const today = new Date();
    const mondayBefore = new Date();
    console.log(today.getDay());
    if (today.getDay() === 1) {
      mondayBefore.setDate(today.getDate());
    } else {
      mondayBefore.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    }
    console.log(today);
    console.log(mondayBefore);
    const weeklyData = [];
    let maxValue = 0;
    for (let i = 0; i < 7; i++) {
      const searchDate = new Date();
      searchDate.setDate(mondayBefore.getDate() + i);
      const value = transactions.reduce((prev, curr) => {
        const currDate = new Date(curr.date);
        if (
          searchDate.getDate() == currDate.getDate() &&
          searchDate.getMonth() === currDate.getMonth() &&
          searchDate.getFullYear() === currDate.getFullYear() &&
          curr.type === "income"
        ) {
          return prev + Number(curr.amount);
        }
        return prev;
      }, 0);
      weeklyData.push(value);
      maxValue = Math.max(value, maxValue);
    }
    setMaxIncomeValue(maxValue);
    return weeklyData;
  };

  //-----------------------------------------
  const getMonthlyExpenseData = () => {
    if (!!!transactions) return;
    const today = new Date();
    const firstOfMonth = new Date();
    if (today.getDate() === 1) {
      firstOfMonth.setDate(today.getDate());
    } else {
      firstOfMonth.setDate(today.getDate() - today.getDate() + 1);
    }

    const monthlyData = [];
    let maxValue = 0;
    const searchDate = new Date();
    searchDate.setDate(firstOfMonth.getDate());
    while (searchDate.getMonth() == today.getMonth()) {
      const value = transactions.reduce((prev, curr) => {
        const currDate = new Date(curr.date);
        if (
          searchDate.getDate() == currDate.getDate() &&
          searchDate.getMonth() === currDate.getMonth() &&
          searchDate.getFullYear() === currDate.getFullYear() &&
          curr.type === "expense"
        ) {
          return prev + Number(curr.amount);
        }
        return prev;
      }, 0);
      monthlyData.push(value);
      maxValue = Math.max(value, maxValue);
      searchDate.setDate(searchDate.getDate() + 1);
    }
    console.log(monthlyData);
    setMontlyMaxExpenseValue(maxValue);
    return monthlyData;
  };

  const getMonthlyIncomeData = () => {
    if (!!!transactions) return;
    const today = new Date();
    const firstOfMonth = new Date();
    if (today.getDate() === 1) {
      firstOfMonth.setDate(today.getDate());
    } else {
      firstOfMonth.setDate(today.getDate() - today.getDate() + 1);
    }

    const monthlyData = [];
    let maxValue = 0;
    const searchDate = new Date();
    searchDate.setDate(firstOfMonth.getDate());
    while (searchDate.getMonth() == today.getMonth()) {
      const value = transactions.reduce((prev, curr) => {
        const currDate = new Date(curr.date);
        if (
          searchDate.getDate() == currDate.getDate() &&
          searchDate.getMonth() === currDate.getMonth() &&
          searchDate.getFullYear() === currDate.getFullYear() &&
          curr.type === "income"
        ) {
          return prev + Number(curr.amount);
        }
        return prev;
      }, 0);
      monthlyData.push(value);
      maxValue = Math.max(value, maxValue);
      searchDate.setDate(searchDate.getDate() + 1);
    }
    console.log(monthlyData);
    setMontlyMaxIncomeValue(maxValue);
    return monthlyData;
  };

  useEffect(() => {
    setExpenseData(getWeeklyExpenseData());
    setIncomeData(getWeeklyIncomeData());
    setMonthlyIncomeData(getMonthlyIncomeData());
    setMonthlyExpenseData(getMonthlyExpenseData());
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

  function getMonthLength(monthNumber) {
    if (monthNumber < 1 || monthNumber > 12) {
      return "Invalid month number";
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[monthNumber];
  }

  const today = new Date();
  const length = getMonthLength(today.getMonth());
  const monthArray = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ].slice(0, length);
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
    aspectRatio: 4,
    maintainAspectRatio: true,
  };
  const weeklyOptions = {
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
    aspectRatio: 4,
    maintainAspectRatio: true,
  };
  console.log(maxValue);
  console.log(expenseData);
  console.log(incomeData);
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
          <b>Total Stats</b>{" "}
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
        className={dark && style.invert}
        data={mode === "week" ? data : monthlyData}
        options={mode === "week" ? weeklyOptions : monthlyOptions}
      ></Line>
    </div>
  );
};
export default LineChart;
