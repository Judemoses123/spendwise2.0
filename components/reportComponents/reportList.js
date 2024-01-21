import Link from "next/link";
import style from "./reportList.module.css";
import { useSelector } from "react-redux";
const ReportList = (props) => {
  const reports = props.reports;
  const dark = useSelector((state) => state.theme.dark);
  return (
    <div
      className={style.main}
      style={{
        backgroundColor: dark && "black",
        color: dark && "white",
        border: dark ? "1px solid #535353" : "1px solid lightgrey",
      }}
    >
      <div className={style.header}>Previously Generated Reports</div>
      <div className={style.body} style={{ color: dark && "white" }}>
        {reports.map((report) => {
          return (
            <Link
              style={{
                fontSize: "0.8rem",
                color: dark ? "white" : "black",
              }}
              href={report.fileUrl}
              target="_blank"
            >
              <div className={style.reportListItem}>
                <div className={style.reportListItem_left}>
                  <div
                    style={{ filter: dark && "invert(1)" }}
                    className={style.fileIcon}
                  >
                    {/* <div className={style.fileName}>PDF</div> */}
                  </div>
                </div>
                <div className={style.reportListItem_right}>
                  <span
                    style={{
                      textOverflow: "ellipsis",
                      width: "20vw",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {report.fileName}
                  </span>
                  <span style={{ color: "cornflowerblue" }}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default ReportList;
