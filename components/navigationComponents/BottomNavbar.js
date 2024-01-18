import Link from "next/link";
import style from "./BottomNavbar.module.css";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PaidIcon from "@mui/icons-material/Paid";
import PieChartIcon from "@mui/icons-material/PieChart";
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
        <SpaceDashboardIcon />
      </Link>
      <Link
        className={`${dark ? style.iconDark : style.icon} ${
          router.asPath === "/transactions" && style.active
        }`}
        href={"/transactions"}
      >
        <PaidIcon />
      </Link>
      <Link
        className={`${dark ? style.iconDark : style.icon} ${
          router.asPath === "/analysis" && style.active
        }`}
        href={"/analysis"}
      >
        <PieChartIcon />
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
