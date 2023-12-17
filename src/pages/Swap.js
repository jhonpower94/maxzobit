import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Swap.module.css";

const Swap = () => {
  return (
    <div className={styles.swap}>
      <HeaderBackButton userImageUrl="Swap" />
      <div className={styles.frameParent}>
        <div className={styles.frame}>
          <div className={styles.frameGroup}>
            <button className={styles.frame1}>
              <div className={styles.wrapperImage}>
                <img className={styles.imageIcon} alt="" src="/image2@2x.png" />
              </div>
              <div className={styles.eth}>ETH</div>
              <img
                className={styles.keyboardArrowDownIcon}
                alt=""
                src="/keyboard-arrow-down1@2x.png"
              />
            </button>
            <div className={styles.div}>13053021</div>
          </div>
          <div className={styles.frame2}>
            <div className={styles.balance0}>Balance: 0</div>
            <div className={styles.div1}>$13,289,820.00</div>
          </div>
          <div className={styles.notEnoughEth}>Not enough ETH</div>
        </div>
        <div className={styles.frame3}>
          <div className={styles.frameGroup}>
            <button className={styles.frame4}>
              <div className={styles.wrapperImage}>
                <img className={styles.imageIcon} alt="" src="/image2@2x.png" />
              </div>
              <div className={styles.eth}>ETH</div>
              <img
                className={styles.keyboardArrowDownIcon}
                alt=""
                src="/keyboard-arrow-down2@2x.png"
              />
            </button>
            <div className={styles.wrapper}>
              <div className={styles.div}>13053021</div>
            </div>
          </div>
          <div className={styles.frame2}>
            <div className={styles.balance0}>Balance: 0</div>
            <div className={styles.div1}>$13,289,820.00</div>
          </div>
          <div className={styles.notEnoughEth}>Not enough ETH</div>
        </div>
        <div className={styles.frame6}>
          <img className={styles.southIcon} alt="" src="/south@2x.png" />
        </div>
      </div>
      <div className={styles.frameDiv}>
        <div className={styles.frameParent1}>
          <div className={styles.frame7}>
            <div className={styles.quoteRate}>Quote rate</div>
            <div className={styles.frame8}>
              <div className={styles.div4}>1</div>
              <div className={styles.eth2}>ETH</div>
              <div className={styles.div4}>=</div>
              <div className={styles.div6}>2175.5</div>
              <div className={styles.dai}>DAI</div>
            </div>
          </div>
          <div className={styles.frame9}>
            <div className={styles.frame10}>
              <div className={styles.div}>Estimated gas fee</div>
              <img className={styles.vectorIcon} alt="" src="/vector5@2x.png" />
            </div>
            <div className={styles.frame11}>
              <div className={styles.ethWrapper}>
                <div className={styles.eth3}>0.01993 ETH</div>
              </div>
              <div className={styles.div7}>$44.14</div>
            </div>
          </div>
        </div>
        <div className={styles.frame12}>
          <div className={styles.maxFee}>Max fee:</div>
          <div className={styles.div8}>$133.47</div>
        </div>
      </div>
      <div className={styles.frame13}>
        <div className={styles.maxFee}>Includes a 0.875% MetaMask fee –</div>
        <div className={styles.viewAllQuotes}>view all quotes</div>
      </div>
      <div className={styles.frameWrapper}>
        <button className={styles.frame14}>
          <div className={styles.swap1}>Swap</div>
        </button>
      </div>
    </div>
  );
};

export default Swap;
