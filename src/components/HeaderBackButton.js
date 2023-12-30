import { useNavigate } from "react-router-dom";
import styles from "./HeaderBackButton.module.css";

const HeaderBackButton = ({ userImageUrl }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.frame}>
      <button className={styles.vectorWrapper} onClick={() => navigate("/")}>
        <img className={styles.vectorIcon} alt="" src="/vector1@2x.png" />
      </button>
      <div className={styles.kyc}>{userImageUrl}</div>
    </div>
  );
};

export default HeaderBackButton;
