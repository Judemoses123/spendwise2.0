import style from "./LeftNavbar.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PieChartIcon from "@mui/icons-material/PieChart";
import ArticleIcon from "@mui/icons-material/Article";
import PaidIcon from "@mui/icons-material/Paid";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { toggleOverlay } from "@/Store/Reducers/themeSlice";
const LeftNavbar = () => {
  const isPremium = useSelector((state) => state.profile.isPremium);
  const dispatch = useDispatch();
  const showNavigation = useSelector((state) => state.theme.overlay);
  const router = useRouter();
  const showNav = () => {
    dispatch(toggleOverlay(true));
  };
  const hideNav = () => {
    dispatch(toggleOverlay(false));
  };
  const dark = useSelector((state) => state.theme.dark);

  return (
    <div
      onMouseOver={showNav}
      onMouseOut={hideNav}
      className={dark ? style.maindark : style.main}
    >
      <div className={!showNavigation ? style.hidehead : style.head}>
        <div className={showNavigation ? style.logo : style.logoSquare}></div>
      </div>
      <div className={style.body}>
        <Link
          style={{
            color:
              router.asPath == "/dashboard"
                ? "cornflowerblue"
                : !dark
                ? "dimgrey"
                : "white",
          }}
          href={"/dashboard"}
        >
          <div
            className={!showNavigation ? style.hidepageLink : style.pageLink}
          >
            <SpaceDashboardIcon className={style.icons} />
            <div className={!showNavigation ? style.hidetext : style.text}>
              Dashboard
            </div>
            <ArrowForwardIosIcon
              className={!showNavigation ? style.hideforward : style.forward}
            />
          </div>
        </Link>
        <Link
          style={{
            color:
              router.asPath == "/transactions"
                ? "cornflowerblue"
                : !dark
                ? "dimgrey"
                : "white",
          }}
          href={"/transactions"}
        >
          <div
            className={!showNavigation ? style.hidepageLink : style.pageLink}
          >
            <PaidIcon className={style.icons} />
            <div className={!showNavigation ? style.hidetext : style.text}>
              Transaction
            </div>
            <ArrowForwardIosIcon
              className={!showNavigation ? style.hideforward : style.forward}
            />
          </div>
        </Link>
        <Link
          style={{
            color:
              router.asPath == "/analysis"
                ? "cornflowerblue"
                : !dark
                ? "dimgrey"
                : "white",
          }}
          href={"/analysis"}
        >
          <div
            className={!showNavigation ? style.hidepageLink : style.pageLink}
            // style={{ color: dark ? "#ececec" : "" }}
          >
            <PieChartIcon className={style.icons} />
            <div className={!showNavigation ? style.hidetext : style.text}>
              Analysis
            </div>
            <ArrowForwardIosIcon
              className={!showNavigation ? style.hideforward : style.forward}
            />
          </div>
        </Link>

        {/* <PremiumBanner /> */}
        {isPremium && (
          <Link
            style={{
              color:
                router.asPath == "/reports"
                  ? "cornflowerblue"
                  : !dark
                  ? "dimgrey"
                  : "white",
            }}
            href={"/reports"}
          >
            <div
              className={!showNavigation ? style.hidepageLink : style.pageLink}
              // style={{ color: dark ? "#ececec" : "" }}
            >
              <ArticleIcon className={style.icons} />
              <div className={!showNavigation ? style.hidetext : style.text}>
                Reports
              </div>
              <ArrowForwardIosIcon
                className={!showNavigation ? style.hideforward : style.forward}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default LeftNavbar;
