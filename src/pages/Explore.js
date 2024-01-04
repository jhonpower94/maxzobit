import { useSelector } from "react-redux";
import SectionCard from "../components/SectionCard";
import styles from "./Explore.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  let coinData = useSelector((state) => state.coinData);

  const dataAsc = coinData.slice(0, 5);
  const dataDesc = coinData.slice(5, 11);

  useEffect(() => {
    console.log(dataAsc, dataDesc);
  });

  return (
    <div className={styles.explore}>
      <div className={styles.frame}>
        <div className={styles.explore1}>Explore</div>
      </div>
      <div className={styles.frameWrapper}>
        <button className={styles.frame1} onClick={() => navigate("/receive")}>
          <div className={styles.frame2}>
            <div className={styles.createAWatchlist}>Create a watchlist</div>
            <div className={styles.getPriceAlerts}>
              Get price alerts and stay up to date
            </div>
          </div>
          <img
            className={styles.frameIcon}
            alt=""
            src="./images/coins/explore.svg"
          />
        </button>
      </div>
      <SectionCard data={dataAsc} type={"Market cap"} />
      <SectionCard data={dataDesc} type={"Top movers"} />
    </div>
  );
};

export default Explore;
