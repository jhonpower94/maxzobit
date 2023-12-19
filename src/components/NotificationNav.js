import styles from "./NotificationNav.module.css";

const NotificationNav = () => {
  return (
    <button className={styles.vectorParent}>
      <img className={styles.vectorIcon} alt="" src="/vector@2x.png" />
      <div className={styles.wrapper}>
        <div className={styles.div}>3</div>
      </div>
    </button>
  );
};

export default NotificationNav;
