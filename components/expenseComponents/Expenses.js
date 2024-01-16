import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import style from "./Expenses.module.css";

const Expenses = (props) => {
  // const transactions = useSelector((state) => state.transaction.transactions);
  const transactions = props.transactions;
  const dark = useSelector((state) => state.theme.dark);
  return (
    <>
      <div
        className={`${dark ? style.containerDark : style.container} ${
          props.className && props.className
        }`}
      >
        {props.children}
        <div id="transaction-list">
          {transactions.map((item) => (
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
      </div>
    </>
  );
};

export default Expenses;
