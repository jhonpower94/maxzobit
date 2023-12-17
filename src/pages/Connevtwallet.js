import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Connevtwallet.module.css";

const Connevtwallet = () => {
  return (
    <div className={styles.connevtwallet}>
      <HeaderBackButton userImageUrl="Connect" />
      <div className={styles.walletConnectParent}>
        <div className={styles.walletConnect}>Wallet connect</div>
        <div className={styles.separatedBySpace}>
          Separated by space. you can choose to import wallets with 12-word or
          24-word Mnenomics, phrase should be a plain text.
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.secretPhraseParent}>
            <div className={styles.secretPhrase}>Secret phrase</div>
            <textarea
              className={styles.frame}
              placeholder="Enter 12-word phrase"
            />
          </div>
          <button className={styles.fileCopyParent}>
            <img
              className={styles.fileCopyIcon}
              alt=""
              src="/file-copy@2x.png"
            />
            <div className={styles.copyToClipboard}>Copy to clipboard</div>
          </button>
        </div>
        <button className={styles.frame1}>
          <div className={styles.frame2}>
            <div className={styles.frame3}>
              <div className={styles.done}>Done</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Connevtwallet;
