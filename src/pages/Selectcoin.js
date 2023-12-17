import CoinItem from "../components/Frame 120";
import styles from "./Selectcoin.module.css";

const Selectcoin = () => {
  return (
    <div className={styles.selectcoin}>
      <CoinItem />
      <CoinItem />
    </div>
  );
};

export default Selectcoin;
