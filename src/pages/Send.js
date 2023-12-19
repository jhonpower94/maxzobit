import { useState } from "react";
import styles from "./Send.module.css";
import HeaderBackButtonCoin from "../components/HeaderBackButtonCoin";
import { useLocation } from "react-router-dom";

const Send = () => {
  const [frameValue, setFrameValue] = useState();
  const [frame2Value, setFrame2Value] = useState();

  let { state } = useLocation();
  const { image, coinname, code, cointype, balance } = state.coin;

  const [value, setValue] = useState({
    amount: 0,
    coin: 0,
    address: "",
    network: "Bitcoin",
    alerMessage: "",
    severity: "warning",
  });

  const handleChange = (event) => {
    setValue({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={styles.send}>
      <HeaderBackButtonCoin coinImage={image} title={`Send ${code}`} />
      <div className={styles.frame1}>
        <div className={styles.amount}>Amount</div>
        <div className={styles.frameGroup}>
          <input
            className={styles.frame2}
            type="number"
            placeholder="0.00"
            value={frameValue}
            onChange={(event) => setFrameValue(event.target.value)}
          />
          <button className={styles.frame3}>
            <div className={styles.max}>Max</div>
          </button>
        </div>
      </div>
      <div className={styles.btcAvailableWrapper}>
        <div className={styles.btcAvailable}>500 BTC Available</div>
      </div>
      <div className={styles.frame4}>
        <div className={styles.amount}>Address</div>
        <input
          className={styles.frame5}
          type="text"
          value={frame2Value}
          onChange={(event) => setFrame2Value(event.target.value)}
        />
      </div>
      <div className={styles.addressParent}>
        <div className={styles.amount}>Network</div>
        <button className={styles.frame6}>
          <div className={styles.frameContainer}>
            <div className={styles.frameDiv}>
              <div className={styles.frame7}>
                <img className={styles.imageIcon} alt="" src="/image3@2x.png" />
                <img
                  className={styles.imageIcon1}
                  alt=""
                  src="/image4@2x.png"
                />
              </div>
              <div className={styles.ethereum}>Ethereum</div>
            </div>
            <img
              className={styles.arrowForwardIosIcon}
              alt=""
              src="/arrow-forward-ios@2x.png"
            />
          </div>
        </button>
      </div>
      <div className={styles.frameWrapper}>
        <button className={styles.frame8}>
          <div className={styles.next}>Next</div>
        </button>
      </div>
    </div>
  );
};

export default Send;
