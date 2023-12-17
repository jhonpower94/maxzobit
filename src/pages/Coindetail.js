import { useNavigate } from "react-router-dom";
import HeaderBackButtonCoin from "../components/HeaderBackButtonCoin";
import styles from "./Coindetail.module.css";

const Coindetail = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.coindetail}>
      <HeaderBackButtonCoin coinImage={"/image1@2x.png"} title={"Bitcoin"} />
      <div className={styles.frame}>
        <img className={styles.imageIcon} alt="" src="/image1@2x.png" />
        <button className={styles.frame1}>
          <div className={styles.watch}>Watch</div>
        </button>
      </div>
      <div className={styles.frame2}>
        <div className={styles.div}>$40,124.01</div>
        <div className={styles.div1}>$681.99 (1.73%)</div>
      </div>
      <div className={styles.sendParent}>
        <button className={styles.send} onClick={() => navigate("/send")}>
          <img className={styles.frameIcon} alt="" src="/frame14@2x.png" />
          <div className={styles.frame3}>
            <div className={styles.send1}>Send</div>
          </div>
        </button>
        <button className={styles.send} onClick={() => navigate("/receive")}>
          <img className={styles.frameIcon} alt="" src="/frame15@2x.png" />
          <div className={styles.frame4}>
            <div className={styles.receive1}>Receive</div>
          </div>
        </button>
      </div>
      <div className={styles.frame5}>
        <div className={styles.aboutBitcoin}>About Bitcoin</div>
        <div className={styles.theWorldsFirst}>
          The world’s first cryptocurrency, Bitcoin is stored and exchanged
          securely on the internet through a digital ledger known as a
          blockchain. Bitcoins are divis...
        </div>
        <div className={styles.viewMore}>View more</div>
      </div>
      <div className={styles.marketStatsWrapper}>
        <div className={styles.marketStats}>Market stats</div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.signalCellularAltParent}>
            <img
              className={styles.signalCellularAltIcon}
              alt=""
              src="/signal-cellular-alt@2x.png"
            />
            <div className={styles.marketCap}>Market cap</div>
          </div>
          <div className={styles.billionWrapper}>
            <div className={styles.billion}>$16 billion</div>
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.signalCellularAltParent}>
            <img
              className={styles.signalCellularAltIcon}
              alt=""
              src="/signal-cellular-alt@2x.png"
            />
            <div className={styles.marketCap}>Volume</div>
          </div>
          <div className={styles.billionWrapper}>
            <div className={styles.billion}>$16 billion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coindetail;
