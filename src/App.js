import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Spinner from "react-spinkit";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Compose from "./components/Compose";
import Profile from "./components/Profile";
import Note from "./components/Note";
import "./App.css";

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="app-loading">
        <Spinner name="folding-cube" fadeIn="none" color="teal" />
      </div>
    );
  }

  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route path="/" exact>
            {!user ? <Login /> : <Dashboard user={user} />}
          </Route>
          <Route path="/notes/:id">
            {!user ? <Login /> : <Note user={user} />}
          </Route>
          <Route path="/compose" exact>
            {!user ? <Login /> : <Compose user={user} />}
          </Route>
          <Route path="/profile" exact>
            {!user ? <Login /> : <Profile user={user} />}
          </Route>
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;
