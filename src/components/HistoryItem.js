import { useEffect, useMemo } from "react";
import styles from "./HistoryItem.module.css";
import { Typography } from "@mui/material";
import { CurrencyFormat } from "../config/services";
import { useNavigate } from "react-router-dom";

export function convertTimestamp(timestamp) {
  let date = timestamp.toDate();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let yyyy = date.getFullYear();

  date = mm + "-" + dd + "-" + yyyy;
  return date;
}

export function convertTimestampTime(timestamp) {
  let time = timestamp.toDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";

  time = hours + ":" + minutes + " " + ampm;
  return time;
}

const HistoryItem = ({ data, itemCode, imageCode, frameBorder }) => {
  const navigate = useNavigate();
  const frameStyle = useMemo(() => {
    return {
      border: frameBorder,
    };
  }, [frameBorder]);

  const {
    transaction_type,
    recipient,
    amount,
    timestamp,
    confirmation,
    cointitle,
  } = data;
  const isCredit = transaction_type === "Credit";
  const isPending = confirmation < 3;
  const isrecipient = isCredit ? "-" : recipient;
  const timestampset = `${convertTimestamp(timestamp)} ${convertTimestampTime(
    timestamp
  )}`;

  useEffect(() => {
    console.log(timestamp);
  });

  return (
    <div
      onClick={() =>
        navigate(
          `/detail/${transaction_type}/${isrecipient}/${confirmation}/${cointitle}/${timestampset}/${amount}`,
          { state: { data: data } }
        )
      }
      className={styles.frame}
    >
      <div className={styles.frame1}>
        <div className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <div className={styles.frame2} style={frameStyle}>
              <img className={styles.callMadeIcon} alt="" src={itemCode} />
            </div>
          </div>
          <img className={styles.frameIcon} alt="" src={imageCode} />
        </div>
        <div className={styles.frame3}>
          <div className={styles.frame4}>
            <div className={styles.x321248d6}>{recipient}</div>
          </div>
          <div className={styles.frame5}>
            <div className={styles.receive1242}>
              {isCredit ? "Receive" : "Sent"} •{" "}
              {convertTimestampTime(timestamp)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.frame6}>
        <Typography color={isPending ? "red" : "green"}>
          {isCredit ? "+" : "-"}
          <CurrencyFormat amount={amount} prefix={"$"} seperator={true} />
        </Typography>
        <Typography variant="caption" color={isPending ? "orange" : "green"}>
          {isPending ? "Pending" : "Confirmed"}
        </Typography>
      </div>
    </div>
  );
};

export default HistoryItem;
