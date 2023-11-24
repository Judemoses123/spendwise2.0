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
  const [mode, setMode] = useState("all");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const idToken = useSelector((state) => state.auth.idToken);
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  const sortRef = useRef();
  const [sort, setSort] = useState(
    !!sortRef.current ? sortRef.current.value : "date-recent"
  );

  useEffect(() => {
    if (idToken) {
      dispatch(getProfileDataAsync({ idToken: idToken }));
    }
    allHandler();
  }, [isLoggedIn]);
  const incomeHandler = () => {
    setMode("income");
  };
  const expenseHandler = () => {
    setMode("expense");
  };
  const allHandler = () => {
    setMode("all");
  };
  useEffect(() => {
    dispatch(getPremiumStateAsync());
    dispatch(getTransactionAsync());
  }, [userName]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
    dispatch(setIdTokenAsync());
  }, []);

  const sortChangeHandler = () => {
    setMode((prev) => prev);
    setSort(sortRef.current.value);
  };
  const [width, setWidth] = useState(0);
  useEffect(() => {
    console.log(window.innerWidth);
    setWidth(window.innerWidth);
  }, []);
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
              <Expenses mode={mode} sort={sort} className={style.expenses}>
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
                      <option className={style.sortOptions} value={"low-high"}>
                        Amount: low-high
                      </option>
                      <option className={style.sortOptions} value={"high-low"}>
                        Amount: high-low
                      </option>
                    </select>
                  </div>
                </div>
              </Expenses>
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
