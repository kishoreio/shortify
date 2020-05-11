import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Banner from "./Components/Introduction/Banner";
import Link from "./Components/Link/Link";
import Feature from "./Components/Features/Feature";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import DashBoard from "./Components/DashBoard/DashBoard";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const changeIsLoggedIn = (name) => {
    setIsLoggedIn((prevState) => !prevState);
    setName(name);
  };
  const clearStorageToken = () => {
    localStorage.clear();
    changeIsLoggedIn();
  };
  return (
    <div>
      <HashRouter>
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={clearStorageToken}
          name={name}
        />
        <Switch>
          <Route exact path="/">
            <Banner />
            <Link />
            <Feature />
          </Route>
          <Route path="/dashboard">
            <DashBoard isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/login">
            {isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login changeIsLoggedIn={changeIsLoggedIn} />
            )}
          </Route>
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </HashRouter>
    </div>
  );
};

export default App;
