import { useEffect, useState } from "react";
import Navbar from "@/components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import style from "./dashboard.module.css";
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

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const idToken = useSelector((state) => state.auth.idToken);
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const userName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  useEffect(() => {
    if (idToken) {
      dispatch(getProfileDataAsync({ idToken: idToken }));
    }
  }, [isLoggedIn]);

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

  return (
    <>
      <div className={`${style.root} App ${dark && "dark"}`}>
        <div className={style.left}>
          {emailVerified && !!photoUrl && !!userName && <LeftNavbar />}
        </div>
        <div className={style.right}>
          <Navbar />
          <Section>
            {(!!!photoUrl || !!!userName) && <ProfileCompletion />}
            {!emailVerified && !!photoUrl && !!userName && (
              <EmailVerification />
            )}
            {emailVerified && !!photoUrl && !!userName && <Utilities />}
            {emailVerified && !!photoUrl && !!userName && <LineChart />}
            {emailVerified && !!photoUrl && !!userName && <Expenses />}
          </Section>
        </div>
      </div>
    </>
  );
};

export default Home;
