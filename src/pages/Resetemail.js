import { useState } from "react";
import HeaderAuth from "../components/HeaderAuth";
import styles from "./Resetemail.module.css";
import { useNavigate } from "react-router-dom";

const Resetemail = () => {
  const navigate = useNavigate();
  const [frameValue, setFrameValue] = useState();
  return (
    <div className={styles.resetemail}>
      <HeaderAuth buttonText="Reset email" rectangleIconWidth="538px" />
      <div className={styles.frame}>
        <div className={styles.address}>Email</div>
        <input
          className={styles.frame1}
          placeholder="Enter Your Email"
          type="text"
          value={frameValue}
          onChange={(event) => setFrameValue(event.target.value)}
        />
      </div>
      <div className={styles.lightbuttonParent}>
        <button className={styles.lightbutton}>
          <div className={styles.resetEmail}>Reset email</div>
        </button>
        <button className={styles.signInWrapper}>
          <button className={styles.signIn} onClick={()=>navigate("/auth/")}>Sign in</button>
        </button>
      </div>
    </div>
  );
};

export default Resetemail;
