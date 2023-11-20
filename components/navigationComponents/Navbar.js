import { useState } from "react";
import style from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileModal from "../profileComponents/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleDark } from "../../Store/Reducers/themeSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRouter } from "next/router";
const Navbar = () => {
  const isPremium = useSelector((state) => state.profile.isPremium);
  const router = useRouter();
  // console.log(router.pathname);
  // console.log(router.asPath);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dispatch = useDispatch();
  const toggleShowProfileModal = () => {
    setShowProfileModal((prev) => !prev);
  };
  const toggleTheme = () => {
    dispatch(toggleDark());
  };
  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const displayName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);
  return (
    <div className={dark ? style.navbarBodyDark : style.navbarBody}>
      <ul className={style.navbarList}>
        {router.pathname !== "/account" && router.pathname !== "/" && (
          <div
            className={`${style.logoLocation}`}
            style={{ color: dark && "#cecece" }}
          >
            {router.pathname.substring(1, router.pathname.length)}
          </div>
        )}
        {(router.pathname === "/account" || router.pathname === "/") && (
          <div className={`${style.logo}`}></div>
        )}
        <div className={style.hamburger}>
          <MenuIcon />
        </div>
      </ul>

      <div className={style.container}>
        {isLoggedIn && isPremium && (
          <button
            title={dark ? "Light mode" : "Dark mode"}
            onClick={toggleTheme}
            className={style.modeButton}
          >
            {dark ? (
              <DarkModeIcon style={{ color: "cornflowerblue" }} />
            ) : (
              <LightModeIcon style={{ color: "orange" }} />
            )}
          </button>
        )}
        {!!photoUrl &&
          !!displayName &&
          isLoggedIn &&
          location.pathname === "/dashboard" && (
            <div
              className={style.profile}
              style={{
                visibility: `${showProfileModal ? "hidden" : "visible"}`,
              }}
            >
              {!!photoUrl && !!displayName ? (
                <div
                  onClick={toggleShowProfileModal}
                  className={style.profilePicture}
                  title={displayName}
                  style={{ backgroundImage: `url(${photoUrl})` }}
                />
              ) : (
                <div className={style.profilePicture}></div>
              )}
            </div>
          )}
      </div>
      {showProfileModal && (
        <ProfileModal toggleHandler={toggleShowProfileModal} />
      )}
    </div>
  );
};
export default Navbar;
