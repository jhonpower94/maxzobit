import { Outlet, useNavigate } from "react-router-dom";
import AssetItem from "../components/AssetItem";
import CustomizedTabs from "../components/tabs";
import styles from "./HomeAssets.module.css";
import { useState } from "react";
import HistoryItem from "../components/HistoryItem";

const HomeAssets = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("/");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
    console.log(newValue);
  };

  return (
    <div className={styles.homeAssets}>
      <div className={styles.header}>
        <div className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <button className={styles.ellipseParent}>
              <img
                className={styles.frameChild}
                alt=""
                src="/ellipse-2@2x.png"
              />
              <div className={styles.jhonpower94cParent}>
                <div className={styles.jhonpower94c}>jhonpower94.c</div>
                <img
                  className={styles.keyboardArrowDownIcon}
                  alt=""
                  src="/keyboard-arrow-down@2x.png"
                />
              </div>
            </button>
          </div>
          <button className={styles.vectorWrapper}>
            <img className={styles.vectorIcon} alt="" src="/vector@2x.png" />
          </button>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.div}>$3,000.00</div>
      </div>
      <div className={styles.circlebuttonGroups}>
        <button className={styles.buy} onClick={() => navigate("/buy")}>
          <img className={styles.frameIcon} alt="" src="/frame2@2x.png" />
          <div className={styles.frame}>
            <div className={styles.buy1}>Buy</div>
          </div>
        </button>
        <button className={styles.buy} onClick={() => navigate("/swap")}>
          <img className={styles.frameIcon} alt="" src="/frame3@2x.png" />
          <div className={styles.frame1}>
            <div className={styles.swap1}>Swap</div>
          </div>
        </button>

        <button className={styles.buy} onClick={() => navigate("/send")}>
          <img className={styles.frameIcon} alt="" src="/frame5@2x.png" />
          <div className={styles.frame3}>
            <div className={styles.send1}>Send</div>
          </div>
        </button>
        <button className={styles.buy} onClick={() => navigate("/receive")}>
          <img className={styles.frameIcon} alt="" src="/frame6@2x.png" />
          <div className={styles.frame4}>
            <div className={styles.receive1}>Receive</div>
          </div>
        </button>
      </div>
      <CustomizedTabs value={value} handleChange={handleChange} />
      <Outlet />
    </div>
  );
};

export default HomeAssets;

// Assetstab
export const Assets = () => {
  return (
    <>
      <div className={styles.lightbuttonWrapper}>
        <button className={styles.lightbutton}>
          <div className={styles.getFreeTestnet}>Get free testnet funds</div>
        </button>
      </div>
      <div className={styles.coinlist}>
        <AssetItem
          frameIconUrl="/frame1@2x.png"
          propBackgroundImage="url('/frame7@3x.png')"
        />
        <AssetItem
          frameImageUrl="/frame-80"
          frameIconUrl="/frame@2x.png"
          propCursor="pointer"
          propBackgroundImage="url('/frame11@3x.png')"
        />
      </div>
    </>
  );
};

// NFTs tab
export const Nfts = () => {
  return (
    <>
      <div className={styles.lightbuttonWrapper}>
        <button className={styles.lightbutton}>
          <div className={styles.getFreeTestnet}>Get free testnet funds</div>
        </button>
      </div>
    </>
  );
};

// Activity tab
export const Activity = () => {
  return (
    <HistoryItem
      itemCode="/call-received@2x.png"
      imageCode="/frame11@3x.png"
      frameBorder="1px solid blue"
    />
  );
};
