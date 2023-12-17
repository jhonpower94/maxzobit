import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Kyc.module.css";

const Kyc = () => {
  return (
    <div className={styles.kyc}>
      <HeaderBackButton userImageUrl="KYC" />
      <div className={styles.verifyIdentificationParent}>
        <div className={styles.verifyIdentification}>Verify identification</div>
        <div className={styles.uploadAnyClear}>
          Upload any clear photo or scanned image of your identity document
        </div>
      </div>
      <div className={styles.frame}>
        <div className={styles.address}>Document type</div>
        <select className={styles.frame1}>
          <option value="Select your country">Placeholder</option>
        </select>
      </div>
      <div className={styles.lightbuttonWrapper}>
        <button className={styles.lightbutton}>
          <div className={styles.uploadId}>Upload ID</div>
        </button>
      </div>
      <div className={styles.kycInner}>
        <div className={styles.frameWrapper}>
          <div className={styles.doneWrapper}>
            <img className={styles.doneIcon} alt="" src="/done@2x.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kyc;
