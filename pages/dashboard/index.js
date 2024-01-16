import { useEffect, useState } from "react";
import Navbar from "@/components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import style from "./dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import setIdTokenAsync from "../../Store/asyncThunk/setIdTokenAsync";
import "../../app/globals.css";
import ProfileCompletion from "../../components/profileComponents/ProfileCompletion";
import EmailVerification from "@/components/profileComponents/EmailVerification";
import LeftNavbar from "@/components/navigationComponents/LeftNavbar";
import Expenses from "@/components/expenseComponents/Expenses";
import Utilities from "@/components/graphComponents/Utilities";
import getTransactionAsync from "../../Store/asyncThunk/getTransactionAsync";
import LineChart from "@/components/graphComponents/LineChart";
import { useRouter } from "next/router";
import Link from "next/link";
import BottomNavbar from "@/components/navigationComponents/BottomNavbar";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  // const transactions = useSelector((state) => state.transaction.transactions);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    async function validity() {
      const response = await dispatch(setIdTokenAsync());
      if (!isLoggedIn) {
        router.replace("/");
      } else {
        router.replace("/dashboard");
        const data = await dispatch(
          getTransactionAsync({
            type: "all",
            sort: "recent",
            duration: "all",
            page: "1",
            fetchOnly: true,
            pagination: true,
          })
        );
        console.log(data);
        setTransactions(data.payload.transactions);
      }
    }
    validity();
  }, [isLoggedIn]);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
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
          {!emailVerified && !!photoUrl && !!userName && <EmailVerification />}
          {emailVerified && !!photoUrl && !!userName && (
            <div className={style.utilities}>
              <Utilities showForm={true} />
            </div>
          )}
          {emailVerified && !!photoUrl && !!userName && width >= 500 && (
            <div>{width > 500 && <LineChart aspectRatio={4} />}</div>
          )}
          {emailVerified && !!photoUrl && !!userName && (
            <div className={style.lineMobile}>
              {width <= 500 && <LineChart aspectRatio={1} />}
            </div>
          )}
          {emailVerified && !!photoUrl && !!userName && (
            <Expenses
              mode="all"
              sort="date-recent"
              className={style.expenses}
              length={5}
              transactions={transactions}
            >
              <div className={style.expenseInfoBar}>
                <b>Recent transactions</b>
                <Link style={{ color: "grey" }} href={"/transactions"}>
                  See more
                </Link>
              </div>
            </Expenses>
          )}
          {width < 500 && emailVerified && !!photoUrl && !!userName && (
            <BottomNavbar></BottomNavbar>
          )}
        </Section>
      </div>
    </div>
  );
};

export default Home;
