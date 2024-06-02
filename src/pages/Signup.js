import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAuth from "../components/HeaderAuth";
import CustomizedButtons from "../components/StyledButtons";
import { auth } from "../config/firebase";
import { addUsers, sendMessage } from "../config/services";
import styles from "./Signup.module.css";
import { Snackbar } from "@mui/joy";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    numberformat: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    showPassword: false,
    country: "United States", // set up with reactlocalstorage
    mobilecode: "+1",
  });
  const [alertMessage, setalertMessage] = useState({
    message: "",
    severity: "success",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true);
    const datas = {
      ...values,
      btc_balance: 0,
      bnb_balance: 0,
      tron_balance: 0,
      eth_balance: 0,
      usdt_balance: 0,
      usdterc20_balance: 0,
      timestamp: Timestamp.now(),
    };

    createUserWithEmailAndPassword(auth, datas.email, datas.password)
      .then((user) => {
        console.log("user created");
        const userid = user.user.uid;
        addUsers(userid, datas).then(() => {
          setalertMessage({
            severity: "success",
            message: "Sign up successful redirecting to login...",
          });
          setOpen(true);

          sendMessage(
            `<strong>Welcome to Maxzobit wallet, Your registration was successful, and your account is activated, thank you.`,
            "Account Registration",
            datas.email,
            `${values.firstName} ${values.lastName}`
          )
            .then(() => {
              setTimeout(() => {
                setLoading(false);
                navigate("/");
              }, 7000);
            })
            .catch(() => {
              setTimeout(() => {
                setLoading(false);
                navigate("/");
              }, 7000);
            });
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setalertMessage({
          message: errorMessage,
          severity: "warning",
        });
        setOpen(true);
        console.log(errorMessage);
        setLoading(false);
      });
  };

  return (
    <div className={styles.signup}>
      <HeaderAuth
        buttonText="Sign Up"
        rectangleIconWidth="unset"
        rectangleIconAlignSelf="stretch"
        rectangleIconHeight="223px"
      />
      <form onSubmit={submitForm} style={{ width: "100%" }}>
        <div className={styles.frameParent}>
          <div className={styles.frame}>
            <div className={styles.address}>Email</div>
            <input
              className={styles.frame1}
              placeholder="Enter Your Email"
              type="text"
              name="email"
              value={values.email}
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.frame}>
            <div className={styles.address}>Password</div>
            <input
              className={styles.frame1}
              placeholder="Enter Your password"
              type="text"
              name="password"
              value={values.password}
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.frame}>
            <div className={styles.address}>Confirm password</div>
            <input
              className={styles.frame1}
              placeholder="Retype your password"
              type="text"
              name="confirmpassword"
              value={values.confirmpassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.lightbuttonParent}>
          <CustomizedButtons loading={loading} text={"Create account"} />

          <button
            className={styles.alreadyHaveAnAccountParent}
            onClick={() => navigate("/auth")}
          >
            <div className={styles.alreadyHaveAn}>Already have an account?</div>
            <div className={styles.signIn}>Sign in</div>
          </button>
        </div>
      </form>
      <Snackbar
        color="warning"
        size="lg"
        variant="soft"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
      >
        {alertMessage.message}
      </Snackbar>
    </div>
  );
};

export default Signup;
