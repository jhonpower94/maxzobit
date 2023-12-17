import { useState } from "react";
import HeaderAuth from "../components/HeaderAuth";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth } from "../config/firebase";
import { Snackbar } from "@mui/joy";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState({
    open: true,
    message: "Incorrect login",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = () => {
    setOpen({ ...open, open: false });
  };

  const submitLogin = (event) => {
    event.preventDefault();
    // dispatch(loading$());

    //set persistan
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, values.email, values.password);
      })
      .then((userCredential) => {
        // Signed in
        //  dispatch(loading$());
        navigate(switchnavigation("/"));
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
        //  dispatch(loading$());
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
              defaultValue={values.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.frame}>
            <div className={styles.address}>Password</div>
            <input
              className={styles.frame1}
              placeholder="Enter your password"
              type="text"
              defaultValue={values.password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.lightbuttonParent}>
          <button type="submit" className={styles.lightbutton}>
            <div className={styles.login1}>Login</div>
          </button>
          <div className={styles.forgotPasswordParent}>
            <button
              className={styles.forgotPassword}
              onClick={() => navigate("/auth/resetpass")}
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
        size="md"
        variant="outlined"
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
