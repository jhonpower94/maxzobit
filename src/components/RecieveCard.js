import styles from "./RecieveCard.module.css";

const RecieveCard = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.yourSolanaAddressParent}>
        <div className={styles.yourSolanaAddress}>Your Solana address</div>
        <div className={styles.mkz6qaujb5nsymzcyzarctrecc2a3h}>
          9mKZ6qAujB5nSYmzCYZArCtreCC2a3H9Gv8ctEGNzkV8
        </div>
        <img className={styles.imageIcon} alt="" src="/image@2x.png" />
      </div>
      <div className={styles.frame}>
        <button className={styles.frame1}>
          <img className={styles.vectorIcon} alt="" src="/vector2@2x.png" />
        </button>
        <button className={styles.frame1}>
          <img className={styles.vectorIcon1} alt="" src="/vector3@2x.png" />
        </button>
      </div>
    </div>
  );
};

export default RecieveCard;
