import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import style from "./Reports.module.css";
import { useDispatch, useSelector } from "react-redux";
import getProfileDataAsync from "../../Store/asyncThunk/getProfileDataAsync";
import setIdTokenAsync from "../../Store/asyncThunk/setIdTokenAsync";
import getPremiumStateAsync from "../../Store/asyncThunk/getPremiumStateAsync";
import "../../app/globals.css";
import LeftNavbar from "@/components/navigationComponents/LeftNavbar";
import Expenses from "@/components/expenseComponents/Expenses";
import getTransactionAsync from "../../Store/asyncThunk/getTransactionAsync";
import { useRouter } from "next/router";
import ReportComponents from "@/components/reportComponents/reportControls";
import JsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import Papa from "papaparse";
import BottomNavbar from "@/components/navigationComponents/BottomNavbar";
import downloadTransactionsAsync from "@/Store/asyncThunk/downloadTransactionsAsync";
import ReportList from "@/components/reportComponents/reportList";
const Reports = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  const sortRef = useRef();
  const expensesRef = useRef();
  const [transactions, setTransactions] = useState([]);
  const [mode, setMode] = useState("all");
  const [reports, setReports] = useState([]);
  const [sort, setSort] = useState(
    !!sortRef.current ? sortRef.current.value : "recent"
  );
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    try {
      async function validity() {
        const response = await dispatch(setIdTokenAsync());
        if (!isLoggedIn) {
          router.replace("/");
        } else {
          router.replace("/reports");
          await allHandler();
          const data = await dispatch(
            getTransactionAsync({
              type: mode,
              sort: sortRef.current ? sortRef.current.value : "recent",
              duration: "all",
              page: "1",
              fetchOnly: false,
              pagination: false,
            })
          );
          // console.log(data);
          if (data.payload) setTransactions(data.payload.transactions);
          getReports();
        }
      }
      validity();
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);

  const incomeHandler = async () => {
    try {
      setMode("income");
      const data = await dispatch(
        getTransactionAsync({
          type: "income",
          sort: sort,
          duration: "all",
          page: "1",
          fetchOnly: true,
          pagination: false,
        })
      );
      if (data.payload) setTransactions(data.payload.transactions);
    } catch (error) {
      console.log(error);
    }
  };
  const expenseHandler = async () => {
    try {
      setMode("expense");
      const data = await dispatch(
        getTransactionAsync({
          type: "expense",
          sort: sort,
          duration: "all",
          page: "1",
          fetchOnly: true,
          pagination: false,
        })
      );
      if (data.payload) setTransactions(data.payload.transactions);
    } catch (error) {
      console.log(error);
    }
  };
  const allHandler = async () => {
    try {
      setMode("all");
      const data = await dispatch(
        getTransactionAsync({
          type: "all",
          sort: sort,
          duration: "all",
          page: "1",
          fetchOnly: true,
          pagination: false,
        })
      );
      if (data.payload) setTransactions(data.payload.transactions);
    } catch (error) {
      console.log(error);
    }
  };
  //getPreviousReports
  const getReports = async () => {
    try {
      const response = await fetch(`http://54.161.122.179/getReports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: token,
        },
      });
      if (!response.ok) {
        throw new Error("getReportsFailed");
      }
      const data = await response.json();
      // console.log(data);
      setReports(data);
    } catch (error) {
      console.log(error);
    }
  };
  //
  const sortChangeHandler = async () => {
    try {
      const data = await dispatch(
        getTransactionAsync({
          type: mode,
          sort: sortRef.current.value,
          duration: "all",
          page: "1",
          fetchOnly: true,
          pagination: false,
        })
      );
      if (data.payload) setTransactions(data.payload.transactions);
    } catch (error) {
      console.log(error);
    }
  };
  //csv
  const printHandler = useReactToPrint({
    content: () => document.getElementById("transaction-list"),
  });
  const openInNewTab = (url) => {
    try {
      const newTab = window.open(url, "_blank");
      newTab.focus();
    } catch (error) {
      console.log(error);
    }
  };
  //pdf
  const downloadHandler = async (transactions) => {
    try {
      const payload = {
        type: mode,
        sort: sort,
      };
      const data = await dispatch(downloadTransactionsAsync(payload));
      console.log(data);
      if (data.payload.status === "success") {
        openInNewTab(data.payload.fileUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = (data) => {
    try {
      if (data.fileType === "pdf") {
        downloadHandler();
      }
      if (data.fileType === "csv") {
        printHandler();
      }
      getReports();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = (data) => {
    return data;
  };

  return (
    <>
      <div className={`${style.root} App ${dark && "dark"}`}>
        <div className={style.left}>
          {emailVerified && !!photoUrl && !!userName && <LeftNavbar />}
        </div>
        <div className={style.right}>
          <Navbar showPremium={true} location={"Reports"} />
          <Section style={{ padding: "5rem 1rem" }}>
            {emailVerified && !!photoUrl && !!userName && (
              <div>
                <div className={style.gridContainer} ref={expensesRef}>
                  <ReportList reports={reports} />
                  <Expenses
                    transactions={transactions}
                    mode={mode}
                    sort={sort}
                    className={style.expenses}
                    getData={getData}
                  >
                    <div
                      className={style.controls}
                      style={{
                        backgroundColor: dark && "black",
                        color: dark && "white",
                        borderBottom: dark
                          ? "1px solid #535353 "
                          : "1px solid lightgrey",
                      }}
                    >
                      <div className={style.type}>
                        <button
                          onClick={allHandler}
                          className={`${style.typeButtons} ${
                            mode == "all" && style.active
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={incomeHandler}
                          className={`${style.typeButtons} ${
                            mode == "income" && style.activeIncome
                          }`}
                        >
                          Income
                        </button>
                        <button
                          onClick={expenseHandler}
                          className={`${style.typeButtons} ${
                            mode == "expense" && style.activeExpenses
                          }`}
                        >
                          Expenses
                        </button>
                      </div>
                      <div className={style.controlsRight}>
                        <select
                          className={style.sort}
                          ref={sortRef}
                          onChange={sortChangeHandler}
                        >
                          <option
                            className={style.sortOptions}
                            value={"date-recent"}
                          >
                            Sort
                          </option>
                          <option
                            className={style.sortOptions}
                            value={"date-recent"}
                          >
                            Date: most recent
                          </option>
                          <option
                            className={style.sortOptions}
                            value={"date-earliest"}
                          >
                            Date: most earliest
                          </option>
                          <option
                            className={style.sortOptions}
                            value={"low-high"}
                          >
                            Amount: low-high
                          </option>
                          <option
                            className={style.sortOptions}
                            value={"high-low"}
                          >
                            Amount: high-low
                          </option>
                        </select>
                      </div>
                    </div>
                  </Expenses>
                </div>
                <ReportComponents clickHandler={clickHandler} />
              </div>
            )}
            {emailVerified && !!photoUrl && !!userName && <BottomNavbar />}
          </Section>
        </div>
      </div>
    </>
  );
};
export default Reports;
