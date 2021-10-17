import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Chat from "./Chat";
import axios from "./axios";
import Login from "./Login";
import "./App.scss";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Typography } from "@mui/material";

const App = () => {
  const [messages, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {}, []);
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
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
