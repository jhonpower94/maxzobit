import styles from "./CoinItem.module.css";

const CoinItem = () => {
  return (
    <button className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <img className={styles.frameChild} alt="" src="/frame-118@2x.png" />
        <div className={styles.bitcoin}>Bitcoin</div>
      </div>
      <div className={styles.arrowForwardIosWrapper}>
        <img
          className={styles.arrowForwardIosIcon}
          alt=""
          src="/arrow-forward-ios@2x.png"
        />
      </div>
    </button>
  );
};

export default CoinItem;
