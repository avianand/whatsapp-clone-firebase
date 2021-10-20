import {
  AttachFile,
  HourglassBottom,
  KeyboardVoice,
  Mood,
  MoreVert,
  Search,
  Warning,
  WhatsApp,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

import db from "../firebase";
import "./index.scss";
import { useStateValue } from "../StateProvider";

import Message from "../Message";

function Chat() {
  const [input, setinput] = useState("");
  const [seed, setseed] = useState("");
  const [groupMessages, setGroupMessages] = useState([]);
  const [{ user, currentGroup }, dispatch] = useStateValue();

  const handleChange = (e) => {
    setinput(e.target.value);
  };

  useEffect(() => {
    if (currentGroup) {
      const collectionRef = doc(db, "message", currentGroup?.id);
      const collectionR = collection(collectionRef, "messages");
      const unsub = onSnapshot(collectionR, (snapshot) => {
        let groupMessagesNew = [];
        const roomsFromDB = snapshot.docs.map((doc) => {
          const messageDetails = doc.data();
          messageDetails.id = doc.id;
          groupMessagesNew = [...groupMessagesNew, messageDetails];
          //console.log(doc.id);
        });
        setGroupMessages(groupMessagesNew);
      });
      return unsub;
    }
  }, [currentGroup]);

  console.log({ user });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collectionRef = doc(db, "message", currentGroup?.id);
    const collectionR = collection(collectionRef, "messages");
    const userDetails = {};
    userDetails.uid = user.uid;
    userDetails.name = user.displayName;
    userDetails.email = user.email;
    userDetails.image = user.photoURL;
    const docRef = await addDoc(collectionR, {
      messageText: input,
      sentAt: new Date(),
      sentBy: userDetails,
    });
    // console.log("Document written with ID: ", docRef.id);

    setinput("");
  };

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  return currentGroup ? (
    <div className="chat">
      <div className="chat_header">
        <div className="activeUser">
          <Avatar
            src={`https://avatars.dicebear.com/api/pixel-art/:${seed}.svg`}
          />
          <div className="activeUserDetails">
            <span className="activeUserName">
              {currentGroup.name ? currentGroup.name : currentGroup.groupName}
            </span>
            <span className="activeUserStatus">Last seen at...</span>
          </div>
        </div>

        <div className="rightIcons">
          <IconButton className="chatIcon">
            <Search />
          </IconButton>
          <IconButton className="chatIcon">
            <AttachFile />
          </IconButton>
          <IconButton className="moreIcon">
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {groupMessages?.length ? (
          groupMessages?.map((message, index) => (
            <Message key={message.id} message={message} user={user} />
          ))
        ) : (
          <div className="noMessage">
            <HourglassBottom /> Getting your messages, please wait...
          </div>
        )}
      </div>
      <div className="chat_footer">
        <IconButton>
          <Mood className="moodIcon" />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            className="chatText"
            value={input}
            onChange={handleChange}
          />
          <button type="submit"></button>
        </form>
        <IconButton>
          <KeyboardVoice className="voiceIcon" />
        </IconButton>
      </div>
    </div>
  ) : (
    <div className="noGroupSelected">
      <WhatsApp fontSize="large" /> Select a group to view messages
    </div>
  );
}

export default Chat;
