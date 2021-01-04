import React, { useEffect, useState, useCallback } from "react";
import ChatSocketServer from "./utils/chatSocketServer";
import { Link } from "react-router-dom";
import { List, ListItem, Avatar, ListItemText } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import MenuItem from "@material-ui/core/MenuItem";

const Notifications = ({ clearList, handleClear }) => {
  const [state, setState] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [userId] = useState(
    JSON.parse(localStorage.getItem("posts"))?.posts?.profile[0]?._id
  );

  const [userName] = useState(
    JSON.parse(localStorage.getItem("posts"))?.posts?.profile[0]?.businessName
  );

  // useEffect(() => {
  //   //   // ChatSocketServer.establishSocketConnection(userId);
  //   //   // ChatSocketServer.receiveNotifications();
  //   ChatSocketServer.getNotifications(userId);
  // }, [userId]);

  const handleNotification = useCallback(
    (data) => {
      if (data.notifications?.list) {
        setState(data.notifications.list);
      } else setState([data, ...state]);
    },
    [state]
  );

  useEffect(() => {
    ChatSocketServer.eventEmitter.on(
      "notification-response",
      handleNotification
    );
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "notification-response",
        handleNotification
      );
  }, [handleNotification]);

  useEffect(() => {
    const handleNotificationAdd = (data) => {
      const item = state.find((x) => x._id === data._id);
      if (!item) {
        setState([data, ...state]);
        setUnreadCount(unreadCount + 1);
        setLoading(false);
      }
    };

    ChatSocketServer.eventEmitter.on(
      "send-notification-response",
      handleNotificationAdd
    );
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "send-notification-response",
        handleNotificationAdd
      );
  }, [unreadCount]);

  // useEffect(() => {
  //   const handleMessageAdd = (data) => {
  //     console.log(data);
  //     if (data.senderId !== userId) setUnreadCount(unreadCount + 1);
  //     setLoading(false);
  //   };

  //   ChatSocketServer.eventEmitter.on("add-message-response", handleMessageAdd);
  //   return () =>
  //     ChatSocketServer.eventEmitter.removeListener(
  //       "add-message-response",
  //       handleMessageAdd
  //     );
  // }, [userId, unreadCount]);

  useEffect(() => {
    const clear = () =>
      new Promise((resolve, reject) => {
        ChatSocketServer.deleteNotifications({
          target: userId,
        });

        resolve();
      });
    if (clearList) {
      clear().then(() => {
        setState([]);
        handleClear(false);
      });
    }
  }, [clearList, state, userId, userName, handleClear]);

  const listNotifications = (list) => {
    if (loading) return <div>Loading..</div>;
    if (!loading && !list[0])
      return <div style={{ textAlign: "center" }}>No notifications</div>;

    return list.map((item) => {
      const { type, message, state: readState, _id, avatarUrl, from } = item;
      return (
        <List key={_id}>
          <ListItem style={{ height: 55 }} button key={1}>
            <FiberManualRecordIcon style={{ color: "red" }} />
            <Avatar src={avatarUrl} alt="R" />
            <ListItemText
              style={{ marginLeft: 5 }}
              primary={from}
              secondary={message}
            />
          </ListItem>
        </List>
        // <Link key={_id} to="/inbox">
        //   <MenuItem onClick={() => handleClose(_id, readState)}>
        //     {`${message}`} | {readState === "DELIVERED" ? "D" : "R"}
        //   </MenuItem>
        // </Link>
      );
    });
  };

  return <div className="notificationlist">{listNotifications(state)}</div>;
};

export default Notifications;
