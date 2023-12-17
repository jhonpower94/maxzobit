import { useMemo } from "react";
import styles from "./HeaderAuth.module.css";

const HeaderAuth = ({
  buttonText,
  rectangleIconWidth,
  rectangleIconAlignSelf,
  rectangleIconHeight,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      width: rectangleIconWidth,
      alignSelf: rectangleIconAlignSelf,
      height: rectangleIconHeight,
    };
  }, [rectangleIconWidth, rectangleIconAlignSelf, rectangleIconHeight]);

  return (
    <div className={styles.rectangleParent} style={frameDivStyle}>
      <img className={styles.frameChild} alt="" src="/rectangle-1@2x.png" />
      <div className={styles.coinnameWalletParent}>
        <div className={styles.coinnameWallet}>Coinname Wallet</div>
        <div className={styles.resetEmail}>{buttonText}</div>
      </div>
    </div>
  );
};

export default HeaderAuth;
