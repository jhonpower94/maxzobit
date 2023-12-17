import SettingsHeader from "../components/SettingsHeader";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.settings}>
      <SettingsHeader />
      <div className={styles.frameParent}>
        <button className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.frame}>
              <img
                className={styles.encryptedIcon}
                alt=""
                src="/encrypted@2x.png"
              />
            </div>
            <div className={styles.connectLedgerWallet}>
              Connect Ledger wallet
            </div>
          </div>
          <img
            className={styles.arrowForwardIosIcon}
            alt=""
            src="/arrow-forward-ios@2x.png"
          />
        </button>
        <button className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.frame}>
              <img
                className={styles.encryptedIcon}
                alt=""
                src="/encrypted@2x.png"
              />
            </div>
            <div className={styles.connectLedgerWallet}>
              Connect Ledger wallet
            </div>
          </div>
          <img
            className={styles.arrowForwardIosIcon}
            alt=""
            src="/arrow-forward-ios@2x.png"
          />
        </button>
        <button className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.frame}>
              <img
                className={styles.encryptedIcon}
                alt=""
                src="/encrypted@2x.png"
              />
            </div>
            <div className={styles.connectLedgerWallet}>
              Connect Ledger wallet
            </div>
          </div>
          <img
            className={styles.arrowForwardIosIcon}
            alt=""
            src="/arrow-forward-ios@2x.png"
          />
        </button>
        <button className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.frame}>
              <img
                className={styles.encryptedIcon}
                alt=""
                src="/encrypted@2x.png"
              />
            </div>
            <div className={styles.connectLedgerWallet}>
              Connect Ledger wallet
            </div>
          </div>
          <img
            className={styles.arrowForwardIosIcon}
            alt=""
            src="/arrow-forward-ios@2x.png"
          />
        </button>
        <button className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.frame}>
              <img
                className={styles.encryptedIcon}
                alt=""
                src="/encrypted@2x.png"
              />
            </div>
            <div className={styles.connectLedgerWallet}>
              Connect Ledger wallet
            </div>
          </div>
          <img
            className={styles.arrowForwardIosIcon}
            alt=""
            src="/arrow-forward-ios@2x.png"
          />
        </button>
      </div>
    </div>
  );
};

export default Settings;
