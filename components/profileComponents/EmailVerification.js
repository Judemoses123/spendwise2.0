import { useDispatch, useSelector } from "react-redux";
import style from "./EmailVerification.module.css";
import verifyAsync from "../../Store/asyncThunk/verifyAsync";
import verifyEmailCode from "../../Store/asyncThunk/verifyEmailCode";
import { useRef, useState } from "react";
import getProfileDataAsync from "../../Store/asyncThunk/getProfileDataAsync";
const EmailVerification = () => {
  const otpInputRef = useRef();
  const [message, setMessage] = useState({ message: "", status: "failed" });
  const dispatch = useDispatch();
  const verifyHandler = async () => {
    const response = await dispatch(verifyAsync());
    console.log(response);
    setMessage(response.payload);
  };
  const redirectHandler = async () => {
    console.log("done");
    const data = {
      otp: otpInputRef.current.value,
    };
    await dispatch(verifyEmailCode(data));
    dispatch(getProfileDataAsync());
  };
  return (
    <div className={style.main}>
      <div className={style.left}></div>
      <div className={style.right}>
        <div className={style.header}>Your account isn't verified yet!</div>
        {message.status != "success" && (
          <button onClick={verifyHandler} className={style.verifyButton}>
            Verify Account
          </button>
        )}
        <span className={style.message}>{message.message}</span>
        {message.status == "success" && (
          <div className={style.otpContainer}>
            <input
              ref={otpInputRef}
              placeholder="Enter OTP"
              className={style.otpInput}
            ></input>
            <button onClick={redirectHandler} className={style.doneButton}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default EmailVerification;
