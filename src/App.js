import { Backdrop } from "@mui/material";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { db } from "../src/config/firebase";
import { CustomCirleLoader } from "./components/loader";
import Coindetail from "./pages/Coindetail";
import Explore from "./pages/Explore";
import HomeAssets, { Activity, Assets, Nfts } from "./pages/HomeAssets";
import Login from "./pages/Login";
import Phrase from "./pages/Phrase";
import Receive from "./pages/Receive";
import Receivesingle from "./pages/Receivesingle";
import Resetemail from "./pages/Resetemail";
import Send from "./pages/Send";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Swap from "./pages/Swap";
import Transactions from "./pages/Transactions";
import TabIndex from "./pages/tabindex";
import CryptoConvert from "crypto-convert";
import { useDispatch } from "react-redux";
import { userinfo$, walletData$ } from "./redux/action";
import axios from "axios";
import axiosRetry from "axios-retry";

const convert = new CryptoConvert(/*options?*/);
const convt = async () => {
  const y = await convert.ready();
  return y;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardIndex />,
    children: [
      {
        path: "/",
        element: <TabIndex />,
        children: [
          {
            path: "/",
            element: <HomeAssets />,
            children: [
              { path: "/", element: <Assets /> },
              { path: "/nfts", element: <Nfts /> },
              { path: "/activities", element: <Activity /> },
            ],
          },
          {
            path: "/explore",
            element: <Explore />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "/swap",
        element: <Swap />,
      },
      {
        path: "/send",
        element: <Send />,
      },
      {
        path: "/receivecoin",
        element: <Receivesingle />,
      },
      {
        path: "/receive",
        element: <Receive />,
      },
      {
        path: "/coin",
        element: <Coindetail />,
      },
      {
        path: "/Phrase",
        element: <Phrase />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      { path: "/auth", element: <Login /> },
      { path: "/auth/register", element: <Signup /> },
      { path: "/auth/resetpass", element: <Resetemail /> },
      { path: "/auth/email", element: <Resetemail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;

export function DashboardIndex() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [unitcoinprice, setUnitcoinPrice] = useState({
    btc: { amount: 0, difference: 0 },
    usdt: { amount: 0, difference: 0 },
    eth: { amount: 0, difference: 0 },
    bnb: { amount: 0, difference: 0 },
    trx: { amount: 0, difference: 0 },
  });

  const id = "speso0n1xbPRYFiiTcQiykHJHXR2";
  const ref = doc(db, "users", id);
  const user = useFirestoreDocumentData(["users", id], ref);

  const getPriceData = () => {};

  if (user.isSuccess) {
    const userData = user.data;
    const {
      btc_balance,
      bnb_balance,
      tron_balance,
      eth_balance,
      usdt_balance,
      usdterc20_balance,
    } = userData;

    //totalbalance
    const totalbalance = [
      btc_balance,
      bnb_balance,
      tron_balance,
      eth_balance,
      usdt_balance,
      usdterc20_balance,
    ].reduce((prv, cur) => {
      return prv + cur;
    }, 0);

    dispatch(userinfo$({ ...userData, id: id, totalBalance: totalbalance }));

    console.log(user.data);

    dispatch(
      walletData$([
        {
          coinname: "BITCOIN",
          cointype: "btc_balance",
          price: unitcoinprice.btc.amount,
          difference: unitcoinprice.btc.difference,
          balance: btc_balance,
          //  balancecoin: convert.USD.BTC(`${btc_balance}`),
          code: "BTC",
          image: "./images/coins/btc.svg",
          address: "bc1q6g33zjt9dvwxarvnf7m8td22ucfkuujsjsyyfz",
        },
        {
          coinname: "ETHERUEM",
          cointype: "eth_balance",
          price: unitcoinprice.eth.amount,
          difference: unitcoinprice.eth.difference,
          balance: eth_balance,
          // balancecoin: convert.USD.ETH(`${eth_balance}`),
          code: "ETH",
          image: "./images/coins/eth.svg",
          address: "0xf63feb4A25a015226b89E2eEAD6cC95beC748374",
        },
        {
          coinname: "BNB SMART",
          cointype: "bnb_balance",
          price: unitcoinprice.bnb.amount,
          difference: unitcoinprice.bnb.difference,
          balance: bnb_balance,
          //  balancecoin: convert.USD.BNB(`${bnb_balance}`),
          code: "BNB",
          image: "./images/coins/bnb.svg",
          address: "0xf63feb4A25a015226b89E2eEAD6cC95beC748374",
        },
        {
          coinname: "TRON",
          cointype: "tron_balance",
          price: unitcoinprice.trx.amount,
          difference: unitcoinprice.trx.difference,
          balance: tron_balance,
          //  balancecoin: convert.USD.TRX(`${tron_balance}`),
          code: "TRX",
          image: "./images/coins/trx.svg",
          address: "TJts2hDfyFgGr36r1X8bMJLMRPa8yiewho",
        },
        {
          coinname: "USDT (TRC20)",
          cointype: "usdt_balance",
          price: unitcoinprice.usdt.amount,
          difference: unitcoinprice.usdt.difference,
          balance: usdt_balance,
          //  balancecoin: convert.USD.USDT(`${usdt_balance}`),
          code: "USDT (TRC20)",
          image: "./images/coins/usdt.svg",
          address: "TJts2hDfyFgGr36r1X8bMJLMRPa8yiewho",
        },
        {
          coinname: "USDT(ERC20)",
          cointype: "usdterc20_balance",
          price: unitcoinprice.usdt.amount,
          difference: unitcoinprice.usdt.difference,
          balance: usdterc20_balance,
          //  balancecoin: convert.USD.USDT(`${usdterc20_balance}`),
          code: "USDT(ERC20)",
          image: "./images/coins/usdt(erc20).svg",
          address: "0xf63feb4A25a015226b89E2eEAD6cC95beC748374",
        },
      ])
    );
  }

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Ctron%2Ctether%2C&vs_currencies=usd&include_24hr_change=true"
      )
      .then((res) => {
        console.log(res.data);
        setUnitcoinPrice({
          btc: {
            amount: res.data.bitcoin.usd,
            difference: res.data.bitcoin.usd_24h_change,
          },
          usdt: {
            amount: res.data.tether.usd,
            difference: res.data.tether.usd_24h_change,
          },
          eth: {
            amount: res.data.ethereum.usd,
            difference: res.data.ethereum.usd_24h_change,
          },
          bnb: {
            amount: res.data.binancecoin.usd,
            difference: res.data.binancecoin.usd_24h_change,
          },
          trx: {
            amount: res.data.tron.usd,
            difference: res.data.tron.usd_24h_change,
          },
        });
      });
    axiosRetry(axios, { retries: 10, retryDelay: axiosRetry.exponentialDelay });
  }, []);

  return (
    <>
      <Outlet />
      <Backdrop
        sx={{ backgroundColor: "rgb(255 255 255 / 50%)" }}
        open={loading}
      >
        <CustomCirleLoader />
      </Backdrop>
    </>
  );
}

export function ConvertCoin({ key, amount }) {
  const [value, setValue] = useState(0);

  convt().then((cvt) => {
    const switchCoinsprice = () => {
      switch (key) {
        case "Tron":
          return cvt.USD.TRX(amount);
        default:
          return cvt.USD.USDT(amount);
      }
    };
    const returnValue = switchCoinsprice();
    setValue(returnValue);
    console.log(returnValue);
  });

  return value;
}
