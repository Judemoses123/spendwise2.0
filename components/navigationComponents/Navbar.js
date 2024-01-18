import { useState } from "react";
import style from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileModal from "../profileComponents/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRouter } from "next/router";
import toggleDarkAsync from "@/Store/asyncThunk/toggleDarkAsync";
import PremiumBanner from "../premiumComponents/premiumBanner";
const Navbar = (props) => {
  const isPremium = useSelector((state) => state.profile.isPremium);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const router = useRouter();
  const location = router.pathname;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dispatch = useDispatch();

  const toggleShowProfileModal = () => {
    setShowProfileModal((prev) => !prev);
  };
  const togglePremiumModal = () => {
    setShowPremiumModal((prev) => !prev);
  };
  const toggleTheme = () => {
    dispatch(toggleDarkAsync());
  };

  const photoUrl = useSelector((state) => state.profile.photoUrl);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const displayName = useSelector((state) => state.profile.displayName);
  const dark = useSelector((state) => state.theme.dark);

  return (
    <div className={dark ? style.navbarBodyDark : style.navbarBody}>
      <ul className={style.navbarList}>
        {props.location && location !== "/account" && location !== "/" && (
          <div
            className={`${style.logoLocation}`}
            style={{ color: dark && "#cecece" }}
          >
            {props.location}
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
        {props.showPremium && !isPremium && (
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
