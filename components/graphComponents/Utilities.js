import { useDispatch, useSelector } from "react-redux";
import style from "./Utilities.module.css";
import ExpenseForm from "../expenseComponents/ExpenseForm";
import Donut from "./Donut";
import getTransactionAsync from "../../Store/asyncThunk/getTransactionAsync";
import { useEffect, useState } from "react";

const Utilities = (props) => {
  const options = {};
  const dispatch = useDispatch();
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  const transactions = useSelector((state) => state.transaction.transactions);
  const dummyData = {
    labels: [],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: "salmon",
        borderColor: ["transparent", "transparent"],
      },
    ],
  };
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [weeklyExpenses, setWeeklyExpenses] = useState(0);

  useEffect(() => {
    async function fetchData() {
      //totalIncome
      const fetchedtotalIncome = await dispatch(
        getTransactionAsync({
          type: "income",
          sort: "recent",
          duration: "all",
          page: "1",
          fetchOnly: true,
          pagination: false,
        })
      ).then((response) => {
        if (response) {
          setTotalIncome(response.payload.stats);
        }
      });
      ///
      const fetchedTotalExpenses = await dispatch(
        getTransactionAsync({
          type: "expense",
          sort: "recent",
          duration: "all",
          page: "1",
          fetchOnly: true,
          pagination: false,
        })
      ).then((response) => {
        if (response) {
          // console.log(response);
          setTotalExpenses(response.payload.stats);
        }
      });
      //monthly Expenses
      const fetchedMonthlyExpenses = await dispatch(
        getTransactionAsync({
          type: "expense",
          sort: "recent",
          duration: "month",
          page: "1",
          fetchOnly: true,
          pagination: false,
        })
      ).then((response) => {
        if (response) {
          // console.log(response);
          setMonthlyExpenses(response.payload.stats);
        }
      });
      const fetchedWeeklyExpenses = await dispatch(
        getTransactionAsync({
          type: "expense",
          sort: "recent",
          duration: "week",
          page: "1",
          fetchOnly: true,
          pagination: false,
        })
      ).then((response) => {
        if (response) {
          // console.log(response);
          setWeeklyExpenses(response.payload.stats);
        }
      });
    }
    fetchData();
  }, [transactions]);

  return (
    <div className={props.showForm ? style.wrapper : style.wrapperWithoutForm}>
      {emailVerified && !!photoUrl && !!userName && props.showForm && (
        <ExpenseForm />
      )}
      <Donut
        className={dark ? style.donutdark : style.donut}
        chartTitle={"Total Income"}
        chartAmount={totalIncome}
        data={createDonutData(totalIncome, totalExpenses, "#53e373")}
        options={options}
      />
      <Donut
        className={dark ? style.donutdark : style.donut}
        chartTitle={"Total Expense"}
        chartAmount={totalExpenses}
        data={createDonutData(
          totalExpenses,
          totalIncome - totalExpenses,
          "#fa6467"
        )}
        options={options}
      />
      <Donut
        className={dark ? style.donutdark : style.donut}
        chartTitle={"Monthly Expense"}
        chartAmount={monthlyExpenses}
        data={createDonutData(
          monthlyExpenses,
          totalExpenses - monthlyExpenses,
          "orange"
        )}
        options={options}
      />
      <Donut
        className={dark ? style.donutdark : style.donut}
        chartTitle={"Weekly Expense"}
        chartAmount={weeklyExpenses}
        data={createDonutData(
          weeklyExpenses,
          monthlyExpenses - weeklyExpenses,
          "grey"
        )}
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
        backgroundColor: [backgroundColor, "#efefef"],
        borderColor: ["transparent", "transparent"],
      },
    ],
  };
}
