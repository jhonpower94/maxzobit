import {
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from "@mui/material";
import HeaderBackButton from "../components/HeaderBackButton";
import styles from "./notification.module.css";
import { useDispatch, useSelector } from "react-redux";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

function Notifications() {
  const userinfo = useSelector((state) => state.useInfos);
  const allNotifications = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const clearNotfcation = async (uid) => {
    await deleteDoc(doc(db, "users", `${userinfo.id}`, "notification", uid));
    //dispatch(clearnotification$());
  };

  return (
    <div className={styles.notification}>
      <HeaderBackButton userImageUrl="Notifications" />

      <div className={styles.frameParent}>
        <List>
          {allNotifications.map((notification, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={notification.title}
                secondary={notification.message}
                primaryTypographyProps={{ variant: "h6" }}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => clearNotfcation(notification.uid)}>
                  <DeleteForeverOutlined fontSize="large" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Notifications;
