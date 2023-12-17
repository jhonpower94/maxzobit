import { useMemo } from "react";
import styles from "./AssetItem.module.css";
import { Link } from "react-router-dom";

const AssetItem = ({
  frameImageUrl,
  frameIconUrl,
  propCursor,
  propBackgroundImage,
}) => {
  const bitcoinStyle = useMemo(() => {
    return {
      cursor: propCursor,
    };
  }, [propCursor]);

  const frame1Style = useMemo(() => {
    return {
      backgroundImage: propBackgroundImage,
    };
  }, [propBackgroundImage]);

  return (
    <Link to="coin" className={styles.bitcoin} style={bitcoinStyle}>
      <div className={styles.frameParent}>
        <div className={styles.frame} style={frame1Style}>
          <img className={styles.imageIcon} alt="" src={frameIconUrl} />
        </div>
        <div className={styles.frame1}>
          <div className={styles.frame2}>
            <div className={styles.frame3}>
              <div className={styles.testnetMatic}>Testnet Matic</div>
            </div>
            <div className={styles.frame4}>
              <div className={styles.matic}>MATIC</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.frame5}>
        <div className={styles.frame6}>
          <div className={styles.matic1}>0.1 MATIC</div>
        </div>
        <div className={styles.frame7}>
          <div className={styles.chainId80001}>Chain ID: 80001</div>
        </div>
      </div>
    </Link>
  );
};

export default AssetItem;
