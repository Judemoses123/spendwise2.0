import React, { useContext, useState } from "react";
import style from "./ProfileModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import logoutAsync from "../../Store/asyncThunk/logoutAsync";
import verifyAsync from "../../Store/asyncThunk/verifyAsync";
import { useRouter } from "next/router";
const ProfileModal = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toggleHandler = () => {
    props.toggleHandler();
  };
  const verificationHandler = () => {
    console.log("verify");
    dispatch(verifyAsync());
  };
  const logoutHandler = () => {
    dispatch(logoutAsync());
    router.push("/");
  };
  const displayName = useSelector((state) => state.profile.displayName);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const email = useSelector((state) => state.profile.email);
  const dark = useSelector((state) => state.theme.dark);
  return (
    <div
      className={style.modal}
      style={{
        backgroundColor: dark && "black",
        color: dark && "white",
        boxShadow: dark && "-1px 1px 5px black",
      }}
    >
      <div className={style.main}>
        <div className={style.container}>
          <div
            className={`${style.profilePicture}`}
            style={{ backgroundImage: `url(${photoUrl})` }}
          ></div>
          <button onClick={toggleHandler} className={style.close}>
            <CloseIcon style={{ color: dark && "white" }} />
          </button>
        </div>
        <div style={{ fontWeight: "bold" }}>{displayName}</div>
        <div
          style={{
            fontStyle: "italic",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span>{email}</span>
          <span style={{ color: emailVerified ? "green" : "salmon" }}>
            {emailVerified ? "(Verified)" : "(Not Verified)"}
          </span>
          {!emailVerified && (
            <button
              onClick={verificationHandler}
              style={{
                background: "lightGreen",
                borderRadius: "5px",
                border: "0",
                color: "black",
                padding: "0.5rem",
              }}
            >
              Verify Now
            </button>
          )}
        </div>
      </div>
      <button className={style.options}>
        <EditIcon />
        <Link style={{ color: "white" }} href="/update-profile">
          Edit Profile
        </Link>
      </button>
      <button
        onClick={logoutHandler}
        className={style.options}
        style={{ backgroundColor: "#fa6467" }}
      >
        <LogoutIcon />
        Logout
      </button>
    </div>
  );
};
export default ProfileModal;
