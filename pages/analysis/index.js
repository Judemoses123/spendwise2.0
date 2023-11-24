import { useEffect, useState } from "react";
import Navbar from "@/components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import style from "./analysis.module.css";
import { useDispatch, useSelector } from "react-redux";
import getProfileDataAsync from "../../Store/asyncThunk/getProfileDataAsync";
import setIdTokenAsync from "../../Store/asyncThunk/setIdTokenAsync";
import getPremiumStateAsync from "../../Store/asyncThunk/getPremiumStateAsync";
import "../../app/globals.css";
import ProfileCompletion from "../../components/profileComponents/ProfileCompletion";
import EmailVerification from "@/components/profileComponents/EmailVerification";
import LeftNavbar from "@/components/navigationComponents/LeftNavbar";
import Expenses from "@/components/expenseComponents/Expenses";
import Utilities from "@/components/graphComponents/Utilities";
import getTransactionAsync from "../../Store/asyncThunk/getTransactionAsync";
import LineChart from "@/components/graphComponents/LineChart";
import { useRouter } from "next/router";
import PieChart from "@/components/graphComponents/PieChart";
import BottomNavbar from "@/components/navigationComponents/BottomNavbar";

const Analysis = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const idToken = useSelector((state) => state.auth.idToken);
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  const transactions = useSelector((state) => state.transaction.transactions);
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (idToken) {
      dispatch(getProfileDataAsync({ idToken: idToken }));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(getPremiumStateAsync());
    dispatch(getTransactionAsync());
    setScore(calculateFinancialHealthScore(transactions));
  }, [userName]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
    dispatch(setIdTokenAsync());
  }, []);
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
            {(!!!photoUrl || !!!userName) && <ProfileCompletion />}
            {!emailVerified && !!photoUrl && !!userName && (
              <EmailVerification />
            )}
            {emailVerified && !!photoUrl && !!userName && (
              <div className={style.mainGrid}>
                <div className={style.leftGrid}>
                  <div className={style.utilities}>
                    <Utilities showForm={false} />
                  </div>
                  <div className={style.line}>
                    <LineChart />
                  </div>
                  <div className={style.lineMobile}>
                    <LineChart aspectRatio={1} />
                  </div>
                </div>
                <div className={style.rightGrid}>
                  <div className={style.pie}>
                    <PieChart />
                  </div>
                  <div
                    className={style.healthScore}
                    style={{
                      backgroundColor: dark && "black",
                      color: dark && "white",
                    }}
                  >
                    <div className={style.healthScore_img}></div>
                    <div className={style.healthScore_text}>
                      Spendwise Financial Health Score
                    </div>
                    &nbsp;
                    <br />
                    <div
                      className={style.healthScore_score}
                      style={{
                        color: (score) => {
                          if (score < 30) return "red";
                          else if (score > 30 && score < 80) return "orange";
                          else return "green";
                        },
                      }}
                    >
                      {score}%
                    </div>
                  </div>
                </div>
              </div>
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
export default Analysis;
const calculateFinancialHealthScore = (transactions) => {
  const weights = {
    income: 0.25,
    expenses: -0.25,
    savings: 0.2,
    investment: 0.2,
    debt: -0.3,
  };
  const income = transactions.reduce((prev, curr) => {
    if (curr.type === "income") return prev + Number(curr.amount);
    else return prev;
  }, 0);
  const expense = transactions.reduce((prev, curr) => {
    if (curr.type === "expense") return prev + Number(curr.amount);
    else return prev;
  }, 0);
  const savings = income - expense;

  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const investment = expenses.reduce((prev, curr) => {
    if (curr.category == "Savings and Investments") {
      return prev + Number(curr.amount);
    }
    return prev;
  }, 0);
  const debt = expenses.reduce((prev, curr) => {
    if (curr.category == "Debt Payments") {
      return prev + Number(curr.amount);
    }
    return prev;
  }, 0);

  // console.log(weightedSums);
  const score =
    ((0.25 * income -
      0.25 * expense +
      0.2 * savings +
      0.2 * investment -
      0.3 * debt) /
      (0.25 * income + 0.2 * savings + 0.2 * investment)) *
    100;
  return score.toFixed(2);
};
