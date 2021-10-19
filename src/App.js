import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import SideBar from "./SideBar";
import Chat from "./Chat";
import axios from "./axios";
import Login from "./Login";
import db from "./firebase";
import "./App.scss";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Typography } from "@mui/material";

const App = () => {
  const [groups, setGroups] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(async () => {
    //get groups
    let groups = [];
    const querySnapshot = await getDocs(collection(db, "group"));
    querySnapshot?.forEach(async (group) => {
      // doc.data() is never undefined for query doc snapshots
      let groupDetails = group.data();
      groupDetails.id = group.id;
      groups = [...groups, groupDetails];

      const docRef = await getDocs(collection(db, "message"));
      docRef?.forEach(async (group) => {
        console.log(group.id);
      });
    });
    dispatch({
      type: actionTypes.GET_GROUPS,
      groups: groups,
    });

    //get users
    const querySnapshotUser = await getDocs(collection(db, "users"));
    querySnapshotUser?.forEach((doc) => {
      // console.log("User: ", doc.data());
    });

    //get messages

    // const querySnapshotMessage = await getDocs(collection(db, "message"));
    // querySnapshotMessage?.forEach((doc) => {
    //   console.log("Message: ", doc);
    // });
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <div className="app__body">
            <Router>
              <SideBar />
              <Switch>
                <Route path="/room/:roomid">{/* <Chat /> */}</Route>
                <Route path="/">{/* <Chat /> */}</Route>
              </Switch>
            </Router>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
