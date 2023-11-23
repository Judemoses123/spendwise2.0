import Section from "@/components/uiComponents/Section";
import Navbar from "@/components/navigationComponents/Navbar";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateForm from "@/components/profileComponents/UpdateForm";
import style from './UpdateProfile.module.css';
import '../../app/globals.css';
const UpdateProfile = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.profile.displayName);


  return (
    <>
      <Navbar />
      <Section>
        <div className={`${style.main} App`}>
          <div className={style.left}></div>
          <div className={style.right}>
            <div className={style.header}>Edit profile.</div>
            {/* <div className={style.prompt}>Complete your profile</div> */}
            <UpdateForm />
          </div>
        </div>
      </Section>
    </>
  );
};
export default UpdateProfile;
