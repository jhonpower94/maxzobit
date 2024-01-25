import { useLocation } from "react-router-dom";
import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Receivesingle.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { QRCode } from "react-qrcode-logo";
import { useEffect, useState } from "react";
import { Snackbar } from "@mui/joy";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { LoaderSmall } from "../components/loader";

const Receivesingle = () => {
  let { state } = useLocation();
  const [adminWallet, setadminWallet] = useState("");
  const [loading, setLoading] = useState(true);
  const { image, coinname, code } = state.coin;

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const docRef = doc(db, "walletaddresses", code);
    getDoc(docRef).then((data) => {
      console.log(data.data());

      if (data.data().address) {
        setadminWallet(data.data().address);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className={styles.receivesingle}>
      <HeaderBackButton userImageUrl="Receive" />
      <div className={styles.frameParent}>
        <div className={styles.frame}>
          <div className={styles.vectorParent}>
            <QRCode
              size={200}
              value={adminWallet}
              logoImage={image}
              logoPaddingStyle="circle"
              removeQrCodeBehindLogo={true}
            />
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.maticAddressParent}>
            <div className={styles.maticAddress}>{coinname} address</div>
            <div className={styles.xc9d36ef3}>{adminWallet}</div>
          </div>
          {loading ? (
            <LoaderSmall />
          ) : (
            <CopyToClipboard text={adminWallet} onCopy={() => setOpen(true)}>
              <button className={styles.frame1}>
                <div className={styles.copy}>Copy</div>
              </button>
            </CopyToClipboard>
          )}
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
