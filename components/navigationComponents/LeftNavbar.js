import style from "./LeftNavbar.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArticleIcon from "@mui/icons-material/Article";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
const LeftNavbar = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const router=useRouter();   
  const toggleShow = () => {
    setShowNavigation((prev) => !prev);
  };
  const showNav = () => {
    setShowNavigation(true);
  };
  const hideNav = () => {
    setShowNavigation(false);
  };
  const dark = useSelector((state) => state.theme.dark);
  return (
    <div
      onMouseOver={showNav}
      onMouseOut={hideNav}
      className={dark ? style.maindark : style.main}
    >
      <div className={!showNavigation ? style.hidehead : style.head}>
        <div
          className={showNavigation ? style.logo : style.logoSquare}
          onClick={toggleShow}
        ></div>
      </div>
      <div className={style.body}>
        <Link
          style={{color: (router.asPath=='/dashboard')? "cornflowerblue" : "dimgrey"}}
          href={"/dashboard"}
        >
          <div
            className={!showNavigation ? style.hidepageLink : style.pageLink}
            style={{ color: dark ? "#ececec" : "" }}
          >
            <DashboardIcon className={style.icons} />
            <div className={!showNavigation ? style.hidetext : style.text}>
              Dashboard
            </div>
            <ArrowForwardIosIcon
              className={!showNavigation ? style.hideforward : style.forward}
            />
          </div>
        </Link>
        <Link
          style={{color: (router.asPath=='/expenses')? "cornflowerblue" : "dimgrey"}}
          href={"/expenses"}
        >
          <div
            className={!showNavigation ? style.hidepageLink : style.pageLink}
            style={{ color: dark ? "#ececec" : "" }}
          >
            <AttachMoneyIcon className={style.icons} />
            <div className={!showNavigation ? style.hidetext : style.text}>
              Expenses
            </div>
            <ArrowForwardIosIcon
              className={!showNavigation ? style.hideforward : style.forward}
            />
          </div>
        </Link>
        <Link
          style={{color: (router.asPath=='/analysis')? "cornflowerblue" : "dimgrey"}}
          href={"/analysis"}
        >
          <div
            className={!showNavigation ? style.hidepageLink : style.pageLink}
            style={{ color: dark ? "#ececec" : "" }}
          >
            <AnalyticsIcon className={style.icons} />
            <div className={!showNavigation ? style.hidetext : style.text}>
              Analysis
            </div>
            <ArrowForwardIosIcon
              className={!showNavigation ? style.hideforward : style.forward}
            />
          </div>
        </Link>
        <Link
          style={{color: (router.asPath=='/transaction')? "cornflowerblue" : "dimgrey"}}
          href={"/transaction"}
        >
          <div
            className={!showNavigation ? style.hidepageLink : style.pageLink}
            style={{ color: dark ? "#ececec" : "" }}
          >
            <CurrencyExchangeIcon className={style.icons} />
            <div className={!showNavigation ? style.hidetext : style.text}>
              Transaction
            </div>
            <ArrowForwardIosIcon
              className={!showNavigation ? style.hideforward : style.forward}
            />
          </div>
        </Link>
        <Link
          style={{color: (router.asPath=='/reports')? "cornflowerblue" : "dimgrey"}}
          href={"/reports"}
        >
          <div
            className={!showNavigation ? style.hidepageLink : style.pageLink}
            style={{ color: dark ? "#ececec" : "" }}
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
      </div>
    </div>
  );
};
export default LeftNavbar;
