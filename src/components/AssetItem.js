import { Link } from "react-router-dom";
import { CurrencyFormat } from "../config/services";
import styles from "./AssetItem.module.css";
import { CryptoFormater } from "../config/services";

const AssetItem = ({ coin }) => {
  /*
  const [value, setValue] = useState(0);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("https://stackcoinserver.onrender.com");
    function onConnect() {
      console.log("connected to server");
      if (amount > 0) {
        socket.current.emit("convert", {
          from: "USDT",
          to: "ETH",
          amount: amount,
        });
      }
    }

    function onConvrtEvent(data) {
      setValue(data);
    }

    function onDisconnect() {
      console.log("socket disconnected ");

      socket.current.on("connect", onConnect);
    }
    socket.current.on("connect", onConnect);
    socket.current.on("convert", onConvrtEvent);
    socket.current.on("disconnect", onDisconnect);

    return () => {
      socket.current.off("connect", onConnect);
      socket.current.off("disconnect", onDisconnect);
      socket.current.off("convert", onConvrtEvent);
    };
  }, []);
*/
  const { image, networkimage, balance, difference, code, symbol, price } =
    coin;
  return (
    <Link to={"/coin"} state={{ coin: coin }} className={styles.bitcoin}>
      <div className={styles.frameParent}>
        <div
          className={styles.frame}
          style={{ backgroundImage: `url(${image})` }}
        >
          <img className={styles.imageIcon} alt="" src={networkimage} />
        </div>
        <div className={styles.frame1}>
          <div className={styles.frame2}>
            <div className={styles.testnetMatic}>{code}</div>
          </div>
          <div className={styles.dd}>
            <CurrencyFormat amount={price} prefix=" $" seperator={true} />
            <span
              style={{ marginLeft: 5, color: difference < 0 ? "red" : "green" }}
            >
              {difference.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      <div className={styles.frame3}>
        <div className={styles.frame4}>
          <div className={styles.matic}>
            
            <CurrencyFormat amount={balance} prefix="$" seperator={true} />
          </div>
        </div>
        <div className={styles.usdt}>
        <CryptoFormater amount={balance} suffix={symbol} />
          
        </div>
      </div>
    </Link>
  );
};

export default AssetItem;
/*
<CryptoFormater amount={balance} suffix={` ${code}`} />
*/