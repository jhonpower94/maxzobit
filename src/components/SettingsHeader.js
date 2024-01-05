import { useSelector } from "react-redux";
import styles from "./SettingsHeader.module.css";
import { useEffect } from "react";
import { CurrencyFormat } from "../config/services";

const SettingsHeader = () => {
  const userinfo = useSelector((state) => state.useInfos);
  const { totalBalance } = userinfo;
  useEffect(() => {
    console.log(userinfo);
  });
  return (
    <div className={styles.frameParent}>
      <div className={styles.frame}>
        <div className={styles.rectangle} />
        <div className={styles.rectangle}>
          <div className={styles.rectangle} />
          <div className={styles.rectangle}>
            <div className={styles.rectangle} />
            <div className={styles.frame3}>
              <div className={styles.rectangle3} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.jhonpower94cbidParent}>
        <div className={styles.jhonpower94cbid}>{userinfo.email}</div>
        <div className={styles.div}>
          <CurrencyFormat amount={totalBalance} prefix="$" seperator={true} />
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
