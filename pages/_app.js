import { Provider } from "react-redux";
import store from "../Store/Store";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const poppins = Poppins({ weight: "300", style: "normal", subsets: ["latin"] });
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <main className={poppins.className}>
        <NextTopLoader color="#fa6467" showSpinner={false} />
        <Component {...pageProps} />
      </main>
    </Provider>
  );
};
export default MyApp;
