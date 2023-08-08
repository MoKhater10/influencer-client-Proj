import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/login-page/LoginPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginForm from "./components/loginForm/LoginForm";
import LoginChoose from "./components/loginChoose/LoginChoose";
import TradeMarkRegister from "./pages/tradeMarkRegister/TradeMarkRegister";
import InfluencerRegister from "./pages/influencerRegister/InfluencerRegister";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import NotFound from "./pages/notFound/NotFound";
import ChoosenInfluencers from "./pages/chosenInfluencers/ChoosenInfuencers";
import React from "react";
import ProfileSetting from "./pages/profileSetting/ProfileSetting";
import ProfileUser from "./components/profileUser/ProfileUser";
import ProfileChangePassword from "./components/profileChangePassword/ProfileChangePassword";
import LoadingWebsite from "./components/loadingWebsite/LoadingWebsite";
import { Fragment } from "react";
import { getApiUrl } from "./helpers";
import authService from "./services/auth-services";


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);



var subdomain = window.location.origin;

// Define CSS variables based on the subdomain
var cssVariables = {};

const DOMAINS = {
  "AZZRK": "https://influencer.azzrk.com",
  "ATHAR" : "https://influencer.atherr.com",
  "MARDOD" : "https://influencer.marrdoud.com",
  "WARAQA" : "https://influencer.warrqa.com",
  "DARB" : "https://influencer.darbplatform.com",
  "SMOUE" : "https://influencer.sumoue.com",
}

switch (subdomain){
  case DOMAINS.AZZRK: 
  cssVariables.primaryColor = '#1da1f2';
  cssVariables.secondaryColor = 'white';
  break;

  case DOMAINS.ATHAR : 
  cssVariables.primaryColor = '#d3a131';
  cssVariables.secondaryColor = '#343062';
  break;

  case DOMAINS.MARDOD :
  cssVariables.primaryColor = '#16edb1';
  cssVariables.secondaryColor = 'black';
  break

  case DOMAINS.WARAQA :
  cssVariables.primaryColor = '#ff7000';
  cssVariables.secondaryColor = 'black';
  break

  case DOMAINS.DARB :
  cssVariables.primaryColor = 'rgb(0, 223, 197)';
  cssVariables.secondaryColor = '#FFFFFF';
  break

  case DOMAINS.SMOUE :
  cssVariables.primaryColor = '#e31313';
  cssVariables.secondaryColor = '#FFFFFF';
  break

  default :  
  cssVariables.primaryColor = '#C5F60D';
  cssVariables.secondaryColor = 'black';

}

// Update the CSS variables
var root = document.documentElement;

Object.keys(cssVariables).forEach(function(key) {
  root.style.setProperty('--' + key, cssVariables[key]);
});


  const checkUserToken = () => {
    const userToken = localStorage.getItem("brand");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      if (
        location.pathname.includes("/home") ||
        location.pathname.includes("/profile-setting") ||
        location.pathname.includes("/choosen-influencers") ||
        location.pathname.includes("/contact") ||
        location.pathname.includes("/profile-setting") ||
        location.pathname.includes("/influencers")
      ) {
        navigate("/");
      }
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [localStorage.getItem("brand")]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoaded(true);
    });
  }, []);

  return (
    <Fragment>
      {loaded ? (
      <div className="App">
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<LoginPage />}>
              <Route path="" element={<LoginForm />} />
              <Route path="create-account" element={<LoginChoose />} />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route
              path="/create-account/brand"
              element={<TradeMarkRegister />}
            />
            <Route
              path="/create-account/influencer"
              element={<InfluencerRegister />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/choosen-influencers"
              element={<ChoosenInfluencers />}
            />
            <Route path="/profile-setting" element={<ProfileSetting />}>
              <Route path="info" element={<ProfileUser />} />
              <Route
                path="change-password"
                element={<ProfileChangePassword />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage />}>
              <Route path="" element={<LoginForm />} />
              <Route path="create-account" element={<LoginChoose />} />
            </Route>
            <Route
              path="/create-account/brand"
              element={<TradeMarkRegister />}
            />
            <Route
              path="/create-account/influencer"
              element={<InfluencerRegister />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>):(<LoadingWebsite />) }
    </Fragment>
  );
}

export default App;