import React from "react";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const EmojiWindow = ({ pickEmoji }) => {
  return (
    <>
      <Picker
        i18n={{
          search: "Search",
          categories: { search: "Search", recent: "Frequently used" },
        }}
        set="apple"
        onSelect={pickEmoji}
        title="Pick your emoji…"
        emoji="point_up"
        style={{ position: "absolute", bottom: "20px", right: "20px" }}
      />
    </>
  );
};

export default EmojiWindow;
