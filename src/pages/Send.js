import { useState } from "react";
import styles from "./Send.module.css";
import HeaderBackButtonCoin from "../components/HeaderBackButtonCoin";
import { useLocation } from "react-router-dom";
import { Button, Option, Select, Snackbar } from "@mui/joy";
import { useSelector } from "react-redux";
import { CurrencyFormat, convert, updateUserBalance } from "../config/services";
import { Typography } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const Send = () => {
  let { state } = useLocation();
  const userInfos = useSelector((state) => state.useInfos);
  const {
    tron_balance,
    eth_balance,
    id,
  } = userInfos;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    amount: 0,
    coin: "",
    address: "",
    network: "Tron",
    alerMessage: "",
    severity: "warning",
  });

  const { image, coinname, code, cointype, balance } = state.coin;

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
        return { name: "Etheruem", type: "eth_balance" };
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

  const handleChangeCoin = async (event, key) => {
    await convert.ready();
    const isemptyvalue = event.target.value === "";
    switch (key) {
      case "BTC":
        return isemptyvalue ? 0 : convert.BTC.USD(event.target.value);
      case "ETH":
        return isemptyvalue ? 0 : convert.ETH.USD(event.target.value);
      case "BNB":
        return isemptyvalue ? 0 : convert.BNB.USD(event.target.value);
      case "TRX":
        return isemptyvalue ? 0 : convert.TRX.USD(event.target.value);
      case "USDT":
        return isemptyvalue ? 0 : convert.USDT.USD(event.target.value);
      default:
        return isemptyvalue ? 0 : convert.USDT.USD(event.target.value);
    }
  };

  const setMaxCoin = async (key) => {
    await convert.ready();
    switch (key) {
      case "BTC":
        return convert.USD.BTC(balance);
      case "ETH":
        return convert.USD.ETH(balance);
      case "BNB":
        return convert.USD.BNB(balance);
      case "TRX":
        return convert.USD.TRX(balance);
      case "USDT":
        return convert.USD.USDT(balance);
      default:
        return convert.USD.USDT(balance);
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
          You do not have enough ${selectedNetwork} to cover your network fees`,
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
              <input
                className={styles.frame2}
                type="number"
                name="coin"
                placeholder="0.0000"
                defaultValue={value.coin}
                onChange={(event) =>
                  handleChangeCoin(event, code).then((amount) =>
                    setCurrency(event, amount)
                  )
                }
              />
              <button
                className={styles.frame3}
                onClick={() =>
                  setMaxCoin(code).then((value) => {
                    setValue({ ...value, coin: value, amount: balance });
                  })
                }
              >
                <div className={styles.max}>Max</div>
              </button>
            </div>
            <div className={styles.amount}>
              You will receive{" "}
              <CurrencyFormat
                amount={value.amount}
                prefix={"$"}
                seperator={true}
              />
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
            <Button type="submit" size="lg" loading={loading} fullWidth>
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
