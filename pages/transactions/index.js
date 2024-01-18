import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import style from "./Transactions.module.css";
import { useDispatch, useSelector } from "react-redux";
import setIdTokenAsync from "../../Store/asyncThunk/setIdTokenAsync";
import "../../app/globals.css";
import LeftNavbar from "@/components/navigationComponents/LeftNavbar";
import Expenses from "@/components/expenseComponents/Expenses";
import getTransactionAsync from "../../Store/asyncThunk/getTransactionAsync";
import BottomNavbar from "@/components/navigationComponents/BottomNavbar";
const Transactions = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  const sortRef = useRef();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState("all");
  const [sort, setSort] = useState(
    !!sortRef.current ? sortRef.current.value : "recent"
  );

  const [rpp, setRpp] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const rppRef = useRef();
  useEffect(() => {
    try {
      async function validity() {
        const response = await dispatch(setIdTokenAsync());
        if (!isLoggedIn) {
          router.replace("/");
        } else {
          router.replace("/transactions");
          await allHandler();
          const data = await dispatch(
            getTransactionAsync({
              type: mode,
              sort: sortRef.current ? sortRef.current.value : "recent",
              duration: "all",
              page: 1,
              fetchOnly: false,
              pagination: true,
            })
          );
          setRpp(() => {
            const rpp = localStorage.getItem("rpp");
            if (!!rpp) return rpp;
            return 10;
          });
          // console.log(data);
          if (data.payload) {
            setTransactions(data.payload.transactions);
            setTotalPages(Math.ceil(data.payload.count / rpp));
          }
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
          page: page,
          fetchOnly: false,
          pagination: true,
          rpp,
        })
      );
      // console.log(data);
      setPage(1);
      if (!!data.payload) {
        setTransactions(data.payload.transactions);
        setTotalPages(Math.ceil(data.payload.count / rpp));
      }
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
          page: page,
          fetchOnly: false,
          pagination: true,
          rpp,
        })
      );
      // console.log(data);
      setPage(1);
      if (!!data.payload) {
        setTransactions(data.payload.transactions);
        setTotalPages(Math.ceil(data.payload.count / rpp));
      }
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
          page: page,
          fetchOnly: false,
          pagination: true,
          rpp,
        })
      );
      setPage(1);
      if (!!data.payload) {
        setTransactions(data.payload.transactions);
        setTotalPages(Math.ceil(data.payload.count / rpp));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortChangeHandler = async () => {
    try {
      const data = await dispatch(
        getTransactionAsync({
          type: mode,
          sort: (sortRef.current.value ??= "recent"),
          duration: "all",
          page: page,
          fetchOnly: false,
          pagination: true,
          rpp,
        })
      );
      // console.log(data);
      setPage(1);
      if (!!data.payload) {
        setTransactions(data.payload.transactions);
        setTotalPages(Math.ceil(data.payload.count / rpp));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const incrementPage = () => {
    setPage(page + 1);
  };
  const decrementPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    try {
      const pageChange = async () => {
        const data = await dispatch(
          getTransactionAsync({
            type: mode,
            sort: "recent",
            duration: "all",
            page: page,
            fetchOnly: false,
            pagination: true,
            rpp,
          })
        );
        // console.log(data);
        if (!!data.payload) {
          setTransactions(data.payload.transactions);
          setTotalPages(Math.ceil(data.payload.count / rpp));
        }
      };
      pageChange();
    } catch (error) {
      console.log(error);
    }
  }, [page, rpp]);

  const rppChangeHandler = () => {
    try {
      setPage(1);
      setRpp(rppRef.current.value);
      localStorage.setItem("rpp", rppRef.current.value);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={`${style.root} App ${dark && "dark"}`}>
        <div className={style.left}>
          {emailVerified && !!photoUrl && !!userName && <LeftNavbar />}
        </div>
        <div className={style.right}>
          <Navbar showPremium={true} location={"Transactions"} />
          <Section style={{ padding: "5rem 1rem" }}>
            {emailVerified && !!photoUrl && !!userName && (
              <>
                <Expenses
                  editable={true}
                  className={style.expenses}
                  transactions={transactions}
                >
                  <div
                    className={style.controls}
                    style={{
                      backgroundColor: dark && "black",
                      color: dark && "white",
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
                        <option className={style.sortOptions} value={"recent"}>
                          Sort
                        </option>
                        <option className={style.sortOptions} value={"recent"}>
                          Date: most recent
                        </option>
                        <option
                          className={style.sortOptions}
                          value={"earliest"}
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
                {
                  <div
                    style={{ backgroundColor: dark ? "black" : "white" }}
                    className={style.pagination}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                      }}
                    >
                      Rows per Page:
                      <select ref={rppRef} onChange={rppChangeHandler}>
                        <option value={rpp}>{rpp}</option>
                        <option value={"5"}>5</option>
                        <option value={"10"}>10</option>
                        <option value={"20"}>20</option>
                        <option value={"50"}>50</option>
                      </select>
                    </div>
                    {page > 1 && (
                      <button
                        onClick={decrementPage}
                        className={style.paginationButtons}
                      >
                        {page - 1}
                      </button>
                    )}
                    <button
                      style={{
                        backgroundColor: "cornflowerblue",
                        color: "white",
                      }}
                      className={style.paginationButtons}
                    >
                      {page}
                    </button>
                    {page < totalPages && (
                      <button
                        onClick={incrementPage}
                        className={style.paginationButtons}
                      >
                        {page + 1}
                      </button>
                    )}
                  </div>
                }
              </>
            )}
            {emailVerified && !!photoUrl && !!userName && (
              <BottomNavbar></BottomNavbar>
            )}
          </Section>
        </div>
      </div>
    </>
  );
};
export default Transactions;
