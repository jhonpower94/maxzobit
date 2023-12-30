import { generate } from "random-words";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Phrase.module.css";
import { addUsers } from "../config/services";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/joy";

const Phrase = () => {
  const navigate = useNavigate();
  const userinfo = useSelector((state) => state.useInfos);
  const [phrase, setPhrase] = useState(userinfo.secret_phrase);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const generatePhrase = () => {
    const secretPhrase = generate({ exactly: 12, join: " " });
    addUsers(userinfo.id, { secret_phrase: secretPhrase }).then(() => {
      setPhrase(secretPhrase);
      console.log(secretPhrase);
    });
  };

  const redirect = () => navigate("/");

  const copied = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    console.log(userinfo.secret_phrase);
  });

  return (
    <div className={styles.phrase}>
      <HeaderBackButton userImageUrl="Phrase" />
      <div className={styles.yourRecoveryPhraseParent}>
        <div className={styles.yourRecoveryPhrase}>Your recovery phrase</div>
        <div className={styles.saveThese12}>
          Save these 12 words in a safe place. Do not share them with anyone,
          even Coinbase. Anyone with your recovery phrase can steal your funds.
        </div>
      </div>
      <div className={styles.frameParent}>
        <textarea
          name="phrase"
          value={phrase}
          className={styles.frame}
          placeholder="Recovery phrase"
        />
        <CopyToClipboard text={phrase} onCopy={copied}>
          <button className={styles.fileCopyParent}>
            <img
              className={styles.fileCopyIcon}
              alt=""
              src="/file-copy@2x.png"
            />
            <div className={styles.copyToClipboard}>Copy phrase</div>
          </button>
        </CopyToClipboard>
      </div>
      <div className={styles.frameWrapper}>
        <button
          className={styles.frame1}
          onClick={phrase ? redirect : generatePhrase}
        >
          <div className={styles.frame2}>
            <div className={styles.frame3}>
              <div className={styles.done}>Done</div>
            </div>
          </div>
        </button>
      </div>
      <Snackbar
        color="success"
        size="lg"
        variant="soft"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      >
        {"Secret phrase copied"}
      </Snackbar>
    </div>
  );
};

export default Phrase;
