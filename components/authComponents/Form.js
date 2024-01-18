import { useRef, useState } from "react";
import style from "./Form.module.css";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import loginAsync from "@/Store/asyncThunk/loginAsync";
import signupAsync from "@/Store/asyncThunk/signupAsync";
const Form = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginMode, setLoginMode] = useState(true);
  const [dataInvalid, setDataInvalid] = useState(false);
  const [matchFailed, setMatchFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [response, setResponse] = useState({ status: "pending", message: "" });
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const toggleMode = () => {
    setLoginMode((prev) => !prev);
  };
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const formSignupHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    if (
      String(enteredEmail).trim() === "" ||
      String(enteredPassword).trim() === "" ||
      String(enteredConfirmPassword).trim() === ""
    ) {
      setDataInvalid(true);
      return;
    }
    if (enteredPassword != enteredConfirmPassword) {
      setErrorMessage(null);
      setDataInvalid(false);
      setMatchFailed(true);
      return;
    }
    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      mode: "signup",
    };
    
    const resp = await dispatch(signupAsync(loginData));
    console.log(resp);
    setDataInvalid(false);
    setMatchFailed(false);
    await setResponse({ message: response.message, status: "failed" });
    if (resp.payload.status === "failed") {
      setResponse(resp.payload);
      return;
    } else if (resp.payload.status === "success") {
      setResponse(resp.payload);
      router.push("/dashboard");
      return;
    }
  };

  const formLoginHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (
      String(enteredEmail).trim() === "" ||
      String(enteredPassword).trim() === ""
    ) {
      setDataInvalid(true);
      return;
    }
    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
      mode: "login",
    };
    const resp = await dispatch(loginAsync(loginData));
    console.log(resp);
    // await setResponse({ message: response.message, status: "failed" });
    if (resp.payload.status === "failed") {
      setResponse(resp.payload);
      return;
    } else if (resp.payload.status === "success") {
      setResponse(resp.payload);
      router.push("/dashboard");
      return;
    }
  };
  return (
    <div className={style.container}>
      <form
        onSubmit={loginMode ? formLoginHandler : formSignupHandler}
        className={style.formBody}
      >
        <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
          {loginMode ? "Login" : "Sign Up"}
        </span>
        <div className={style.formFields}>
          <div className={style.formInputContainer}>
            <input
              ref={emailInputRef}
              className={style.formInput}
              type="email"
              placeholder="Email"
            ></input>
          </div>
          <div className={style.formInputContainer}>
            <input
              ref={passwordInputRef}
              className={style.formInput}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            ></input>
            {showPassword ? (
              <VisibilityIcon
                onClick={togglePasswordVisibility}
                className={style.passwordVisbilityEye}
                style={{ color: "dimgrey", width: "0.8em" }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={togglePasswordVisibility}
                className={style.passwordVisbilityEye}
                style={{ color: "dimgrey", width: "0.8em" }}
              />
            )}
          </div>
          {!loginMode && (
            <div className={style.formInputContainer}>
              <input
                ref={confirmPasswordInputRef}
                className={style.formInput}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
              ></input>
              {showConfirmPassword ? (
                <VisibilityIcon
                  onClick={toggleConfirmPasswordVisibility}
                  className={style.passwordVisbilityEye}
                  style={{ color: "dimgrey", width: "0.8em" }}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={toggleConfirmPasswordVisibility}
                  className={style.passwordVisbilityEye}
                  style={{ color: "dimgrey", width: "0.8em" }}
                />
              )}
            </div>
          )}
        </div>
        {dataInvalid && (
          <span
            style={{ color: "salmon", padding: "0.5rem", fontSize: "small" }}
          >
            Oops! You missed a required field.
          </span>
        )}
        {matchFailed && (
          <span
            style={{ color: "salmon", padding: "0.5rem", fontSize: "small" }}
          >
            "Oops! It looks like your passwords don't match. Please try again."
          </span>
        )}
        {!!errorMessage && (
          <span
            style={{ color: "salmon", padding: "0.5rem", fontSize: "small" }}
          >
            {errorMessage}
          </span>
        )}
        {loginMode && (
          <Link
            href="/reset-password"
            style={{ fontSize: "small", padding: "1rem 0rem" }}
          >
            Forgot password?
          </Link>
        )}
        <button className={style.formButton}>
          {loginMode ? "Login" : "Sign Up"}
        </button>
        {response.status === "failed" && (
          <span style={{ fontSize: "12px", color: "salmon", margin: "0.5rem" }}>
            {response.message}
          </span>
        )}
      </form>
      <div className={style.formModeSwitch}>
        {!loginMode && (
          <span
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Have an account?&nbsp;
            <a style={{ color: "blue" }} onClick={toggleMode}>
              Login
            </a>
          </span>
        )}
        {loginMode && (
          <span
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Don't have an account?&nbsp;
            <a style={{ color: "blue" }} onClick={toggleMode}>
              Sign Up
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default Form;
