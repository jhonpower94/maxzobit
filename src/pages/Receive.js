import HeaderBackButton from "../components/HeaderBackButton";
import RecieveCard from "../components/RecieveCard";
import styles from "./Receive.module.css";

const Receive = () => {
  return (
    <div className={styles.receive}>
      <HeaderBackButton userImageUrl="Receive" />
      <div className={styles.frameParent}>
        <RecieveCard />
        <div className={styles.frameGroup}>
          <div className={styles.yourSolanaAddressParent}>
            <div className={styles.yourSolanaAddress}>Your Solana address</div>
            <div className={styles.mkz6qaujb5nsymzcyzarctrecc2a3h}>
              9mKZ6qAujB5nSYmzCYZArCtreCC2a3H9Gv8ctEGNzkV8
            </div>
            <img className={styles.imageIcon} alt="" src="/image@2x.png" />
          </div>
          <div className={styles.frame}>
            <img className={styles.frameIcon} alt="" src="/frame8@2x.png" />
            <img className={styles.frameIcon} alt="" src="/frame9@2x.png" />
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.yourSolanaAddressParent}>
            <div className={styles.yourSolanaAddress}>Your Solana address</div>
            <div className={styles.mkz6qaujb5nsymzcyzarctrecc2a3h}>
              9mKZ6qAujB5nSYmzCYZArCtreCC2a3H9Gv8ctEGNzkV8
            </div>
            <img className={styles.imageIcon} alt="" src="/image@2x.png" />
          </div>
          <div className={styles.frame}>
            <img className={styles.frameIcon} alt="" src="/frame8@2x.png" />
            <img className={styles.frameIcon} alt="" src="/frame9@2x.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receive;
