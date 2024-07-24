import { useState } from "react";
import HeaderAuth from "../components/HeaderAuth";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import {
    browserLocalPersistence,
    setPersistence,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { Snackbar } from "@mui/joy";
import CustomizedButtons from "../components/StyledButtons";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "Incorrect login ",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setOpen({ ...open, open: false });
  };

  const submitLogin = (event) => {
    event.preventDefault();
    setLoading(true);

    //set persistan
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, values.email, values.password);
      })
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        navigate(navigate("/"));
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        setOpen({
          ...open,
          open: true,
          message: "Sorry incorrect login credentials",
        });
        setLoading(false);
      });
  };

  return (
    <div className={styles.login}>
      <HeaderAuth
        buttonText="Sign In"
        rectangleIconWidth="unset"
        rectangleIconAlignSelf="stretch"
        rectangleIconHeight="223px"
      />
      <form onSubmit={submitLogin} style={{ width: "100%" }}>
        <div className={styles.frameParent}>
          <div className={styles.frame}>
            <div className={styles.address}>Email</div>
            <input
              className={styles.frame1}
              placeholder="Enter Your Email"
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.frame}>
            <div className={styles.address}>Password</div>
            <input
              className={styles.frame1}
              placeholder="Enter your password"
              type="password"
              value={values.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={styles.lightbuttonParent}>
          <CustomizedButtons loading={loading} text={"Login"} />
          <div className={styles.forgotPasswordParent}>
            <button
              className={styles.forgotPassword}
              onClick={() => navigate("/auth/reset/password")}
            >
              Forgot Password?
            </button>
            <button
              className={styles.forgotPassword}
              onClick={() => navigate("/auth/register")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <Snackbar
        color="warning"
        size="lg"
        variant="soft"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open.open}
        onClose={handleClose}
      >
        {open.message}
      </Snackbar>
    </div>
  );
};

export default Login;
