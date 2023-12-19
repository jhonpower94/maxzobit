import { useLocation, useNavigate } from "react-router-dom";
import HeaderBackButtonCoin from "../components/HeaderBackButtonCoin";
import styles from "./Coindetail.module.css";
import { CryptoCurrencyFormat, CurrencyFormat } from "../config/services";

const Coindetail = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const {
    image,
    balancecoin,
    difference,
    coinname,
    code,
    balance,
    discription,
    marketcap,
    volume,
  } = state.coin;

  return (
    <div className={styles.coindetail}>
      <HeaderBackButtonCoin coinImage={image} title={coinname} />
      <div className={styles.frame}>
        <img className={styles.imageIcon} alt="" src={image} />
        <button className={styles.frame1}>
          <div className={styles.watch}>Watch</div>
        </button>
      </div>
      <div className={styles.frame2}>
        <div className={styles.div}>
          <CurrencyFormat amount={balance} prefix="$" seperator={true} />
        </div>
        <div className={styles.div1}>
          <CryptoCurrencyFormat amount={balancecoin} suffix={` ${code}`} />
          <font
            style={{ marginLeft: 10 }}
            color={difference < 0 ? "red" : "green"}
          >
            {difference.toFixed(2)}%
          </font>
        </div>
      </div>
      <div className={styles.sendParent}>
        <button
          className={styles.send}
          onClick={() => navigate("/send", { state: { coin: state.coin } })}
        >
          <img className={styles.frameIcon} alt="" src="/frame14@2x.png" />
          <div className={styles.frame3}>
            <div className={styles.send1}>Send</div>
          </div>
        </button>
        <button
          className={styles.send}
          onClick={() =>
            navigate("/receivecoin", { state: { coin: state.coin } })
          }
        >
          <img className={styles.frameIcon} alt="" src="/frame15@2x.png" />
          <div className={styles.frame4}>
            <div className={styles.receive1}>Receive</div>
          </div>
        </button>
      </div>
      <div className={styles.frame5}>
        <div className={styles.aboutBitcoin}>About Bitcoin</div>
        <div className={styles.theWorldsFirst}>{discription}</div>
        <div className={styles.viewMore}>View more</div>
      </div>
      <div className={styles.marketStatsWrapper}>
        <div className={styles.marketStats}>Market stats</div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.signalCellularAltParent}>
            <img
              className={styles.signalCellularAltIcon}
              alt=""
              src="/signal-cellular-alt@2x.png"
            />
            <div className={styles.marketCap}>Market cap</div>
          </div>
          <div className={styles.billionWrapper}>
            <div className={styles.billion}>
              <CurrencyFormat amount={marketcap} prefix="$" seperator={true} />
            </div>
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.signalCellularAltParent}>
            <img
              className={styles.signalCellularAltIcon}
              alt=""
              src="/signal-cellular-alt@2x.png"
            />
            <div className={styles.marketCap}>Volume</div>
          </div>
          <div className={styles.billionWrapper}>
            <div className={styles.billion}>
              <CurrencyFormat amount={volume} prefix="$" seperator={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coindetail;
