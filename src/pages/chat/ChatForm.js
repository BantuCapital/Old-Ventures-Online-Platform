import React, { useState } from "react";
import "./Chat-Form.css";
import Button from "@material-ui/core/Button";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import AttachFile from "@material-ui/icons/AttachFile";
import { roundTextFieldStylesHook } from "@mui-treasury/styles/textField/round";
import TextField from "@material-ui/core/TextField";
import EmojiPicker from "./EmojiPicker";
import ImagePicker from "./File-Preview";
import "./Chat-Form.css";
import "./Emoji-Popup.css";
import SendIcon from "@material-ui/icons/Send";

const ChatPage = ({ handleChange, newMessage, handleSend, selectedChat }) => {
  const [textFieldEnabled, enableTextField] = useState(false);


  const toggleEmoji = () => {
    let emojiView = document.getElementById("emojiPicker");
    emojiView.classList.toggle("show");
  };

  const toggleImagePicker = () => {
    let imageView = document.getElementById("imagePicker");
    imageView.classList.toggle("show");
    enableTextField(!textFieldEnabled);
  };

  const pickEmoji = (data) => {
    handleChange(`${newMessage}${data.native}`);
  };
  const inputBaseStyles = roundTextFieldStylesHook.useInputBase();

  return (
    <div id="chat-form">
      {selectedChat.businessId && (
        <div>
          <div className="popup">
            <AttachFile
              style={{ height: 25, width: 30, marginBottom: 2 }}
              onClick={toggleImagePicker}
            />
            <div className="popuptext" id="imagePicker">
              <ImagePicker
                toggleImagePicker={toggleImagePicker}
                send={handleSend}
              />
            </div>
          </div>
          <div className="popup">
            <EmojiEmotionsIcon
              style={{ height: 30, width: 30, marginTop: 14 }}
              onClick={toggleEmoji}
            />
            <div className="popuptext" id="emojiPicker">
              <EmojiPicker pickEmoji={pickEmoji} />
            </div>
          </div>
          <TextField
            disabled={textFieldEnabled}
            placeholder={"Type a message"}
            margin={"small"}
            style={{ height: 33, width: "38vw", marginTop: 12 }}
            InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
            value={newMessage}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Button
            style={{ width: "7%", marginTop: -22, paddingRight: -12 }}
            onClick={() => handleSend()}
            disabled={textFieldEnabled}
          >
            <SendIcon />
          </Button>
        </div>
      )}
      <div />
    </div>
  );
};

export default ChatPage;
