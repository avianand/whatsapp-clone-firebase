import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  db as DB,
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

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "groups"), (snapshot) => {
      let getGroups = [];
      const roomsFromDB = snapshot.docs.map((doc) => {
        let groupDetails = doc.data();
        groupDetails.id = doc.id;
        getGroups = [...getGroups, groupDetails];
        // console.log(getGroups);
      });
      dispatch({
        type: actionTypes.GET_GROUPS,
        groups: getGroups,
      });
    });
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
                <Route path="/group/:groupid">
                  <Chat />
                </Route>
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
