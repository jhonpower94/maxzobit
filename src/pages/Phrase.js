import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Phrase.module.css";

const Phrase = () => {
  return (
    <div className={styles.phrase}>
      <HeaderBackButton userImageUrl="Phrase" />
      <div className={styles.yourRecoveryPhraseParent}>
        <div className={styles.yourRecoveryPhrase}>Your recovery phrase</div>
        <div className={styles.saveThese12}>
          Save these 12 words in a safe place. Do not share them with anyone,
          even Coinbase. Anyone with your recovery phrase can steal your funds.
        </div>
      </div>
      <div className={styles.frameParent}>
        <textarea className={styles.frame} placeholder="Recovery phrase" />
        <button className={styles.fileCopyParent}>
          <img className={styles.fileCopyIcon} alt="" src="/file-copy@2x.png" />
          <div className={styles.copyToClipboard}>Copy to clipboard</div>
        </button>
      </div>
      <div className={styles.frameWrapper}>
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

export default Phrase;
