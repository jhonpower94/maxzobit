import { useSelector } from "react-redux";
import SendCoinItem from "../components/SendCoinItem";
import styles from "./Allcoins.module.css";
import HeaderBackButton from "../components/HeaderBackButton";

const Allcoins = () => {
  const walletData = useSelector((state) => state.walletsData);
  return (
    <div className={styles.allcoins}>
      <HeaderBackButton userImageUrl="Send" />
      <div className={styles.coinlist}>
        {walletData.map((coin, index) => (
          <SendCoinItem coin={coin} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Allcoins;
