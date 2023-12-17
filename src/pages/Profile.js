import { useState } from "react";
import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Profile.module.css";

const Profile = () => {
  const [frameValue, setFrameValue] = useState();
  const [frame2Value, setFrame2Value] = useState();
  const [frame3Value, setFrame3Value] = useState();
  const [frame5Value, setFrame5Value] = useState();
  return (
    <div className={styles.profile}>
      <HeaderBackButton userImageUrl="Profile" />
      <div className={styles.frame}>
        <div className={styles.address}>User ID</div>
        <div className={styles.frameParent}>
          <input
            className={styles.frame1}
            placeholder="Your user ID"
            type="text"
            value={frameValue}
            onChange={(event) => setFrameValue(event.target.value)}
          />
          <button className={styles.frame2}>
            <div className={styles.copy}>Copy</div>
          </button>
        </div>
      </div>
      <div className={styles.frame}>
        <div className={styles.address}>Full name</div>
        <input
          className={styles.frame4}
          placeholder="Enter Your Email"
          type="text"
          value={frame2Value}
          onChange={(event) => setFrame2Value(event.target.value)}
        />
      </div>
      <div className={styles.frame}>
        <div className={styles.address}>Email</div>
        <input
          className={styles.frame4}
          placeholder="Enter Your Email"
          type="text"
          value={frame3Value}
          onChange={(event) => setFrame3Value(event.target.value)}
        />
      </div>
      <div className={styles.frame}>
        <div className={styles.address}>Country</div>
        <select className={styles.frame8}>
          <option value="Select your country">Placeholder</option>
        </select>
      </div>
      <div className={styles.frame}>
        <div className={styles.address}>Mobile number</div>
        <input
          className={styles.frame4}
          placeholder="Enter Your phone number"
          type="text"
          value={frame5Value}
          onChange={(event) => setFrame5Value(event.target.value)}
        />
      </div>
      <div className={styles.frame11}>
        <div className={styles.addressParent}>
          <div className={styles.address5}>KYC</div>
          <div className={styles.verified}>Verified</div>
        </div>
        <button className={styles.lightbutton}>
          <div className={styles.verify}>Verify</div>
        </button>
      </div>
      <div className={styles.lightbuttonWrapper}>
        <button className={styles.lightbutton1}>
          <div className={styles.save}>Save</div>
        </button>
      </div>
    </div>
  );
};

export default Profile;
