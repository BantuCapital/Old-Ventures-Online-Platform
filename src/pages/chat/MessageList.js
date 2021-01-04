import React, { useState, useEffect, useCallback } from "react";

import Message from "./Message";
import "./Message-List.css";
import ChatSocketServer from "./utils/chatSocketServer";
import ChatHttpServer from "./utils/chatHttpServer";
import Selected from "./Selected";

const MessageList = (props) => {
  const [userId] = useState(
    JSON.parse(localStorage.getItem("posts"))?.posts?.profile[0]?._id
  );

  const { selectedChat, messageList, setMessageList, hasMoreMsgs } = props;

  const handleMessageAdd = useCallback(
    (data) => {
      if (selectedChat.chatId === data.chatId) {
        setMessageList([...messageList, data]);
      }
    },
    [messageList, selectedChat, setMessageList]
  );

  useEffect(() => {
    ChatSocketServer.eventEmitter.on("add-message-response", handleMessageAdd);
    return () =>
      ChatSocketServer.eventEmitter.removeListener(
        "add-message-response",
        handleMessageAdd
      );
  }, [handleMessageAdd]);

  const messageItems = messageList.map((message) => {
    var isMyMessage =
      JSON.stringify(message.senderId) === JSON.stringify(userId);

    if (message.state !== "READ" && !isMyMessage) {
      ChatSocketServer.updateMessage({
        ...message,
        state: "READ",
        chatId: message.chatId,
      });

      const newList = messageList.filter((msg) => {
        if (message._id === msg._id) {
          msg.state = "READ";
        }
        return msg;
      });

      setMessageList(newList);
    }

    return (
      <Message
        avatarUrl={props.selectedChat.avatarUrl}
        timeStamp={message.createdAt}
        id={message._id}
        key={message._id}
        state={message.state}
        isMyMessage={isMyMessage}
        message={message.message}
        file={message.files[0]}
      />
    );
  });

  console.log(props);

  return (
    <div id="chat-message-list">
      {props.selectedChat.chatId && (
        <div>
          {props.loadingMessages ? (
            <div>Fetching messages</div>
          ) : (
            <div>
              {hasMoreMsgs && (
                <button
                  onClick={() => props.setOffsetIndex(props.offsetIndex + 1)}
                >
                  Get older messages
                </button>
              )}
            </div>
          )}
          <div>{messageItems}</div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
