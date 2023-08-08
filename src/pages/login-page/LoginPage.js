import React, { Fragment } from "react";
import "./login-page.css";
import man from '../../assets/images/man.webp'
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import influencer from '../../assets/images/logo.webp'
import azzrak from '../../assets/images/azzrak.png' ;
import athar from '../../assets/images/athar.png';
import mardod from '../../assets/images/mardod.png';
import waraqaa from '../../assets/images/waraqaa.png';
import darb from '../../assets/images/darb.jpg';
import smoue from '../../assets/images/smoue.webp';
import azzrakBack from '../../assets/images/azzrkBack.png'
import atharBack from '../../assets/images/atharBack.png'
import mardodBack from '../../assets/images/mardodBack.png'
import waraqaaBack from '../../assets/images/waraqaBack.png'
import darbBack from '../../assets/images/darbBack.png'
import smoueBack from '../../assets/images/smoueBack.png'
import influencerBack from '../../assets/images/headerBackground.webp';



const DOMAINS = {
    "AZZRK": "https://influencer.azzrk.com",
    "ATHAR" : "https://influencer.atherr.com",
    "MARDOD" : "https://influencer.marrdoud.com",
    "WARAQA" : "https://influencer.warrqa.com",
    "DARB" : "https://influencer.darbplatform.com",
    "SMOUE" : "https://influencer.sumoue.com",
}

const LoginPage = () => {
    var subdomain = window.location.origin;
    var logo 
    var background
    switch (subdomain){
        case DOMAINS.AZZRK: 
        logo = azzrak;
        background = azzrakBack;
        break;

        case DOMAINS.ATHAR : 
        logo = athar;
        background = atharBack;
        break;

        case DOMAINS.MARDOD: 
        logo = mardod;
        background = mardodBack;
        break;

        case DOMAINS.WARAQA : 
        logo = waraqaa;
        background = waraqaaBack;

        break;

        case DOMAINS.DARB: 
        logo = darb;
        background = darbBack;

        break;

        case DOMAINS.SMOUE : 
        logo = smoue;
        background = smoueBack;
        break;

        default :  
        logo = influencer;
        background = influencerBack;
    }

    return (
        <Fragment>
            <div className="login-page">
                <div className="outlet"> 
                    <Outlet/>
                </div>
                <div className="login-poster" style={{backgroundImage: `url(${background})`}}>
                    <div className="login-logo">
                        <NavLink to = {'/'}>
                            <img src={logo} alt="" width='' height='' className="logo" />
                        </NavLink>
                    </div>
                    <div>
                        <img src={man} alt="" width='' height='' className="man"/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default LoginPage;