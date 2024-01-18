import { useEffect, useState } from "react";
import Navbar from "@/components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import style from "./analysis.module.css";
import { useDispatch, useSelector } from "react-redux";
import setIdTokenAsync from "../../Store/asyncThunk/setIdTokenAsync";
import "../../app/globals.css";
import ProfileCompletion from "../../components/profileComponents/ProfileCompletion";
import EmailVerification from "@/components/profileComponents/EmailVerification";
import LeftNavbar from "@/components/navigationComponents/LeftNavbar";
import Utilities from "@/components/graphComponents/Utilities";
import getTransactionAsync from "../../Store/asyncThunk/getTransactionAsync";
import LineChart from "@/components/graphComponents/LineChart";
import { useRouter } from "next/router";
import PieChart from "@/components/graphComponents/PieChart";
import BottomNavbar from "@/components/navigationComponents/BottomNavbar";
import getFinancialHealthScore from "@/Store/asyncThunk/getFinancialHealthScore";

const Analysis = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const token = useSelector((state) => state.auth.token);
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  const [transactions, setTransactions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    try {
      async function validity() {
        const response = await dispatch(setIdTokenAsync());
        if (!isLoggedIn) {
          router.replace("/");
        } else {
          router.replace("/analysis");
          const data = await dispatch(
            getTransactionAsync({
              type: "all",
              sort: "recent",
              duration: "all",
              page: "1",
              fetchOnly: false,
              pagination: true,
            })
          );
          // console.log(data);
          if (data.payload) {
            setTransactions(data.payload.transactions);
          }
          const response = await dispatch(getFinancialHealthScore());
          // console.log(response);
          if (!!response.payload) {
            setScore(response.payload.score);
          }
        }
      }
      validity();
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      dispatch(
        getTransactionAsync({
          type: "all",
          sort: "recent",
          duration: "all",
          page: "1",
          fetchOnly: false,
          pagination: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [userName]);

  useEffect(() => {
    try {
      if (!isLoggedIn) {
        router.replace("/");
      }
      dispatch(setIdTokenAsync());
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className={`${style.root} App ${dark && "dark"}`}>
        <div className={style.left}>
          {emailVerified && !!photoUrl && !!userName && <LeftNavbar />}
        </div>
        <div className={style.right}>
          <Navbar showPremium={true} location={"Analysis"} />
          <Section style={{ padding: "5rem 1rem" }}>
            {(!!!photoUrl || !!!userName) && <ProfileCompletion />}
            {!emailVerified && !!photoUrl && !!userName && (
              <EmailVerification />
            )}
            {emailVerified && !!photoUrl && !!userName && (
              <div className={style.mainGrid}>
                <div
                  className={
                    style.leftGrid
                    //  : style.leftGridMobile
                  }
                >
                  <div className={style.utilities}>
                    <Utilities showForm={false} />
                  </div>
                  {
                    <div className={style.line}>
                      <LineChart aspectRatio={3} />
                    </div>
                  }
                  {
                    <div className={style.lineMobile}>
                      <LineChart aspectRatio={1} />
                    </div>
                  }
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
                      border: dark
                        ? "1px solid #535353"
                        : "1px solid lightgrey",
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
            {emailVerified && !!photoUrl && !!userName && (
              <BottomNavbar></BottomNavbar>
            )}
          </Section>
        </div>
      </div>
    </>
  );
};
export default Analysis;
