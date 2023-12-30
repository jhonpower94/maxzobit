import {
    CircularProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { CurrencyFormat } from "../config/services";
import { convertTimestamp, convertTimestampTime } from "./HistoryItem";
import "./styles.module.css";
import { useLocation } from "react-router-dom";
import HeaderBackButton from "./HeaderBackButton";

export function TransDetailDailog() {
  let { state } = useLocation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [date, setDate] = React.useState(null);

  const data = state.data;
  const {
    amount,
    cointitle,
    recipient,
    confirmation,
    transaction_type,
    timestamp,
    pending,
  } = data;

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const isTimeStamp =
    timestamp == undefined
      ? ""
      : `${convertTimestamp(timestamp)} ${convertTimestampTime(timestamp)}`;

  const isCredit = transaction_type === "Credit";
  const isrecipient = isCredit ? "" : recipient;
  const isConfirmation = confirmation < 3;

  return (
    <div>
      <HeaderBackButton
        userImageUrl={`${isCredit ? "Recieve" : "Sent"} ${cointitle}`}
      />
      <div className="modal-body" bis_skin_checked={1}>
        <List aria-labelledby="nested-list-subheader">
          {[
            {
              primary: "Amount",
              secondary: "",
              secondaryaction: (
                <CurrencyFormat amount={amount} prefix={"$"} seperator={true} />
              ),
            },
            {
              primary: "Date",
              secondary: "",
              secondaryaction: isTimeStamp,
            },

            {
              primary: "Status",
              secondary: isConfirmation ? <CircularProgress size={20} /> : "",
              secondaryaction:
                confirmation === undefined
                  ? "Completed"
                  : `${confirmation} Confirmation`,
            },
            {
              primary: "Amount",
              secondary: "",
              secondaryaction: (
                <Typography
                  variant="h5"
                  color={isConfirmation ? "red" : "green"}
                >
                  {isCredit ? "+" : "-"}
                  <CurrencyFormat
                    amount={amount}
                    prefix={"$"}
                    seperator={true}
                  />
                </Typography>
              ),
            },
          ].map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.primary}
                secondary={item.secondary}
                primaryTypographyProps={{ variant: "h6" }}
              />
              <ListItemSecondaryAction>
                <Typography variant="h5">{item.secondaryaction}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
