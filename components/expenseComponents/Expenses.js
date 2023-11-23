import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Papa from "papaparse";
import ExpenseItem from "./ExpenseItem";
import style from "./Expenses.module.css";

const Expenses = React.forwardRef((props) => {
  const mode = props.mode;
  const sort = props.sort;
  const length = props.length;
  const dark = useSelector((state) => state.theme.dark);
  const transactions = useSelector((state) => state.transaction.transactions);

  const filterTransactions = () => {
    let filteredTransactions = [...transactions];

    if (mode && mode !== "all") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.type === mode
      );
    }

    if (sort && sort !== "all") {
      if (sort === "low-high") {
        filteredTransactions.sort((a, b) => a.amount - b.amount);
      } else if (sort === "high-low") {
        filteredTransactions.sort((a, b) => b.amount - a.amount);
      } else if (sort === "date-earliest") {
        filteredTransactions.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      } else if (sort === "date-recent") {
        filteredTransactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      }
    }

    return filteredTransactions;
  };

  let sortedAndFilteredTransactions = filterTransactions();
  let subSet = sortedAndFilteredTransactions.slice(0, length);
  let data = !!!length ? sortedAndFilteredTransactions : subSet;

  useEffect(() => {
    props.getData && props.getData(data);
  }, [filterTransactions()]);
  useEffect(() => {
    sortedAndFilteredTransactions = filterTransactions();
    subSet = sortedAndFilteredTransactions.slice(0, length);
    data = !!!length ? sortedAndFilteredTransactions : subSet;
  }, [transactions]);
  return (
    <>
      <div
        className={`${dark ? style.containerDark : style.container} ${
          props.className && props.className
        }`}
      >
        {props.children}
        {!!!length &&
          sortedAndFilteredTransactions.map((item) => (
            <ExpenseItem
            key={item.id}
            amount={item.amount}
            description={item.description}
            date={item.date}
            id={item.id}
            type={item.type}
            category={item.type === "expense" && item.category}
            source={item.type === "income" && item.source}
            />
          ))}
        {!!length &&
          subSet.map((item) => (
            <ExpenseItem
              key={item.id}
              amount={item.amount}
              description={item.description}
              date={item.date}
              id={item.id}
              type={item.type}
              category={item.type === "expense" && item.category}
              source={item.type === "income" && item.source}
            />
          ))}
      </div>
    </>
  );
});

export default Expenses;
