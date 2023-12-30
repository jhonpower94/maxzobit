import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import HeaderBackButton from "../components/HeaderBackButton";
import { addUsers } from "../config/services";
import styles from "./Kyc.module.css";
import { Button, Snackbar } from "@mui/joy";
import { storage } from "../config/firebase";

const Kyc = () => {
  const userInfos = useSelector((state) => state.useInfos);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [values, setValues] = useState({
    imageid: { image: "", loading: false },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setValues({
        ...values,
        imageid: { image: userInfos.image_url, loading: true },
      });

      const storageRef = ref(storage, `images/${acceptedFiles[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, acceptedFiles[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setValues({
            ...values,
            imageid: { image: "", loading: false },
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            addUsers(userInfos.id, {
              kyc_verified: true,
              image_url: downloadURL,
            }).then(() => {
              setValues({
                ...values,
                imageid: { image: `${downloadURL}`, loading: false },
              });
              setOpenSnackbar(true);
            });
          });
        }
      );
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className={styles.kyc}>
      <HeaderBackButton userImageUrl="KYC" />
      <div className={styles.verifyIdentificationParent}>
        <div className={styles.verifyIdentification}>Verify identification</div>
        <div className={styles.uploadAnyClear}>
          Upload any clear photo or scanned image of your identity document
        </div>
      </div>
      <div className={styles.frame}>
        <div className={styles.address}>Document type</div>
        <select
          defaultValue={"International passport"}
          name="id_type"
          className={styles.frame1}
        >
          {["International passport", "Drivers Licence", "Voters card"].map(
            (option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            )
          )}
        </select>
      </div>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={styles.lightbuttonWrapper}
      >
        <input {...getInputProps()} />
        <Button size="lg" loading={values.imageid.loading} fullWidth>
          Upload ID
        </Button>
      </div>
      <div className={styles.kycInner}>
        <div
          className={styles.frameWrapper}
          style={{
            backgroundColor: "#dedede",
            backgroundImage: userInfos.kyc_verified
              ? `url(${userInfos.image_url})`
              : `url(${values.imageid.image})`,
          }}
        >
          <div className={styles.doneWrapper}>
            <img className={styles.doneIcon} alt="" src="/done@2x.png" />
          </div>
        </div>
        <Snackbar
          color="success"
          size="lg"
          variant="soft"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackbar}
          onClose={handleCloseSnackbar}
        >
          {
            "Your file has been uploaded successfully, your account will be verified onces it is reviewed and confirmed."
          }
        </Snackbar>
      </div>
    </div>
  );
};

export default Kyc;
