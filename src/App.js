import { Backdrop } from "@mui/material";
import { Component, useEffect, useState } from "react";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { auth, db, onAuthStateChanged } from "../src/config/firebase";
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
import { useDispatch } from "react-redux";
import { convert, getNotification } from "./config/services";
import Profile from "./pages/Profile";
import Allcoins from "./pages/Allcoins";
import Connevtwallet from "./pages/Connevtwallet";
import { doc, getDoc } from "firebase/firestore";
import { coinData$, userinfo$, walletData$ } from "./redux/action";
import axios from "axios";
import axiosRetry from "axios-retry";
import Kyc from "./pages/Kyc";
import { TransDetailDailog } from "./components/HistoryDetails";
import Notifications from "./pages/notification";
import { InstallPWA, InstallPWAiOS } from "./pwainstallbutton";

class ShowButtonDevice extends Component {
  constructor(props) {
    super(props);

    // Initializing the state
    this.state = { os: "" };
  }
  detectOS = () => {
    const platform = navigator.platform;
    if (platform.indexOf("Win") !== -1) return "Windows";
    if (platform.indexOf("Mac") !== -1) return "Mac OS";
    if (platform.indexOf("Linux") !== -1) return "Linux";
    if (platform.indexOf("iPhone") !== -1) return "iOS";
    if (platform.indexOf("Android") !== -1) return "Android";
    if (platform.indexOf("iPad") !== -1) return "iPad";
    return "Unknown";
  };

  componentDidMount() {
    const detectos = this.detectOS();
    console.log(detectos);
    this.setState({ os: detectos });
  }

  render() {
    if (this.state.os === "iOS") {
      return <InstallPWAiOS os={this.state.os} />;
    } else {
      return <InstallPWA />;
    }
  }
}

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
        path: "/allcoin",
        element: <Allcoins />,
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
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/connect",
        element: <Connevtwallet />,
      },
      {
        path: "/kyc",
        element: <Kyc />,
      },
      {
        path: "detail",
        element: <TransDetailDailog />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      { path: "/auth", element: <Login /> },
      { path: "/auth/register", element: <Signup /> },
      { path: "/auth/reset/:action", element: <Resetemail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;

export function DashboardIndex() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const id = user.uid;

        const docRef = doc(db, "users", id);
        getDoc(docRef)
          .then((doc) => {
            const userData = doc.data();
            console.log(userData);
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

            dispatch(
              userinfo$({ ...userData, id: id, totalBalance: totalbalance })
            );

            (async function () {
              const conv = await convert.ready();
              axios
                .get(
                  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Ctron%2Ctether%2Csora%2Csakura%2Cconvergence%2Cbarnbridge%2Ckira%2Cbakerytoken&vs_currencies=USD&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true"
                )
                .then((res) => {
                  console.log(res.data);
                  const dataArray = [
                    {
                      title: "ethereum",
                      symbol: "eth",
                      image: "./images/coins/eth.png",
                      price: res.data.ethereum.usd,
                      usd_market_cap: res.data.ethereum.usd_market_cap,
                      usd_24h_vol: res.data.ethereum.usd_24h_vol,
                      usd_24h_change: res.data.ethereum.usd_24h_change,
                    },
                    {
                      title: "binancecoin",
                      symbol: "bnb",
                      image: "./images/coins/bnb.png",
                      price: res.data.binancecoin.usd,
                      usd_market_cap: res.data.binancecoin.usd_market_cap,
                      usd_24h_vol: res.data.binancecoin.usd_24h_vol,
                      usd_24h_change: res.data.binancecoin.usd_24h_change,
                    },
                    {
                      title: "bitcoin",
                      symbol: "btc",
                      image: "./images/coins/btc.png",
                      price: res.data.bitcoin.usd,
                      usd_market_cap: res.data.bitcoin.usd_market_cap,
                      usd_24h_vol: res.data.bitcoin.usd_24h_vol,
                      usd_24h_change: res.data.bitcoin.usd_24h_change,
                    },
                    {
                      title: "tether",
                      image: "./images/coins/usdt.png",
                      price: res.data.tether.usd,
                      usd_market_cap: res.data.tether.usd_market_cap,
                      usd_24h_vol: res.data.tether.usd_24h_vol,
                      usd_24h_change: res.data.tether.usd_24h_change,
                    },
                    {
                      title: "tron",
                      price: res.data.tron.usd,
                      image: "./images/coins/tron.png",
                      usd_market_cap: res.data.tron.usd_market_cap,
                      usd_24h_vol: res.data.tron.usd_24h_vol,
                      usd_24h_change: res.data.tron.usd_24h_change,
                    },
                    {
                      title: "bakerytoken",
                      symbol: "bake",
                      image: "./images/coins/bakerytoken.png",
                      price: res.data.bakerytoken.usd,
                      usd_market_cap: res.data.bakerytoken.usd_market_cap,
                      usd_24h_vol: res.data.bakerytoken.usd_24h_vol,
                      usd_24h_change: res.data.bakerytoken.usd_24h_change,
                    },
                    {
                      title: "barnbridge",
                      symbol: "bond",
                      image: "./images/coins/barnbrigde.png",
                      price: res.data.barnbridge.usd,
                      usd_market_cap: res.data.barnbridge.usd_market_cap,
                      usd_24h_vol: res.data.barnbridge.usd_24h_vol,
                      usd_24h_change: res.data.barnbridge.usd_24h_change,
                    },
                    {
                      title: "convergence",
                      symbol: "conv",
                      image: "./images/coins/convergence.png",
                      price: res.data.convergence.usd,
                      usd_market_cap: res.data.convergence.usd_market_cap,
                      usd_24h_vol: res.data.convergence.usd_24h_vol,
                      usd_24h_change: res.data.convergence.usd_24h_change,
                    },

                    {
                      title: "kira",
                      symbol: "kira",
                      image: "./images/coins/kex.png",
                      price: res.data.kira.usd,
                      usd_market_cap: res.data.kira.usd_market_cap,
                      usd_24h_vol: res.data.kira.usd_24h_vol,
                      usd_24h_change: res.data.kira.usd_24h_change,
                    },
                    {
                      title: "sakura",
                      image: "./images/coins/sakura.png",
                      price: res.data.sakura.usd,
                      usd_market_cap: res.data.sakura.usd_market_cap,
                      usd_24h_vol: res.data.sakura.usd_24h_vol,
                      usd_24h_change: res.data.sakura.usd_24h_change,
                    },
                    {
                      title: "sora",
                      image: "./images/coins/xor.png",
                      price: res.data.sora.usd,
                      usd_market_cap: res.data.sora.usd_market_cap,
                      usd_24h_vol: res.data.sora.usd_24h_vol,
                      usd_24h_change: res.data.sora.usd_24h_change,
                    },
                  ];
                  dispatch(coinData$(dataArray));
                  dispatch(
                    walletData$([
                      {
                        coinname: "BITCOIN",
                        cointype: "btc_balance",
                        price: res.data.bitcoin.usd,
                        difference: res.data.bitcoin.usd_24h_change,
                        balance: btc_balance,
                        balancecoin: conv.USD.BTC(`${btc_balance}`),
                        code: "BTC",
                        image: "./images/coins/btc.png",
                        address: "bc1q6g33zjt9dvwxarvnf7m8td22ucfkuujsjsyyfz",
                        volume: res.data.bitcoin.usd_24h_vol,
                        marketcap: res.data.bitcoin.usd_market_cap,
                        discription:
                          "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto.  It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.",
                      },
                      {
                        coinname: "ETHERUEM",
                        cointype: "eth_balance",
                        price: res.data.ethereum.usd,
                        difference: res.data.ethereum.usd_24h_change,
                        volume: res.data.ethereum.usd_24h_vol,
                        marketcap: res.data.ethereum.usd_market_cap,
                        balance: eth_balance,
                        balancecoin: conv.USD.ETH(`${eth_balance}`),
                        code: "ETH",
                        image: "./images/coins/eth.png",
                        address: "0xf63feb4A25a015226b89E2eEAD6cC95beC748374",
                        discription:
                          "Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in order to program digital value.",
                      },
                      {
                        coinname: "BNB SMART",
                        cointype: "bnb_balance",
                        price: res.data.binancecoin.usd,
                        difference: res.data.binancecoin.usd_24h_change,
                        volume: res.data.binancecoin.usd_24h_vol,
                        marketcap: res.data.binancecoin.usd_market_cap,
                        balance: bnb_balance,
                        balancecoin: conv.USD.BNB(`${bnb_balance}`),
                        code: "BNB",
                        image: "./images/coins/bnb.png",
                        address: "0xf63feb4A25a015226b89E2eEAD6cC95beC748374",
                        discription:
                          "Binance Coin is the cryptocurrency of the Binance platform. It is a trading platform exclusively for cryptocurrencies. The name Binance is a combination of binary and finance. Thus, the startup name shows that only cryptocurrencies can be traded against each other. The platform achieved an enormous success within a very short time and is focused on worldwide market with Malta headquarters.",
                      },
                      {
                        coinname: "TRON",
                        cointype: "tron_balance",
                        price: res.data.tron.usd,
                        difference: res.data.tron.usd_24h_change,
                        volume: res.data.tron.usd_24h_vol,
                        marketcap: res.data.tron.usd_market_cap,
                        balance: tron_balance,
                        balancecoin: conv.USD.TRX(`${tron_balance}`),
                        code: "TRX",
                        image: "./images/coins/tron.png",
                        address: "TJts2hDfyFgGr36r1X8bMJLMRPa8yiewho",
                        discription:
                          "Tron's mission is to build a truly decentralized internet and aims to be the largest blockchain-based operating system in the world, known as the TRON protocol. The TRON protocol will offer high scalability, high availability, and high throughput computing to serve decentralized applications via smart contracts. Ethereum EVM-based smart contracts will be compatible and deployable on the TRON network as such Solidity developers do not have to rewrite their applications.",
                      },
                      {
                        coinname: "USDT-Trc20",
                        cointype: "usdt_balance",
                        price: res.data.tether.usd,
                        difference: res.data.tether.usd_24h_change,
                        volume: res.data.tether.usd_24h_vol,
                        marketcap: res.data.tether.usd_market_cap,
                        balance: usdt_balance,
                        balancecoin: conv.USD.USDT(`${usdt_balance}`),
                        code: "USDT trc20",
                        image: "./images/coins/usdt.png",
                        address: "TJts2hDfyFgGr36r1X8bMJLMRPa8yiewho",
                        discription:
                          "Tether (USDT) is a cryptocurrency with a value meant to mirror the value of the U.S. dollar. The idea was to create a stable cryptocurrency that can be used like digital dollars. Coins that serve this purpose of being a stable dollar substitute are called “stable coins.” Tether is the most popular stable coin and even acts as a dollar replacement on many popular exchanges! According to their site, Tether converts cash into digital currency, to anchor or “tether” the value of the coin to the price of national currencies like the US dollar, the Euro, and the Yen.",
                      },
                      {
                        coinname: "USDT-Erc20",
                        cointype: "usdterc20_balance",
                        price: res.data.tether.usd,
                        difference: res.data.tether.usd_24h_change,
                        volume: res.data.tether.usd_24h_vol,
                        marketcap: res.data.tether.usd_market_cap,
                        balance: usdterc20_balance,
                        balancecoin: conv.USD.USDT(`${usdterc20_balance}`),
                        code: "USDT erc20",
                        image: "./images/coins/usdt.png",
                        address: "0xf63feb4A25a015226b89E2eEAD6cC95beC748374",
                        discription:
                          "Tether (USDT) is a cryptocurrency with a value meant to mirror the value of the U.S. dollar. The idea was to create a stable cryptocurrency that can be used like digital dollars. Coins that serve this purpose of being a stable dollar substitute are called “stable coins.” Tether is the most popular stable coin and even acts as a dollar replacement on many popular exchanges! According to their site, Tether converts cash into digital currency, to anchor or “tether” the value of the coin to the price of national currencies like the US dollar, the Euro, and the Yen.",
                      },
                    ])
                  );
                })
                .then(() => {
                  setLoading(false);
                })
                .catch((error) => console.log(error));

              axiosRetry(axios, {
                retries: 4,
                // retryDelay: axiosRetry.exponentialDelay,
              });
            })();
          })
          .catch((err) => {
            console.log(err);
          });
        getNotification(user.uid);
      } else {
        navigate("/auth");
      }
    });
  }, []);

  return (
    <>
      <Outlet />
      <ShowButtonDevice />
      <Backdrop
        sx={{ backgroundColor: "rgb(255 255 255 / 50%)" }}
        open={loading}
      >
        <CustomCirleLoader />
      </Backdrop>
    </>
  );
}
