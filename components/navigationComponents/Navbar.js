import { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileModal from "../profileComponents/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleDark } from "../../Store/Reducers/themeSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRouter } from "next/router";
import toggleDarkAsync from "@/Store/asyncThunk/toggleDarkAsync";
import getDarkAsync from "@/Store/asyncThunk/getDarkAsync";
import CloseIcon from "@mui/icons-material/Close";
import PremiumBanner from "../premiumComponents/premiumBanner";
const Navbar = () => {
  const isPremium = useSelector((state) => state.profile.isPremium);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const router = useRouter();
  const location = router.pathname;
  // console.log(router.pathname);
  // console.log(router.asPath);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dispatch = useDispatch();
  dispatch(getDarkAsync());
  const toggleShowProfileModal = () => {
    setShowProfileModal((prev) => !prev);
  };
  const togglePremiumModal = () => {
    setShowPremiumModal((prev) => !prev);
  };
  const toggleTheme = () => {
    dispatch(toggleDarkAsync(!dark));
  };

  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const displayName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);

  return (
    <div className={dark ? style.navbarBodyDark : style.navbarBody}>
      <ul className={style.navbarList}>
        {location !== "/account" && location !== "/" && (
          <div
            className={`${style.logoLocation}`}
            style={{ color: dark && "#cecece" }}
          >
            {location.substring(1, location.length)}
          </div>
        )}
        {(location === "/account" || location === "/") && (
          <div className={`${style.logo}`}></div>
        )}
        <div className={style.hamburger}>
          <MenuIcon />
        </div>
      </ul>

      <div className={style.container}>
        {location != "/" && !isPremium && (
          <div>
            <button
              onClick={togglePremiumModal}
              className={style.premiumButton}
            >
              <div className={style.crown}></div>Get Premium
            </button>
            {showPremiumModal && (
              <PremiumBanner togglePremiumModal={togglePremiumModal} />
            )}
          </div>
        )}
        {location != "/" && isPremium && (
          <>
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
          </>
        )}
        {!!photoUrl &&
          !!displayName &&
          isLoggedIn &&
          (location === "/dashboard" ||
            location === "/transactions" ||
            location === "/analysis" ||
            location === "/reports") && (
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
