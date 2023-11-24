import Navbar from "@/components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import style from "./ResetPassword.module.css";
import { useState, useRef } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDispatch } from "react-redux";
import resetPasswordAsync from "@/Store/asyncThunk/resetPasswordAsync";
import { useRouter } from "next/router";
import '../../app/globals.css';
const ResetPassword = () => {
  const emailInputRef = useRef();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const sumbitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    console.log(enteredEmail);
    // const msg = await AuthCTX.passwordReset(enteredEmail);
    dispatch(resetPasswordAsync(enteredEmail));
  };
  const successHandler = () => {
    router.push("/account");
  };
  return (
    <>
      <Navbar />
      <Section />
      <div className={`${style.container} App`} style={{ margin: "0 auto" }}>
        <form onSubmit={sumbitHandler} className={style.formBody}>
          <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
            Reset Password
          </span>
          <div className={style.formFields}>
            <span style={{}}>Enter your registered email address</span>
            <div className={style.formInputContainer}>
              <input
                ref={emailInputRef}
                className={style.formInput}
                type="email"
                placeholder="Email"
              ></input>
            </div>
          </div>
          {!!message && (
            <div
              style={{
                padding: "1rem 0rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "start",
              }}
            >
              <span
                style={{
                  padding: "1rem 0rem",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1rem 0rem",
                  fontSize: "small",
                  color: "green",
                }}
              >
                {message}
                <button
                  onClick={sumbitHandler}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "0",
                    backgroundColor: "transparent",
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  <RefreshIcon />
                  Resend
                </button>
              </span>
              {status == "success" && (
                <button
                  style={{
                    padding: "1rem",
                    backgroundColor: "forestgreen",
                    borderRadius: "10rem",
                    border: "0",
                    color: "white",
                  }}
                  onClick={successHandler}
                >
                  Done
                </button>
              )}
            </div>
          )}
          {!(status == "success") && (
            <button className={style.formButton}>Send Link</button>
          )}
        </form>
      </div>
    </>
  );
};
export default ResetPassword;
