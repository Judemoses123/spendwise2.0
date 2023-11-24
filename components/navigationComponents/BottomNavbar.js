import Link from "next/link";
import style from "./BottomNavbar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArticleIcon from "@mui/icons-material/Article";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const BottomNavbar = () => {
  const router = useRouter();
  const dark = useSelector((state) => state.theme.dark);
  return (
    <div className={dark ? style.mainDark : style.main}>
      <Link
        className={`${dark ? style.iconDark : style.icon} ${
          router.asPath === "/dashboard" && style.active
        }`}
        href={"/dashboard"}
      >
        <DashboardIcon />
      </Link>
      <Link
        className={`${dark ? style.iconDark : style.icon} ${
          router.asPath === "/transactions" && style.active
        }`}
        href={"/transactions"}
      >
        <CurrencyExchangeIcon />
      </Link>
      <Link
        className={`${dark ? style.iconDark : style.icon} ${
          router.asPath === "/analysis" && style.active
        }`}
        href={"/analysis"}
      >
        <AnalyticsIcon />
      </Link>
      <Link
        className={`${dark ? style.iconDark : style.icon} ${
          router.asPath === "/reports" && style.active
        }`}
        href={"/reports"}
      >
        <ArticleIcon />
      </Link>
    </div>
  );
};
export default BottomNavbar;
