import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Receivesingle.module.css";

const Receivesingle = () => {
  return (
    <div className={styles.receivesingle}>
      <HeaderBackButton userImageUrl="Receive" />
      <div className={styles.frameParent}>
        <div className={styles.frame}>
          <div className={styles.vectorParent}>
            <img className={styles.vectorIcon} alt="" src="/vector6@2x.png" />
            <img className={styles.frameChild} alt="" src="/ellipse-1@2x.png" />
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.maticAddressParent}>
            <div className={styles.maticAddress}>MATIC address</div>
            <div className={styles.xc9d36ef3}>0xC9d3...6ef3</div>
          </div>
          <button className={styles.frame1}>
            <div className={styles.copy}>Copy</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receivesingle;
