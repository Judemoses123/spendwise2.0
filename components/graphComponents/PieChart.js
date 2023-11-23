import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import style from "./PieChart.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

ChartJs.register(ArcElement, Tooltip, Legend);
const PieChart = (props) => {
  const transactions = useSelector((state) => state.transaction.transactions);
  // console.log(transactions);
  const [categoryExpenses, setCategoryExpenses] = useState({});
  const [sortedCategoryExpenses, setSortedCategoryExpenses] = useState({});
  const [labels, setLabel] = useState([]);
  const [amount, setAmount] = useState([]);
  const dark = useSelector((state) => state.theme.dark);
  useState(categoryExpenses);
  const getCategoryExpenses = () => {
    const map = {};
    const expenses = transactions.filter((item) => item.type === "expense");

    expenses.forEach((element) => {
      const { category, amount } = element;
      map[category] = (map[category] ?? 0) + Number(amount);
    });
    const arr = Object.keys(map).map((category) => ({
      category,
      totalAmount: map[category],
    }));
    return arr;
  };

  useEffect(() => {
    const arr = getCategoryExpenses();
    const labels = arr.map((item) => item.category);
    const amount = arr.map((item) => item.totalAmount);
    setLabel(labels);
    setAmount(amount);
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        data: amount,
        backgroundColor: [
          "#53e373",
          "#fa6467",
          "#67a7fa",
          "#faca67",
          "#8567fa",
          "#67facc",
          "#faaa67",
          "#67fa7a",
          "#fa67a4",
          "#67faaa",
          "#d367fa",
          "#67fae0", // Aqua
          "#f8fa67",
          "#676cfa",
          "#fa67cc",
        ],
        borderColor: ["white"],
      },
    ],
  };
  const options = {};
  return (
    <div
      className={`${style.main} ${props.className && props.className} `}
      style={{
        backgroundColor: dark ? "black" : "white",
        color: dark && "white",
      }}
    >
      <div className={style.header}>Top Spendings</div>
      <Pie data={data} options={options}></Pie>
    </div>
  );
};
export default PieChart;
