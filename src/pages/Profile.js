import { useState } from "react";
import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { countrylist } from "../config/countrylist";
import { useNavigate } from "react-router-dom";
import { addUsers } from "../config/services";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Snackbar } from "@mui/joy";

const Profile = () => {
  const navigate = useNavigate();
  const userInfos = useSelector((state) => state.useInfos);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [values, setValues] = useState({
    numberformat: userInfos.numberformat,
    email: userInfos.email,
    country: userInfos.country, // set up with reactlocalstorage
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const copied = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const updateUser = () => {
    setLoading(true);
    addUsers(userInfos.id, values).then(() => {
      setLoading(false);
    });
  };

  return (
    <div className={styles.profile}>
      <HeaderBackButton userImageUrl="Profile" />

      <div className={styles.frame}>
        <div className={styles.address}>User ID</div>
        <div className={styles.frameParent}>
          <input
            className={styles.frame1}
            placeholder="Your user ID"
            type="text"
            value={userInfos.id}
          />
          <CopyToClipboard text={userInfos.id} onCopy={copied}>
            <button className={styles.frame2}>
              <div className={styles.copy}>Copy</div>
            </button>
          </CopyToClipboard>
        </div>
      </div>

      <div className={styles.frame}>
        <div className={styles.address}>Email</div>
        <input
          className={styles.frame4}
          placeholder="Enter Your Email"
          type="text"
          value={values.email}
        />
      </div>
      <div className={styles.frame}>
        <div className={styles.address}>Country</div>
        <select
          name="country"
          defaultValue={values.country}
          className={styles.frame8}
          onChange={handleChange}
        >
          <option defaultValue="Select your country">Placeholder</option>
          {countrylist.map((ct, index) => (
            <option key={index} defaultValue={ct.name}>
              {ct.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.frame}>
        <div className={styles.address}>Mobile number</div>
        <input
          className={styles.frame4}
          placeholder="Enter Your phone number"
          type="text"
          name="numberformat"
          defaultValue={values.numberformat}
          onChange={handleChange}
        />
      </div>
      <div className={styles.frame11}>
        <div className={styles.addressParent}>
          <div className={styles.address5}>KYC</div>
          <div className={styles.verified}>Verified</div>
        </div>
        <button
          className={styles.lightbutton}
          onClick={() => navigate("/kyc")}
          style={{ width: "100%" }}
        >
          <div className={styles.verify}>Verify</div>
        </button>
      </div>
      <div className={styles.lightbuttonWrapper}>
        <Button size="lg" loading={loading} fullWidth onClick={updateUser}>
          Update
        </Button>
      </div>
      <Snackbar
        color="success"
        size="lg"
        variant="soft"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      >
        {"User id copied"}
      </Snackbar>
    </div>
  );
};

export default Profile;
