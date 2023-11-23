import style from "./ReportControls.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useRef } from "react";
const ReportComponents = (props) => {
  const fileTypeRef = useRef();
  const clickHandler = () => {
    const data = {
      fileType: fileTypeRef.current.value,
    };
    props.clickHandler(data);
  };
  return (
    <div className={style.container}>
      <div className={style.left}>
        <div>Download As</div>
        <select ref={fileTypeRef}>
          <option value={"pdf"}> .PDF</option>
          <option value={"csv"}> .CSV</option>
        </select>
      </div>
      <button onClick={clickHandler} className={style.button}>
        <div className={style.btn_left}>Download</div>
        <ArrowDownwardIcon className={style.btn_right}F/>
      </button>
    </div>
  );
};
export default ReportComponents;
