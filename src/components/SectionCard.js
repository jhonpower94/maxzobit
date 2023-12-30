import { CallMade, CallReceived } from "@mui/icons-material";
import { CurrencyFormat } from "../config/services";
import styles from "./SectionCard.module.css";
import { useNavigate } from "react-router-dom";

const SectionCard = ({ data, type }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.frameParent}>
      <div className={styles.frame}>
        <div className={styles.frame1}>
          <div className={styles.marketCap}>{type}</div>
        </div>
      </div>
      <div className={styles.frame2}>
        {data.map((value, index) => {
          const {
            symbol,
            price,
            image,
            usd_24h_change,
          } = value;
          return (
            <button key={index} className={styles.frameGroup} onClick={()=>navigate("/receive")}>
              <img className={styles.frameIcon} alt="" src={image} />
              <div className={styles.btcParent}>
                <div
                  className={styles.btc}
                  style={{ textTransform: "uppercase" }}
                >
                  {symbol}
                </div>
                <div className={styles.div}>
                  <CurrencyFormat
                    prefix={"$"}
                    amount={price}
                    seperator={true}
                  />
                </div>
              </div>
              <div className={styles.callMadeParent}>
                {usd_24h_change < 0 ? (
                  <CallReceived color="error" fontSize="large" />
                ) : (
                  <CallMade color="success" fontSize="large" />
                )}

                <div className={styles.wrapper}>
                  <div className={styles.div1}>
                    <font color={usd_24h_change < 0 ? "red" : "green"}>
                      {usd_24h_change.toFixed(2)}%
                    </font>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionCard;
