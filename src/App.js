import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { TransDetailDailog } from "./components/HistoryDetails";
import { SocketContext, socket } from "./context/socket";
import Allcoins from "./pages/Allcoins";
import Coindetail from "./pages/Coindetail";
import Connevtwallet from "./pages/Connevtwallet";
import Explore from "./pages/Explore";
import HomeAssets, { Activity, Assets, Nfts } from "./pages/HomeAssets";
import Kyc from "./pages/Kyc";
import Login from "./pages/Login";
import Phrase from "./pages/Phrase";
import Profile from "./pages/Profile";
import Receive from "./pages/Receive";
import Receivesingle from "./pages/Receivesingle";
import Resetemail from "./pages/Resetemail";
import Send from "./pages/Send";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Swap from "./pages/Swap";
import Transactions from "./pages/Transactions";
import { DashboardIndex } from "./pages/dashboard";
import Notifications from "./pages/notification";
import TabIndex from "./pages/tabindex";

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
              { path: "/activities/:userid", element: <Activity /> },
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
  return (
    
      <SocketContext.Provider value={socket}>
        <RouterProvider router={router} />
      </SocketContext.Provider>
   
  );
}
export default App;

/* <ShowButtonDevice />
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
*/
