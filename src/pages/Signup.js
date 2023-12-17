import { useState } from "react";
import HeaderAuth from "../components/HeaderAuth";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [frameValue, setFrameValue] = useState();
  const [frame1Value, setFrame1Value] = useState();
  const [frame2Value, setFrame2Value] = useState();
  return (
    <div className={styles.signup}>
      <HeaderAuth
        buttonText="Sign Up"
        rectangleIconWidth="unset"
        rectangleIconAlignSelf="stretch"
        rectangleIconHeight="223px"
      />
      <div className={styles.frameParent}>
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
        <div className={styles.frame}>
          <div className={styles.address}>Password</div>
          <input
            className={styles.frame1}
            placeholder="Enter Your password"
            type="text"
            value={frame1Value}
            onChange={(event) => setFrame1Value(event.target.value)}
          />
        </div>
        <div className={styles.frame}>
          <div className={styles.address}>Confirm password</div>
          <input
            className={styles.frame1}
            placeholder="Retype your password"
            type="text"
            value={frame2Value}
            onChange={(event) => setFrame2Value(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.lightbuttonParent}>
        <button className={styles.lightbutton}>
          <div className={styles.createAccount}>Create account</div>
        </button>
        <button
          className={styles.alreadyHaveAnAccountParent}
          onClick={() => navigate("/auth")}
        >
          <div className={styles.alreadyHaveAn}>Already have an account?</div>
          <div className={styles.signIn}>Sign in</div>
        </button>
      </div>
    </div>
  );
};

export default Signup;
