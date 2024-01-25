import CopyToClipboard from "react-copy-to-clipboard";
import styles from "./RecieveCard.module.css";
import { Snackbar } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { LoaderSmall } from "./loader";

const RecieveCard = ({ coin }) => {
  const navigate = useNavigate();
  const { coinname, image, code } = coin;
  const [adminWallet, setadminWallet] = useState("");
  const [loading, setLoading] = useState(true);

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

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.frameParent}>
      <div className={styles.yourSolanaAddressParent}>
        <div className={styles.yourSolanaAddress}>Your {coinname} address</div>
        <div className={styles.mkz6qaujb5nsymzcyzarctrecc2a3h}>
          {adminWallet}
        </div>
        <img className={styles.imageIcon} alt="" src={image} />
      </div>
      <div className={styles.frame}>
        <button
          className={styles.frame1}
          onClick={() => navigate("/receivecoin", { state: { coin: coin } })}
        >
          <img className={styles.vectorIcon} alt="" src="/vector2@2x.png" />
        </button>
        {loading ? (
          <LoaderSmall />
        ) : (
          <CopyToClipboard text={adminWallet} onCopy={() => setOpen(true)}>
            <button className={styles.frame1}>
              <img
                className={styles.vectorIcon1}
                alt=""
                src="/vector3@2x.png"
              />
            </button>
          </CopyToClipboard>
        )}
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
