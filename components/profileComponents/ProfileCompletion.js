import style from "./ProfileCompletion.module.css";
import UpdateForm from "./UpdateForm";

const ProfileCompletion = () => {
  return (
    <div className={style.main}>
      <div className={style.left}></div>
      <div className={style.right}>
        <div className={style.header}>Let's get to know you.</div>
        <div className={style.prompt}>Complete your profile</div>
        <UpdateForm />
      </div>
    </div>
  );
};
export default ProfileCompletion;
