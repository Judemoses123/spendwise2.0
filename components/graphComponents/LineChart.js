import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./LineChart.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import getTransactionAsync from "@/Store/asyncThunk/getTransactionAsync";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const LineChart = (props) => {
  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.theme.dark);
  const [duration, setDuration] = useState("week");
  const [stats, setStats] = useState(0);

  //Beautify Data
  const beautifyData = (data, type) => {
    if (duration == "week") {
      const transactions = new Array(7).fill(0);
      for (let i = 0; i < data.length; i++) {
        if (data[i].type == type) {
          const day = (new Date(data[i].date).getDay() + 6) % 7;
          transactions[day] = transactions[day] + Number(data[i].amount);
        }
      }
      return transactions;
    } else {
      const transactions = new Array(31).fill(0);
      for (let i = 0; i < data.length; i++) {
        const date = new Date(data[i].date).getDate() - 1;
        transactions[date] = transactions[date] + Number(data[i].amount);
      }
      return transactions;
    }
  };

  const weekArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
  ];
  //income states
  const getChartData = async () => {
    const expenseTransactions = await dispatch(
      getTransactionAsync({
        type: "expenses",
        sort: "recent",
        duration: duration,
        page: "1",
        fetchOnly: true,
        pagination: false,
      })
    );

    const incomeTransactions = await dispatch(
      getTransactionAsync({
        type: "income",
        sort: "recent",
        duration: duration,
        page: "1",
        fetchOnly: true,
        pagination: false,
      })
    );

    //Transaction Sum
    const incomeStats = !!incomeTransactions.payload
      ? incomeTransactions.payload.stats
      : 0;
    const expenseStats = !!expenseTransactions.payload
      ? expenseTransactions.payload.stats
      : 0;

    setStats(incomeStats - expenseStats);

    // const incomeMax = incomeTransactions.payload.max || 0;
    // const expenseMax = expenseTransactions.payload.max || 0;

    let income = incomeTransactions.payload?.transactions || [];
    let expenses = expenseTransactions.payload?.transactions || [];

    income = beautifyData(income, "income");
    expenses = beautifyData(expenses, "expense");

    // console.log(income);
    const incomeMax = income.reduce((prev, curr) => {
      return curr > prev ? curr : prev;
    });
    // console.log(expenses);
    const expenseMax = expenses.reduce((prev, curr) => {
      return curr > prev ? curr : prev;
    });

    return {
      data: {
        labels: duration === "week" ? weekArray : monthArray,
        datasets: [
          {
            label: "Income",
            data: income,
            tension: 0.4,
            backgroundColor: dark ? "#ac1c8c" : "#53e373",
            borderColor: dark ? "#ac1c8c" : "#53e373",
            pointBorderColor: "#transparent",
            // fill: true,
            fill: {
              target: "origin",
              above: dark ? "#3e0a3387" : "#c1f5cc87", // Area will be red above the origin
              below: "#000000", // And blue below the origin
            },
          },
          {
            label: "Expenses",
            data: expenses,
            tension: 0.4,
            backgroundColor: dark ? "#059b98" : "#fa6467",
            borderColor: dark ? "#059b98" : "#fa6467",
            pointBorderColor: "#transparent",
            fill: {
              target: "origin",
              above: dark ? "#02434294" : "#fdbcbd99", // Area will be red above the origin
              below: "#000000", // And blue below the origin
            },
          },
        ],
      },
      options: {
        plugins: {
          legend: true,
        },
        scales: {
          y: {
            min: 0,
            max: Math.max(incomeMax, expenseMax),
          },
        },
        responsive: true,
        aspectRatio: props.aspectRatio ? props.aspectRatio : 4,
        maintainAspectRatio: true,
      },
    };
  };

  const weekHandler = () => {
    setDuration("week");
  };
  const monthHandler = () => {
    setDuration("month");
  };

  const labels = duration === "week" ? weekArray : monthArray;

  //data state
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "weekly Transactions",
        data: useSelector((state) => state.transaction.transactions).map(
          (item) => item.amount
        ),
        tension: 0.4,
        backgroundColor: dark ? "#059b98" : "#fa6467",
        borderColor: dark ? "#059b98" : "#fa6467",
        pointBorderColor: "#transparent",
        fill: {
          target: "origin",
          above: dark ? "" : "#fdbcbd99",
          below: "#000000",
        },
      },
    ],
  });

  //options state
  const [options, setOptions] = useState({
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(0, 0),
      },
    },
    responsive: true,
    aspectRatio: props.aspectRatio ? props.aspectRatio : 4,
    maintainAspectRatio: true,
  });

  //useEffect
  useEffect(() => {
    async function anonymous() {
      const response = await getChartData();
      // console.log(response);
      setData(response.data);
      setOptions(response.options);
    }
    anonymous();
  }, [duration, transactions, data.datasets.data, dark]);

  return (
    <div
      className={`${style.container} ${props.className & props.className}`}
      style={{
        background: dark ? "black" : "white",
        color: dark && "white",
        border: !dark ? "1px solid lightgrey" : "1px solid #535353",
      }}
    >
      <div className={style.header}>
        <span>
          <b>Total Stats</b> &nbsp;
          <b style={{ color: stats >= 0 ? "green" : "salmon" }}>
            {stats >= 0 ? "+" : "-"}
            {Math.abs(stats)}&#8377;
          </b>
        </span>
        <div className={style.options}>
          <button
            onClick={weekHandler}
            className={`${style.button} ${duration === "week" && style.active}`}
          >
            Weekly
          </button>
          <button
            onClick={monthHandler}
            className={`${style.button} ${
              duration === "month" && style.active
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      {
        <>
          {options.scales.y.max == 0 && (
            <div className={style.noTransactionsContainer}>
              <span className={style.noTransactionsText}>
                No Transactions Found
              </span>
              <div
                style={{
                  aspectRatio: props.aspectRatio ? props.aspectRatio : 4,
                }}
                className={style.noTransactionsImage}
              ></div>
            </div>
          )}
          {options.scales.y.max != 0 && (
            <Line
              className={`${dark && style.invert} ${
                props.className && props.className
              }`}
              data={data}
              options={options}
            ></Line>
          )}
        </>
      }
    </div>
  );
};

export default LineChart;
