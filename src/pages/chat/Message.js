import React, { useCallback, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Message-List.css";
import ChatSocketServer from "./utils/chatSocketServer";
import CheckIcon from "@material-ui/icons/Check";
import { green } from "@material-ui/core/colors";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import moment from "moment";

const Message = (props) => {
  const [state, setState] = useState(props.state);

  const handleMessagesUpdate = useCallback(
    (data) => {
      if (props.id === data._id) {
        setState(data.state);
      }
    },
    [props]
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

  let messageClass = "message-row";
  let imageThumbnail = null;
  const timeStamp = moment(props.timeStamp).format("LT DD/MM/YY");
  let icon =
    JSON.stringify(state) === JSON.stringify("READ") ? (
      ""
    ) : JSON.stringify(state) === JSON.stringify("SENT") ? (
      <CheckIcon />
    ) : JSON.stringify(state) === JSON.stringify("") ? (
      ""
    ) : JSON.stringify(state) === JSON.stringify("DELIVERED") ? (
      <DoneAllIcon />
    ) : (
      <DoneAllIcon style={{ color: green[500] }} />
    );
  if (props.isMyMessage) {
    messageClass += " you-message";
  } else {
    messageClass += " other-message";
    imageThumbnail = <Avatar src={props.avatarUrl} alt={"v"} />;
  }

  return (
    <div className={messageClass}>
      <div className="message-content">
        {imageThumbnail}
        <div className="message-text">
          {props.file &&
            (props.file.type.includes("image") ? (
              <div style={{ height: 255, width: 255 }}>
                <img
                  style={{ height: 250, width: 250 }}
                  src={props.file.url || props.file.localFileUrl}
                  alt="upload"
                />
              </div>
            ) : (
              <a href={props.file.url || props.file.localFileUrl}>
                {props.file.name}
              </a>
            ))}
          {!props.file ? (
            <div>{props.message}</div>
          ) : (
            <div>{props.file.caption}</div>
          )}
        </div>
        <div className="message-time">{timeStamp}</div>
        {props.isMyMessage && <div className="message-time">{icon}</div>}
      </div>
    </div>
  );
};

export default Message;
