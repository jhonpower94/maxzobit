import { useSelector } from "react-redux";
import HeaderBackButton from "../components/HeaderBackButton";
import RecieveCard from "../components/RecieveCard";
import styles from "./Receive.module.css";

const Receive = () => {
  const walletData = useSelector((state) => state.walletsData);
  return (
    <div className={styles.receive}>
      <HeaderBackButton userImageUrl="Receive" />
      <div className={styles.frameParent}>
        {walletData.map((coin, index) => (
          <RecieveCard coin={coin} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Receive;
