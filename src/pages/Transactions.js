import HistoryItem from "../components/HistoryItem";
import styles from "./Transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.transactions}>
      <div className={styles.frame}>
        <div className={styles.transactions1}>Transactions</div>
      </div>
      <div className={styles.frameParent}>
        <HistoryItem
          itemCode="/call-made@2x.png"
          imageCode="/frame@2x.png"
          frameBorder="1px solid var(--color-lightslategray)"
        />
        <HistoryItem
          itemCode="/call-received@2x.png"
          imageCode="/frame1@2x.png"
          frameBorder="1px solid var(--color-mediumblue)"
        />
      </div>
    </div>
  );
};

export default Transactions;
