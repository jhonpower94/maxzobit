import { Alert, Snackbar, Typography, styled } from "@mui/material";
import { blue } from "@mui/material/colors";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useButton } from "@mui/base/useButton";
import styles from "../src/components/Frame.module.css";

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.active {
    background-color: ${blue[700]};
  }

  &.focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { children } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref,
    component: CustomButtonRoot,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };

  return (
    <CustomButtonRoot {...getRootProps()} className={clsx(classes)}>
      {children}
    </CustomButtonRoot>
  );
});

export const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    if (document.referrer.startsWith("android-app://")) {
      return "twa";
    } else if (navigator.standalone || isStandalone) {
      return "standalone";
    } else {
      window.addEventListener("beforeinstallprompt", handler);
    }

    window.addEventListener("appinstalled", () => {
      // Hide the app-provided install promotion
      setSupportsPWA(false);
      // Clear the deferredPrompt so it can be garbage collected
      setPromptInstall(null);
      // Optionally, send analytics event to indicate successful install
      console.log("PWA was installed");
    });

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const cancel = () => {
    setSupportsPWA(false);
  };

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }
  return (
    <div className={styles.frameParent}>
      <div className={styles.frame}>
        <div className={styles.rectangle} />
        <div className={styles.rectangle}>
          <div className={styles.rectangle} />
          <div className={styles.rectangle}>
            <div className={styles.rectangle} />
            <div className={styles.frame3}>
              <div className={styles.rectangle3} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.installForIosWrapper}>
        <div className={styles.installForIos}>Install for android</div>
      </div>
      <button className={styles.frame4} onClick={onClick}>
        <div className={styles.install}>Install</div>
      </button>
    </div>
  );
};

export const InstallPWAiOS = ({ os }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    console.log(os);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const isStandalone = navigator.standalone;

  useEffect(() => {
    console.log(isStandalone);
  });

  return (
    <>
      {isStandalone ? (
        <></>
      ) : (
        <>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={9999999}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              <Typography gutterBottom>
                Click on browser share button <IosShareIcon />
              </Typography>

              <Typography gutterBottom>
                Then click on the Add to home screen button{" "}
                <AddBoxOutlinedIcon /> to install
              </Typography>
            </Alert>
          </Snackbar>
          <div className={styles.frameParent}>
            <div className={styles.frame}>
              <div className={styles.rectangle} />
              <div className={styles.rectangle}>
                <div className={styles.rectangle} />
                <div className={styles.rectangle}>
                  <div className={styles.rectangle} />
                  <div className={styles.frame3}>
                    <div className={styles.rectangle3} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.installForIosWrapper}>
              <div className={styles.installForIos}>Install for IOS</div>
            </div>
            <button className={styles.frame4} onClick={handleClick}>
              <div className={styles.install}>Install</div>
            </button>
          </div>
        </>
      )}
    </>
  );
};
