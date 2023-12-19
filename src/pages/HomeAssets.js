import { Outlet, useNavigate } from "react-router-dom";
import AssetItem from "../components/AssetItem";
import CustomizedTabs from "../components/tabs";
import styles from "./HomeAssets.module.css";
import { useState } from "react";
import HistoryItem from "../components/HistoryItem";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { CurrencyFormat } from "../config/services";
import { useSelector } from "react-redux";

const HomeAssets = () => {
  const navigate = useNavigate();
  const userinfo = useSelector((state) => state.useInfos);
  const [value, setValue] = useState("/");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
    console.log(newValue);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
        navigate("/auth");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.homeAssets}>
      <div className={styles.header}>
        <div className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <Dropdown>
              <MenuButton
                sx={{ border: "none", paddingInline: 0 }}
                className={styles.ellipseParent}
              >
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
              </MenuButton>
              <Menu size="lg">
                <MenuItem onClick={() => navigate("profile")}>
                  My profile
                </MenuItem>
                <MenuItem onClick={logOut}>Sign out</MenuItem>
              </Menu>
            </Dropdown>
          </div>
          <button className={styles.vectorWrapper}>
            <img className={styles.vectorIcon} alt="" src="/vector@2x.png" />
          </button>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.div}>
          <CurrencyFormat
            amount={userinfo.totalBalance}
            prefix={"$"}
            seperator={true}
          />
        </div>
      </div>
      <div className={styles.circlebuttonGroups}>
        <button
          className={styles.buy}
          onClick={() => window.open("https://www.kraken.com", "_blank")}
        >
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

        <button className={styles.buy} onClick={() => navigate("/allcoin")}>
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
  const walletData = useSelector((state) => state.walletsData);

  return (
    <>
      <div className={styles.lightbuttonWrapper}>
        <button
          className={styles.lightbutton}
          onClick={() => window.open("https://www.kraken.com", "_blank")}
        >
          <div className={styles.getFreeTestnet}>
            Buy crypto at free commision
          </div>
        </button>
      </div>
      <div className={styles.coinlist}>
        {walletData.map((coin, index) => (
          <AssetItem
            coin={coin}
            key={index}
            frameImageUrl="/frame-80"
            frameIconUrl={coin.image}
            propCursor="pointer"
            propBackgroundImage={`url(${coin.image})`}
          />
        ))}
      </div>
    </>
  );
};

// NFTs tab
export const Nfts = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.lightbuttonWrapper}>
        <button
          className={styles.lightbutton}
          onClick={() => navigate("/receive")}
        >
          <div className={styles.getFreeTestnet}>Import NFTs</div>
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
