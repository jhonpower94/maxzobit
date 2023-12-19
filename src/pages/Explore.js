import SectionCard from "../components/SectionCard";
import styles from "./Explore.module.css";

const Explore = () => {
  return (
    <div className={styles.explore}>
      <div className={styles.frame}>
        <div className={styles.explore1}>Explore</div>
      </div>
      <div className={styles.frameWrapper}>
        <button className={styles.frame1}>
          <div className={styles.frame2}>
            <div className={styles.createAWatchlist}>Create a watchlist</div>
            <div className={styles.getPriceAlerts}>
              Get price alerts and stay up to date
            </div>
          </div>
          <img className={styles.frameIcon} alt="" src="./images/coins/explore.svg" />
        </button>
      </div>
      <SectionCard />
      <SectionCard />
    </div>
  );
};

export default Explore;
