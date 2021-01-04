import React, { useEffect, useState, useCallback } from "react";
import Badge from "@material-ui/core/Badge";
import MessageIcon from "@material-ui/icons/Message";
import ChatSocketServer from "./utils/chatSocketServer";

const BadgeDiv = () => {
  const [count, setCount] = useState(0);
  const userId = JSON.parse(localStorage.getItem("posts"))?.posts?.profile[0]
    ?._id;

  useEffect(() => {
    if (userId) {
      ChatSocketServer.getNotifications(userId);
      ChatSocketServer.receiveNotifications();
    }
  });

  useEffect(() => {
    const handleNotification = (data) => {
      if (data.notifications?.list) {
        if (data.notifications.unreadCount[0])
          setCount(data.notifications.unreadCount[0]?.unread);
      }
    };
    ChatSocketServer.eventEmitter.on(
      "notification-response",
      handleNotification
    );
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "notification-response",
        handleNotification
      );
  }, []);

  useEffect(() => {
    const handleNotificationAdd = (data) => {
      if (data.type === "MESSAGE") setCount(count + 1);
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
  }, [count]);

  useEffect(() => {
    const handleNotificationDelete = (data) => {
      if (count > 0) {
        if (data.deletedAll) setCount(0);
        else setCount(count - 1);
      }
    };

    ChatSocketServer.eventEmitter.on(
      "delete-notifications-response",
      handleNotificationDelete
    );
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "delete-notifications-response",
        handleNotificationDelete
      );
  }, [count]);

  const handleMessagesUpdate = useCallback(
    (data) => {
      if (data.state === "READ" && data.senderId !== userId) {
        ChatSocketServer.deleteNotifications({
          target: userId,
          messageId: data._id,
        });
      }
    },
    [userId]
  );

  useEffect(() => {
    ChatSocketServer.eventEmitter.on(
      "update-message-response",
      handleMessagesUpdate
    );
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "update-message-response",
        handleMessagesUpdate
      );
  }, [handleMessagesUpdate]);

  return (
    <Badge
      style={{ top: 28, left: 71 }}
      badgeContent={count}
      max={9}
      color="primary"
    >
      <MessageIcon />
    </Badge>
  );
};

export default BadgeDiv;
