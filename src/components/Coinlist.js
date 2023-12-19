import AssetItem from "./AssetItem";
import styles from "./Coinlist.module.css";

const Coinlist = () => {
  return (
    <div className={styles.coinlist}>
      <AssetItem />
      <AssetItem />
    </div>
  );
};

export default Coinlist;
