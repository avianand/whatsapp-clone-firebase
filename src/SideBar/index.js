import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import ChatBox from "../ChatBox";
import db from "../firebase";
import "./index.scss";
import { useStateValue } from "../StateProvider";
import axios from "../axios";
import { actionTypes } from "../reducer";

function SideBar() {
  // const [rooms, setRooms] = useState([]);

  const [{ user, groups }, dispatch] = useStateValue();
  const [selectedRoom, setselectedRoom] = useState(null);

  useEffect(() => {
    // const unsub = onSnapshot(collection(db, "rooms"), (snapshot) => {
    //   const roomsFromDB = snapshot.docs.map((doc) => doc.data());
    //   dispatch({
    //     type: actionTypes.GET_ROOMS,
    //     rooms: roomsFromDB,
    //   });
    // });
    // return unsub;
  }, []);
  return (
    <div className="sidebar">
      <div className="header">
        <Avatar src={user?.photoURL} />
        {/* <Typography>{user?.displayName.split(" ")[0]}</Typography> */}
        <div className="rightIcons">
          <IconButton className="chatIcon">
            <DonutLarge />
          </IconButton>
          <IconButton className="chatIcon">
            <Chat />
          </IconButton>
          <IconButton className="moreIcon">
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="searchBarContainer">
        <div className="searchBar">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sideBarchats">
        <ChatBox addNewChat />
        {groups
          ? groups.map((group) => (
              <ChatBox
                key={group.id}
                groupId={group.groupId}
                group={group}
                name={group.name || group.groupName}
                users={group.users}
                messages={group?.messages ? group.messages : null}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default SideBar;
