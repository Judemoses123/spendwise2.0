import getProfileDataAsync from "@/Store/asyncThunk/getProfileDataAsync";
import style from "./premium.module.css";
import CloseIcon from "@mui/icons-material/Close";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";

const PremiumBanner = (props) => {
  const dispatch = useDispatch();
  const [Razorpay] = useRazorpay();
  const token = useSelector((state) => state.auth.token);
  const handlePayment = async (params) => {
    const response = await fetch(`http://54.161.122.179:8080/premiumPayment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication: token,
      },
    });

    if (!response.ok) {
      throw new Error("get premium failed");
    }
    const data = await response.json();
    const order = data.order.id;

    var options = {
      key: data.key_id,
      order_id: data.order.id,
      handler: async function (response) {
        try {
          const resp = await fetch(
            `http://54.161.122.179:8080/updatePaymentStatus`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authentication: token,
              },
              body: JSON.stringify({
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
              }),
            }
          );
          if (!resp.ok) {
            throw new Error("Payment failed After Initialization");
          }
          const dt = await resp.json();
          // console.log(dt);
          if (dt.status === "SUCCESS") {
            alert("Congratulations! Premium Membership Activated.");
          }
          dispatch(getProfileDataAsync());
        } catch (er) {
          console.log(er);
          alert("Something went wrong! please try again later");
        }
      },
      prefill: {
        name: "Spendwise-Save money smartly",
        email: "judemoses123@gmail.com",
        contact: "+91 9359362006",
      },
      notes: {
        address: "Spendwise, India",
      },
      theme: {
        color: "#fa6467",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", async function (response) {
      try {
        const failedResponse = await fetch(
          `http://54.161.122.179:8080/paymentFailed`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authentication: token,
            },
            body: JSON.stringify({
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            }),
          }
        );
        if (!failedResponse.ok) {
          throw new Error("failed Updating payment failure status");
        }
        const failedData = await failedResponse.json();
        console.log(failedData);
      } catch (failedErr) {
        console.log(failedErr);
      }
    });

    rzp1.open();

    rzp1.on("payment.failed", async function (response) {
      try {
        const failedResponse = await fetch(
          `http://54.161.122.179:8080/paymentFailed`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authentication: token,
            },
            body: JSON.stringify({
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            }),
          }
        );
        if (!failedResponse.ok) {
          throw new Error("failed Updating payment failure status");
        }
        const failedData = await failedResponse.json();
        console.log(failedData);
      } catch (failedErr) {
        console.log(failedErr);
      }
    });
  };

  return (
    <div className={style.premiumModalBackground}>
      <div className={style.premiumModal}>
        <CloseIcon onClick={props.togglePremiumModal} />
        <h2
          style={{
            width: "100%",
            textAlign: "center",
            margin: "1rem 0",
          }}
        >
          What Premium Offers
        </h2>
        <div
          style={{
            width: "100%",
            display: "grid",
            // backgroundColor: "blue",
            height: "-webkit-fill-available",
            gridTemplateColumns: "1fr",
          }}
        >
          <div className={`${style.gridItem}`}>
            <p>
              Download your transaction reports anytime in various formats, like
              PDF and CSV
            </p>
            <div className={style.reportsImage}></div>
          </div>
          <div
            style={{ flexDirection: "row-reverse" }}
            className={`${style.gridItem}`}
          >
            <p>Don't Hurt your eyes, Unlock our premium dark mode</p>
            <div className={style.darkThemeImage}></div>
          </div>
        </div>
        <button onClick={handlePayment} className={style.getPremiumButtom}>
          Unlock Premium
        </button>
      </div>
    </div>
  );
};

export default PremiumBanner;
