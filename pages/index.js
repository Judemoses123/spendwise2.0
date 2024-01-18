import Form from "../components/authComponents/Form";
import Navbar from "../components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import style from "./index.module.css";
import "../app/globals.css";
import setIdTokenAsync from "@/Store/asyncThunk/setIdTokenAsync";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Account = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    try {
      async function validity() {
        const response = await dispatch(setIdTokenAsync());
        if (!isLoggedIn) {
          router.replace("/");
        } else {
          router.replace("/dashboard");
        }
      }
      validity();
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);
  return (
    <>
      <Navbar />
      <Section>
        <div className={`${style.main} App`}>
          <div className={style.left}></div>
          <div className={style.right}>
            <div className={style.header}>Welcome to Spendwise</div>
            <Form />
          </div>
        </div>
      </Section>
    </>
  );
};
export default Account;
