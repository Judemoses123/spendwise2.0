import style from "./ReportControls.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useRef } from "react";
import { useSelector } from "react-redux";
const ReportComponents = (props) => {
  const fileTypeRef = useRef();
  const clickHandler = () => {
    const data = {
      fileType: fileTypeRef.current.value,
    };
    props.clickHandler(data);
  };
  const dark = useSelector((state) => state.theme.dark);
  return (
    <div
      className={style.container}
      style={{ backgroundColor: dark && "black", color: dark && "white" }}
    >
      <div className={style.left}>
        <div>Download As</div>
        <select ref={fileTypeRef}>
          <option value={"pdf"}> .PDF</option>
          <option value={"csv"}> .CSV</option>
        </select>
      </div>
      <button onClick={clickHandler} className={style.button}>
        <div className={style.btn_left}>Download</div>
        <ArrowDownwardIcon className={style.btn_right} />
      </button>
    </div>
  );
};
export default ReportComponents;
