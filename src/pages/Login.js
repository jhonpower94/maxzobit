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
import { FormControl, FormLabel, Input, Snackbar } from "@mui/joy";
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
            <FormControl required size="lg" style={{ width: "100%" }}>
              <FormLabel>Email</FormLabel>
              <Input
                variant="soft"
                color="primary"
                defaultValue={values.email}
                type="email"
                placeholder="Your email"
                autoFocus
                name="email"
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <div className={styles.frame}>
            <FormControl required size="lg" style={{ width: "100%" }}>
              <FormLabel>Password</FormLabel>
              <Input
                variant="soft"
                color="primary"
                defaultValue={values.password}
                type="password"
                placeholder="Your password"
                name="password"
                onChange={handleChange}
              />
            </FormControl>
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
