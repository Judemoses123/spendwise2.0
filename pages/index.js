import { useState } from "react";
import Form from '../components/authComponents/Form';
import Navbar from '../components/navigationComponents/Navbar';
import Section from "@/components/uiComponents/Section";
import style from "./index.module.css";
import '../app/globals.css'
const Account = () => {
  return (
    <>
      <Navbar />
      <Section>
        <div className={`${style.main} App`}>
          <div className={style.left}>
          </div>
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
