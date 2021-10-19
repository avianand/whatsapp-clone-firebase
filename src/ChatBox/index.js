import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { doc, addDoc, collection } from "firebase/firestore";
import db from "../firebase";
import "./index.scss";
import { useStateValue } from "../StateProvider";
import { Link, useLocation } from "react-router-dom";
import axios from "../axios";
import { actionTypes } from "../reducer";

function ChatBox({ addNewChat, name, roomId, users }) {
  const [seed, setseed] = useState("");
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("please enter name for chatroom");

    if (roomName) {
      const randomRoomId = "group__" + Math.floor(1000 + Math.random() * 9000);

      const docRef = await addDoc(collection(db, "group"), {
        groupName: roomName,
        groupId: randomRoomId,
        createdBy: user.email,
        createdAt: new Date(),
        lastModifiedAt: new Date(),
        members: [user.email],
        type: true,
      });
      console.log(docRef);
    }
  };
  const handleCurrentRoomChange = () => {
    dispatch({
      type: actionTypes.SET_CURRENT_ROOM,
      currentRoomId: roomId,
    });
  };

  return !addNewChat ? (
    <div onClick={handleCurrentRoomChange}>
      <div className="chatBox">
        <div className="activeUser">
          <Avatar
            src={`https://avatars.dicebear.com/api/pixel-art/:${seed}.svg`}
          />

          <div className="activeUserDetails">
            <span className="activeUserName">{name}</span>
            <span className="activeUserStatus">Last message...</span>
          </div>
        </div>

        <div className="lastSeen">last seen</div>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="chatBox">
      <h3>Add new Chat</h3>
    </div>
  );
}

export default ChatBox;
