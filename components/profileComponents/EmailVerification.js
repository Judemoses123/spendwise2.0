import { useDispatch, useSelector } from "react-redux";
import style from "./EmailVerification.module.css";
import verifyAsync from "../../Store/asyncThunk/verifyAsync";
import { useState } from "react";
import getProfileDataAsync from "../../Store/asyncThunk/getProfileDataAsync";
const EmailVerification = () => {
  const [message, setMessage] = useState({ message: "", status: "failed" });
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.auth.idToken);
  const verifyHandler = async () => {
    const response = await dispatch(verifyAsync());
    console.log(response);
    setMessage(response.payload);
  };
  const redirectHandler = () => {
    console.log("done");
    dispatch(getProfileDataAsync({ idToken: idToken }));
  };
  return (
    <div className={style.main}>
      <div className={style.left}></div>
      <div className={style.right}>
        <div className={style.header}>Your account isn't verified yet!</div>
        <button onClick={verifyHandler} className={style.verifyButton}>
          Verify Account
        </button>
        <span className={style.message}>{message.message}</span>
        {message.status == "success" && (
          <button onClick={redirectHandler} className={style.doneButton}>
            Done
          </button>
        )}
      </div>
    </div>
  );
};
export default EmailVerification;
