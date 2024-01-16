import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import style from "./Transactions.module.css";
import { useDispatch, useSelector } from "react-redux";
import getProfileDataAsync from "../../Store/asyncThunk/getProfileDataAsync";
import setIdTokenAsync from "../../Store/asyncThunk/setIdTokenAsync";
import getPremiumStateAsync from "../../Store/asyncThunk/getPremiumStateAsync";
import "../../app/globals.css";
import LeftNavbar from "@/components/navigationComponents/LeftNavbar";
import Expenses from "@/components/expenseComponents/Expenses";
import getTransactionAsync from "../../Store/asyncThunk/getTransactionAsync";
import { useRouter } from "next/router";
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
            sort: (sortRef.current.value ??= "recent"),
            duration: "all",
            page: page,
            fetchOnly: false,
            pagination: true,
          })
        );
        console.log(data);
        setTransactions(data.payload.transactions);
        setRpp(() => {
          const rpp = localStorage.getItem("rpp");
          if (!!rpp) return rpp;
          return 10;
        });
        setTotalPages(Math.ceil(data.payload.count / rpp));
      }
    }
    validity();
  }, [isLoggedIn]);

  const incomeHandler = async () => {
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
    console.log(data);
    setPage(1);
    setTransactions(data.payload.transactions);
    setTotalPages(Math.ceil(data.payload.count / rpp));
  };
  const expenseHandler = async () => {
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
    console.log(data);
    setPage(1);
    setTransactions(data.payload.transactions);
    setTotalPages(Math.ceil(data.payload.count / rpp));
  };
  const allHandler = async () => {
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
    setTransactions(data.payload.transactions);
    setTotalPages(Math.ceil(data.payload.count / rpp));
  };

  const sortChangeHandler = async () => {
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
    console.log(data);
    setPage(1);
    setTransactions(data.payload);
    setTotalPages(Math.ceil(data.payload.count / rpp));
  };

  const incrementPage = () => {
    setPage(page + 1);
  };
  const decrementPage = () => {
    setPage(page - 1);
  };

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const pageChange = async () => {
      console.log(window.innerWidth);
      setWidth(window.innerWidth);
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
      console.log(data);
      if (!!data.payload) {
        setTransactions(data.payload.transactions);
        setTotalPages(Math.ceil(data.payload.count / rpp));
      }
    };
    pageChange();
  }, [page, rpp]);

  const rppChangeHandler = () => {
    setPage(1);
    setRpp(rppRef.current.value);
    localStorage.setItem("rpp", rppRef.current.value);
  };
  return (
    <>
      <div className={`${style.root} App ${dark && "dark"}`}>
        <div className={style.left}>
          {width > 500 && emailVerified && !!photoUrl && !!userName && (
            <LeftNavbar />
          )}
        </div>
        <div className={style.right}>
          <Navbar />
          <Section>
            {emailVerified && !!photoUrl && !!userName && (
              <>
                <Expenses
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
            {width < 500 && emailVerified && !!photoUrl && !!userName && (
              <BottomNavbar></BottomNavbar>
            )}
          </Section>
        </div>
      </div>
    </>
  );
};
export default Transactions;
