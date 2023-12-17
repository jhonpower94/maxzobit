import { useMemo } from "react";
import styles from "./HistoryItem.module.css";

const HistoryItem = ({ itemCode, imageCode, frameBorder }) => {
  const frameStyle = useMemo(() => {
    return {
      border: frameBorder,
    };
  }, [frameBorder]);

  return (
    <div className={styles.frame}>
      <div className={styles.frame1}>
        <div className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <div className={styles.frame2} style={frameStyle}>
              <img className={styles.callMadeIcon} alt="" src={itemCode} />
            </div>
          </div>
          <img className={styles.frameIcon} alt="" src={imageCode} />
        </div>
        <div className={styles.frame3}>
          <div className={styles.frame4}>
            <div className={styles.x321248d6}>0x3212…48d6</div>
          </div>
          <div className={styles.frame5}>
            <div className={styles.receive1242}>Receive • 12:42 AM</div>
          </div>
        </div>
      </div>
      <div className={styles.frame6}>
        <div className={styles.matic}>0.001 MATIC</div>
      </div>
    </div>
  );
};

export default HistoryItem;
