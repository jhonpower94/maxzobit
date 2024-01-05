import { useEffect, useRef, useState } from "react";
import styles from "./Send.module.css";
import HeaderBackButtonCoin from "../components/HeaderBackButtonCoin";
import { useLocation } from "react-router-dom";
import { Button, Option, Select, Snackbar } from "@mui/joy";
import { useSelector } from "react-redux";
import { CurrencyFormat, updateUserBalance } from "../config/services";
import { Typography } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { io } from "socket.io-client";
import { MaxButton } from "../components/StyledButtons";
import { DebounceInput } from "react-debounce-input";
import { LoaderSmall } from "../components/loader";

const Send = () => {
  let { state } = useLocation();
  const socket = useRef();
  const userInfos = useSelector((state) => state.useInfos);
  const { tron_balance, eth_balance, id } = userInfos;
  const [loading, setLoading] = useState(false);
  const [loadingConvert, setLoadingConvert] = useState(false);
  const [loadingMax, setLoadingMax] = useState(false);
  const [value, setValue] = useState({
    amount: 0,
    coin: "",
    address: "",
    network: "Tron",
    alerMessage: "",
    severity: "warning",
  });

  const { image, coinname, code, cointype, balance } = state.coin;

  useEffect(() => {
    socket.current = io("https://stackcoinserver.onrender.com");
    function onConnect() {
      console.log("connected to server");
    }
    function onDisconnect() {
      console.log("socket disconnected ");
    }
    socket.current.on("connect", onConnect);

    socket.current.on("disconnect", onDisconnect);
    return () => {
      socket.current.off("connect", onConnect);
      socket.current.off("disconnect", onDisconnect);
    };
  }, [value]);

  const switchWalletBalance = (key) => {
    switch (key) {
      case "Tron":
        return tron_balance;
      default:
        return eth_balance;
    }
  };

  const switchNetwork = (key) => {
    switch (key) {
      case "Tron":
        return { name: "Tron", type: "tron_balance" };
      default:
        return { name: "Ethereum", type: "eth_balance" };
    }
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const setCurrency = (event, amount) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
      amount: amount,
    });
  };

  const setMaxCoin = () => {
    if (balance > 0) {
      setLoadingMax(true);
      socket.current.emit("maxcoin", {
        from: "USDT",
        to: code,
        amount: balance,
      });
      socket.current.on("maxcoin", (value) => {
        setValue({ ...value, coin: value, amount: balance });
        setLoadingMax(false);
      });
    }
  };

  const submitform = (event) => {
    event.preventDefault();
    setLoading(true);

    const selectedNetworkBalance = switchWalletBalance(value.network);
    const selectedNetwork = switchNetwork(value.network).name;
    const selectedNetworkType = switchNetwork(value.network).type;

    if (balance < value.amount || balance == 0) {
      setValue({
        ...value,
        severity: "warning",
        alerMessage: `
        Insufficient ${coinname} balance`,
      });
      setOpenSnackbar(true);
      setLoading(false);
    } else if (selectedNetworkBalance < 1000) {
      setTimeout(() => {
        setValue({
          ...value,
          severity: "warning",
          alerMessage: `
          You do not have enough ${selectedNetwork} to cover your network and gas fee, deposit ${
            selectedNetwork === "Tron" ? "$1,050 worth of" : 0.8
          } ${selectedNetwork} to proceed!`,
        });
        setOpenSnackbar(true);
        setLoading(false);
      }, 8000);
    } else {
      const newbalance = balance - value.amount;
      // add newbalance
      updateUserBalance(id, cointype, newbalance).then(() => {
        const newNetworkBalance = selectedNetworkBalance - 1000;
        // add new network balance
        updateUserBalance(id, selectedNetworkType, newNetworkBalance).then(
          () => {
            // add transactions
            const data = {
              fullname: `${userInfos.firstName} ${userInfos.lastName}`,
              email: userInfos.email,
              userid: userInfos.id,
              cointitle: code,
              cointype: cointype,
              selectednetwordtype: selectedNetworkType,
              amount: value.amount,
              coin: value.coin,
              recipient: value.address,
              transaction_type: "Debit",
              confirmation: 0,
              pending: true,
              timestamp: serverTimestamp(),
            };
            const trxRef = doc(collection(db, "users", id, "transactions"));
            setDoc(trxRef, { ...data }).then(() => {
              // add general transaction
              const trxwalletRef = collection(db, "transactionswallet");
              addDoc(trxwalletRef, {
                ...data,
                transactionid: trxRef.id,
              }).then(() => {
                console.log("Sent");
                setValue({
                  ...value,
                  severity: "success",
                  alerMessage: `You have successfully sent $${value.amount} - ${value.coin} ${code}`,
                });
                setOpenSnackbar(true);
                setLoading(false);
              });
            });
          }
        );
      });
    }
  };

  return (
    <>
      <form onSubmit={submitform}>
        <div className={styles.send}>
          <HeaderBackButtonCoin coinImage={image} title={`Send ${code}`} />
          <div className={styles.btcAvailableWrapper}>
            <div className={styles.btcAvailable}>
              <Typography variant="body1">
                <CurrencyFormat
                  amount={balance}
                  prefix={"$"}
                  seperator={true}
                />
                {" available "}
                {code}
              </Typography>
            </div>
          </div>

          <div className={styles.frame1}>
            <div className={styles.amount}>Enter amount in {code} value</div>
            <div className={styles.frameGroup}>
              <DebounceInput
                minLength={0}
                debounceTimeout={3000}
                className={styles.frame2}
                type="number"
                name="coin"
                placeholder="0.0000"
                value={value.coin}
                onChange={(event) => {
                  if (event.target.value > 0) {
                    setLoadingConvert(true);
                    console.log(event.target.value);
                    socket.current.emit("convert", {
                      from: code,
                      to: "USDT",
                      amount: Number(event.target.value),
                    });
                    socket.current.on("convert", (amount) => {
                      setCurrency(event, amount);
                      setLoadingConvert(false);
                    });
                  }
                }}
              />
              <MaxButton
                loading={loadingMax}
                text={"Max"}
                className={styles.frame3}
                handleClick={setMaxCoin}
              />
            </div>
            <div className={styles.amount}>
              You will receive{" "}
              {loadingConvert ? (
                <LoaderSmall />
              ) : (
                <CurrencyFormat
                  amount={value.amount}
                  prefix={"$"}
                  seperator={true}
                />
              )}
            </div>
          </div>

          <div className={styles.frame4}>
            <div className={styles.amount}>Receivers {code} address</div>
            <input
              className={styles.frame5}
              type="text"
              name="address"
              value={value.address}
              onChange={handleChange}
            />
          </div>

          <div className={styles.addressParent}>
            <Select
              placeholder="Select network"
              name="network"
              required
              size="lg"
              onChange={handleChange}
              sx={{ width: "100%" }}
            >
              <Option value="Tron">Tron</Option>
              <Option value="Ethereum">Ethereum</Option>
            </Select>
          </div>

          <div className={styles.frameWrapper}>
            <Button
              type="submit"
              size="lg"
              loading={loading || loadingConvert}
              fullWidth
            >
              Continue
            </Button>
          </div>
        </div>
        <Snackbar
          color={value.severity}
          size="lg"
          variant="soft"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackbar}
          onClose={handleCloseSnackbar}
        >
          {value.alerMessage}
        </Snackbar>
      </form>
    </>
  );
};

export default Send;
