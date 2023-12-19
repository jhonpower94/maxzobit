import { useLocation } from "react-router-dom";
import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Receivesingle.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { QRCode } from "react-qrcode-logo";
import { useState } from "react";
import { Snackbar } from "@mui/joy";

const Receivesingle = () => {
  let { state } = useLocation();
  const { image, coinname, address } = state.coin;

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.receivesingle}>
      <HeaderBackButton userImageUrl="Receive" />
      <div className={styles.frameParent}>
        <div className={styles.frame}>
          <div className={styles.vectorParent}>
            <QRCode
              size={200}
              value={address}
              logoImage={image}
              logoPaddingStyle="circle"
              removeQrCodeBehindLogo={true}
            />
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.maticAddressParent}>
            <div className={styles.maticAddress}>{coinname} address</div>
            <div className={styles.xc9d36ef3}>{address}</div>
          </div>
          <CopyToClipboard text={address} onCopy={() => setOpen(true)}>
            <button className={styles.frame1}>
              <div className={styles.copy}>Copy</div>
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <Snackbar
        color="success"
        size="md"
        variant="soft"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
      >
        Address copied
      </Snackbar>
    </div>
  );
};

export default Receivesingle;
