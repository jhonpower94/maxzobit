import styles from "./SectionCard.module.css";

const SectionCard = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frame}>
        <div className={styles.frame1}>
          <div className={styles.marketCap}>Market cap</div>
        </div>
      </div>
      <div className={styles.frame2}>
        <button className={styles.frameGroup}>
          <img className={styles.frameIcon} alt="" src="/frame12@2x.png" />
          <div className={styles.btcParent}>
            <div className={styles.btc}>BTC</div>
            <div className={styles.div}>$40,127.13</div>
          </div>
          <div className={styles.callMadeParent}>
            <img
              className={styles.callMadeIcon}
              alt=""
              src="/call-made1@2x.png"
            />
            <div className={styles.wrapper}>
              <div className={styles.div1}>1.65%</div>
            </div>
          </div>
        </button>
        <button className={styles.frameGroup}>
          <img className={styles.frameIcon} alt="" src="/frame12@2x.png" />
          <div className={styles.btcParent}>
            <div className={styles.btc}>BTC</div>
            <div className={styles.div}>$40,127.13</div>
          </div>
          <div className={styles.callMadeParent}>
            <img
              className={styles.callMadeIcon}
              alt=""
              src="/call-made1@2x.png"
            />
            <div className={styles.wrapper}>
              <div className={styles.div1}>1.65%</div>
            </div>
          </div>
        </button>
        <button className={styles.frameGroup}>
          <img className={styles.frameIcon} alt="" src="/frame12@2x.png" />
          <div className={styles.btcParent}>
            <div className={styles.btc}>BTC</div>
            <div className={styles.div}>$40,127.13</div>
          </div>
          <div className={styles.callMadeParent}>
            <img
              className={styles.callMadeIcon}
              alt=""
              src="/call-made1@2x.png"
            />
            <div className={styles.wrapper}>
              <div className={styles.div1}>1.65%</div>
            </div>
          </div>
        </button>
        <button className={styles.frameGroup}>
          <img className={styles.frameIcon} alt="" src="/frame12@2x.png" />
          <div className={styles.btcParent}>
            <div className={styles.btc}>BTC</div>
            <div className={styles.div}>$40,127.13</div>
          </div>
          <div className={styles.callMadeParent}>
            <img
              className={styles.callMadeIcon}
              alt=""
              src="/call-made1@2x.png"
            />
            <div className={styles.wrapper}>
              <div className={styles.div1}>1.65%</div>
            </div>
          </div>
        </button>
        <button className={styles.frameGroup}>
          <img className={styles.frameIcon} alt="" src="/frame12@2x.png" />
          <div className={styles.btcParent}>
            <div className={styles.btc}>BTC</div>
            <div className={styles.div}>$40,127.13</div>
          </div>
          <div className={styles.callMadeParent}>
            <img
              className={styles.callMadeIcon}
              alt=""
              src="/call-made1@2x.png"
            />
            <div className={styles.wrapper}>
              <div className={styles.div1}>1.65%</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SectionCard;
