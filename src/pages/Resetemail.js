import { useState } from "react";
import HeaderAuth from "../components/HeaderAuth";
import styles from "./Resetemail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import CustomizedButtons from "../components/StyledButtons";
import { Snackbar } from "@mui/joy";
import { auth } from "../config/firebase";

const Resetemail = () => {
  const { action } = useParams();
  const navigate = useNavigate();
  const [value, setvalue] = useState();
  const [open, setOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClose = (event, reason) => {
    setOpen({ ...open, open: false });
  };

  const [loading, setLoading] = useState(false);
  const userinfo = useSelector((state) => state.useInfos);

  const reset = (e) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, value)
      .then(() => {
        setOpen({ ...open, open: true });
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        console.log(errorMessage);
      });
  };

  return (
    <form onSubmit={reset}>
      <div className={styles.resetemail}>
        <HeaderAuth buttonText={`Reset ${action}`} rectangleIconWidth="538px" />
        <div className={styles.frame}>
          <div className={styles.address}>Email</div>
          <input
            className={styles.frame1}
            placeholder={`Enter Your ${action}`}
            type="email"
            value={value}
            name="email"
            onChange={(event) => setvalue(event.target.value)}
            required
          />
        </div>
        <div className={styles.lightbuttonParent}>
          <CustomizedButtons loading={loading} text={`Reset ${action}`} />

          <button className={styles.signInWrapper}>
            <button
              className={styles.signIn}
              onClick={() => navigate("/auth/")}
            >
              Sign in
            </button>
          </button>
        </div>
      </div>
      <Snackbar
        color="warning"
        size="lg"
        variant="soft"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open.open}
        onClose={handleClose}
      >
        {"Request was successful, please check your email"}
      </Snackbar>
    </form>
  );
};

export default Resetemail;
