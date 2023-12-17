import styles from "./SettingsHeader.module.css";

const SettingsHeader = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frame}>
        <div className={styles.rectangle} />
        <div className={styles.rectangle}>
          <div className={styles.rectangle} />
          <div className={styles.rectangle}>
            <div className={styles.rectangle} />
            <div className={styles.frame3}>
              <div className={styles.rectangle3} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.jhonpower94cbidParent}>
        <div className={styles.jhonpower94cbid}>jhonpower94.cb.id</div>
        <div className={styles.div}>$0.00</div>
      </div>
    </div>
  );
};

export default SettingsHeader;
