import CopyToClipboard from "react-copy-to-clipboard";
import styles from "./RecieveCard.module.css";
import { Snackbar } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecieveCard = ({ coin }) => {
  const navigate = useNavigate();
  const { address, coinname, image } = coin;

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.frameParent}>
      <div className={styles.yourSolanaAddressParent}>
        <div className={styles.yourSolanaAddress}>Your {coinname} address</div>
        <div className={styles.mkz6qaujb5nsymzcyzarctrecc2a3h}>{address}</div>
        <img className={styles.imageIcon} alt="" src={image} />
      </div>
      <div className={styles.frame}>
        <button
          className={styles.frame1}
          onClick={() => navigate("/receivecoin", { state: { coin: coin } })}
        >
          <img className={styles.vectorIcon} alt="" src="/vector2@2x.png" />
        </button>
        <CopyToClipboard text={address} onCopy={() => setOpen(true)}>
          <button className={styles.frame1}>
            <img className={styles.vectorIcon1} alt="" src="/vector3@2x.png" />
          </button>
        </CopyToClipboard>
      </div>
      <Snackbar
        color="success"
        size="md"
        variant="soft"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
      >
        Address copied
      </Snackbar>
    </div>
  );
};

export default RecieveCard;
