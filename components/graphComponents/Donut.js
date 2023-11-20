import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import style from "./Donut.module.css";
ChartJS.register(ArcElement, Tooltip, Legend);
const Donut = (props) => {

  const options = {};
  return (
    <div className={props.className} style={props.style}>
      <div>
        <div style={{ fontSize: "10px" }}>{props.chartTitle}</div>
        <div style={{ fontWeight: "bold" }}>{props.chartAmount}&#8377;</div>
      </div>
      <div>
        <Doughnut
          data={props.data}
          options={props.options}
          // style={{ height: "6rem", width:'6rem' }}
          className={style.donut}
        ></Doughnut>
      </div>
    </div>
  );
};

export default Donut;
