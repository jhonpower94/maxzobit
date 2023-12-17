import { useNavigate } from "react-router-dom";
import styles from "./HeaderBackButtonCoin.module.css";

const HeaderBackButtonCoin = ({ coinImage, title }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.frame}>
      <button className={styles.vectorWrapper} onClick={() => navigate(-1)}>
        <img className={styles.vectorIcon} alt="" src="/vector4@2x.png" />
      </button>
      <div className={styles.frame1}>
        <img className={styles.frameIcon} alt="" src={coinImage} />
        <div className={styles.bitcoin}>{title}</div>
      </div>
    </div>
  );
};

export default HeaderBackButtonCoin;
