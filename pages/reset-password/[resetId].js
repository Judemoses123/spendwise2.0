import Navbar from "@/components/navigationComponents/Navbar";
import Section from "@/components/uiComponents/Section";
import RefreshIcon from "@mui/icons-material/Refresh";
import style from "./ResetPassword.module.css";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import updatePassword from "@/Store/asyncThunk/updatePassword";
import { useParams } from "next/navigation";

const resetId = () => {
  const passwordInputRef = useRef();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const sumbitHandler = async (event) => {
    event.preventDefault();
    const password = passwordInputRef.current.value;
    console.log({ password, resetId: params.resetId });
    // const msg = await AuthCTX.passwordReset(enteredEmail);
    const response = await dispatch(
      updatePassword({ password, uuid: params.resetId })
    );
    if (response.payload.status == "success") {
      setTimeout(() => {
        router.replace("http://localhost:3000/");
      }, 5000);
    }
    console.log(response.payload);
    setMessage(response.payload.message);
  };
  return (
    <>
      <Navbar location={"Reset Password"} />
      <Section style={{ padding: "5rem 1rem" }} />
      <div className={`${style.container} App`} style={{ margin: "0 auto" }}>
        <form onSubmit={sumbitHandler} className={style.formBody}>
          <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
            Reset Password
          </span>
          <div className={style.formFields}>
            <span style={{}}>Enter New Password</span>
            <div className={style.formInputContainer}>
              <input
                ref={passwordInputRef}
                className={style.formInput}
                type="password"
                placeholder="Enter Password"
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
            <button className={style.formButton}>Update Password</button>
          )}
        </form>
      </div>
    </>
  );
};
export default resetId;
