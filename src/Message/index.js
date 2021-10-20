import { Typography } from "@mui/material";
import React from "react";
import { formatDate, formatTime } from "../utilities";
import "./index.scss";

function Message({ message, user }) {
  const isSender = (message) => {
    if (user?.email === message?.sentBy.email) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="speech-wrapper">
        <div className={`bubble ${isSender(message) ? "alt" : ""}`}>
          <div className="txt">
            <p className="name alt">
              {message?.sentBy.email.substring(0, 15) + "..."}
              <span> ~ {message?.sentBy.name.split(" ")[0]}</span>
            </p>
            <p className="message">{message?.messageText}</p>
            <span class="timestamp">
              {formatTime(message?.sentAt)} , {formatDate(message?.sentAt)}
            </span>
          </div>
          <div
            className={`bubble-arrow ${isSender(message) ? "alt" : "alt"}`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Message;
