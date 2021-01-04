import React, { useEffect, useState, useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Conversation-Item.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChatSocketServer from "./utils/chatSocketServer";

const ConversationItem = (props) => {
  const {
    conversation: { businessId },
  } = props;
  const [userTyping, setUserTyping] = useState({
    userId: "",
    userAction: "",
  });

  const { title, messages, avatarUrl } = props.conversation;

  useEffect(() => {
    const handleUserTyping = (data) => {
      setUserTyping(data);
      setTimeout(() => {
        setUserTyping({
          userId: "",
          userAction: "",
        });
      }, 1000);
    };
    ChatSocketServer.eventEmitter.on("set-typing-response", handleUserTyping);
    return () => {
      ChatSocketServer.eventEmitter.removeListener(
        "set-typing-response",
        handleUserTyping
      );
    };
  }, [setUserTyping]);

  let className = "conversation";

  if (props.isActive) {
    className += " active";
  }

  return (
    <div className={className}>
      <ListItem button style={{ height: 70 }}>
        <Avatar src={avatarUrl} alt={"R"} />
        <ListItemText
          style={{ marginLeft: 9 }}
          primary={title}
          secondary={
            userTyping.userId === businessId
              ? userTyping.userAction
              : messages[0]
              ? `${messages[0].message} ${messages[0].state}`
              : ""
          }
        />
      </ListItem>
    </div>
  );
};

export default ConversationItem;
