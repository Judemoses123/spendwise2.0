import { useRef, useState, useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import style from './UpdateProfile.module.css';
import updateAsync from "../../Store/asyncThunk/updateAsync";
import PersonIcon from "@mui/icons-material/Person";
import ImageIcon from "@mui/icons-material/Image";
import { useRouter } from "next/router";
import getTransactionAsync from "@/Store/asyncThunk/getTransactionAsync";
const UpdateForm = () => {
  // const AuthCTX = useContext(AuthContext);
  const nameInputRef = useRef();
  const photoUrlInputRef = useRef();
  const [error, setError] = useState("");
  // const ProfileCTX = useContext(ProfileContext);
//   const navigate = useNavigate();
const router= useRouter();
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.auth.idToken);
  const userName = useSelector((state) => state.profile.displayName);
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const email = useSelector((state) => state.profile.email);

  const clickhandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;

    const updateData = {
      idToken: idToken,
      displayName: enteredName,
      photoUrl: enteredPhotoUrl,
    };
    if (
      String(enteredName).trim() === "" ||
      String(enteredPhotoUrl).trim() === ""
    ) {
      setError("Oops! You missed a required field.");
      return;
    }
    // ProfileCTX.update(updateData);
    console.log(updateData);
    dispatch(updateAsync(updateData));
    // navigate("/home");
    router.push('/dashboard');
  };

  useEffect(() => {
    dispatch(getTransactionAsync());
  }, [userName]);

  const firstLetter = String(email).charAt(0).toUpperCase();
  return (
    <form onSubmit={clickhandler} className={style.container}>
      {!!photoUrl ? (
        <div
          className={style.profilePicture}
          style={{ backgroundImage: `url(${photoUrl})` }}
        ></div>
      ) : (
        <div className={style.profilePicture}>{/* {firstLetter} */}</div>
      )}

      <div className={style.inputField}>
        <div className={style.inputContainer}>
          <PersonIcon className={style.icons} />
          <input
            ref={nameInputRef}
            type="text"
            defaultValue={!!userName ? userName : "Full Name"}
            className={style.input}
          ></input>
        </div>
        <div className={style.inputContainer}>
          <ImageIcon className={style.icons} />
          <input
            ref={photoUrlInputRef}
            type="url"
            defaultValue={!!photoUrl ? photoUrl : "Image Url"}
            className={style.input}
          ></input>
        </div>

        <button className={style.button}>Update</button>
      </div>
    </form>
  );
};
export default UpdateForm;
