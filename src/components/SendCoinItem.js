import { Link } from "react-router-dom";
import { CurrencyFormat } from "../config/services";
import styles from "./SendCoinItem.module.css";
import { CryptoFormater } from "../config/services";


const SendCoinItem = ({ coin }) => {
  const { image, networkimage, coinname, balance, balancecoin, code } = coin;
  return (
    <Link className={styles.bitcoin} to="/send" state={{ coin: coin }}>
      <div className={styles.frameParent}>
        <div
          className={styles.frame}
          style={{ backgroundImage: `url(${image})` }}
        >
          <img className={styles.imageIcon} alt="" src={networkimage} />
        </div>
        <div className={styles.frame1}>
          <div className={styles.testnetMatic}>{coinname}</div>
        </div>
      </div>
      <div className={styles.frame2}>
        <div className={styles.frame3}>
          <div className={styles.div}>
            <CurrencyFormat amount={balance} prefix=" $" seperator={true} />
          </div>
        </div>
        <div className={styles.frame4}>
          <div className={styles.btc}>
            <CryptoFormater amount={balance} suffix={code} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SendCoinItem;
