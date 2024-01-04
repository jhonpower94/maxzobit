import styles from "./Frame.module.css";

const Frame = () => {
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
      <div className={styles.installForIosWrapper}>
        <div className={styles.installForIos}>Install for IOS</div>
      </div>
      <button className={styles.frame4}>
        <div className={styles.install}>Install</div>
      </button>
    </div>
  );
};

export default Frame;
