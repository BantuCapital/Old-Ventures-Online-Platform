import React, { useState } from "react";
import "./file.css";

const Upload = ({ toggleImagePicker, send }) => {
  const [localFileUrl, setLocalFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const handleChange = (event) => {
    setLocalFileUrl(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handleCancel = () => {
    toggleImagePicker();
    setLocalFileUrl(null);
    setCaption("");
  };

  const handleSend = () => {
    send({
      file,
      caption,
      localFileUrl,
    });
    handleCancel();
  };

  return (
    <div>
      {!localFileUrl && (
        <input
          type="file"
          style={{width:'140px'}}
          accept="image/*, .pdf, .doc"
          onChange={handleChange}
        />
      )}
      {localFileUrl && (
        <div>
          {file.type.includes("image") ? (
            <div>
              <img style={{height:300,width:300}} src={localFileUrl} alt="upload" />
              <input
                value={caption}
                type="text"
                placeholder="Add caption"
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          ) : (
            <a href={localFileUrl}>{file.name}</a>
          )}
          <div>
            <div>
              <button onClick={() => handleSend()}>Send</button>
            </div>
          </div>
        </div>
      )}
      <div>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Upload;
