import { Link } from "react-router-dom";
import { CryptoCurrencyFormat, CurrencyFormat } from "../config/services";
import styles from "./AssetItem.module.css";

const AssetItem = ({ coin }) => {
  const { image, balance, balancecoin, coinnane, code, price } = coin;
  return (
    <Link to={"/coin"} state={{ coin: coin }} className={styles.bitcoin}>
      <div className={styles.frameParent}>
        <div
          className={styles.frame}
          style={{ backgroundImage: `url(${image})` }}
        >
          <img className={styles.imageIcon} alt="" src={image} />
        </div>
        <div className={styles.frame1}>
          <div className={styles.frame2}>
            <div className={styles.testnetMatic}>{code}</div>
          </div>
          <div className={styles.dd}>
            <CurrencyFormat amount={price} prefix=" $" seperator={true} />
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
          <CryptoCurrencyFormat amount={balancecoin} suffix={` ${code}`} />
        </div>
      </div>
    </Link>
  );
};

export default AssetItem;
