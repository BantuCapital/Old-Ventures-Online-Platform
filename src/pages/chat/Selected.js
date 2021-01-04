import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./Chat-Shell.css";

const Selected = (props) => {
  var bool = props.selectedChat.name === "";
  return (
    <div id="chat-title">
      <ListItem button style={{ height: 45 }}>
        {!bool && <Avatar src={props.selectedChat.avatarUrl} alt={"R"} />}

        <ListItemText
          style={{ marginLeft: 9 }}
          primary={props.selectedChat.title}
        />
      </ListItem>
    </div>
  );
};

export default Selected;
