import React, { Fragment } from "react";
import "./header.css";
import explore from '../../assets/images/explore.webp'
import man from '../../assets/images/header-man.webp'
import { motion } from 'framer-motion';
import influencer from '../../assets/images/logo.webp'
import azzrak from '../../assets/images/azzrak.png' ;
import athar from '../../assets/images/athar.png';
import mardod from '../../assets/images/mardod.png';
import waraqaa from '../../assets/images/waraqaa.png';
import darb from '../../assets/images/darb.jpg';
import smoue from '../../assets/images/smoue.webp';
import { BsArrowDownLeft } from 'react-icons/bs';

import influencerBack from '../../assets/images/headerBackground.webp';
import azzrakBack from '../../assets/images/azzrkBack.png'
import atharBack from '../../assets/images/atharBack.png'
import mardodBack from '../../assets/images/mardodBack.png'
import waraqaaBack from '../../assets/images/waraqaBack.png'
import darbBack from '../../assets/images/darbBack.png'
import smoueBack from '../../assets/images/smoueBack.png'

const Header = () => {
    const DOMAINS = {
        "AZZRK": "https://influencer.azzrk.com",
        "ATHAR" : "https://influencer.atherr.com",
        "MARDOD" : "https://influencer.marrdoud.com",
        "WARAQA" : "https://influencer.warrqa.com",
        "DARB" : "https://influencer.darbplatform.com",
        "SMOUE" : "https://influencer.sumoue.com",
    }
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
            <header className="header-parent" style={{backgroundImage: `url(${background})`}}>
                <div className="header container">
                    <div className="header-title">
                        <div className="header-title-parent">
                            <h1>قم</h1>
                            <h1>بإختيار مؤثر</h1>
                        </div>
                        <div className="header-images">
                            <motion.img src={explore} alt="" width='' height='' animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="explore"/>
                            <a href='#influuencers'>
                                <BsArrowDownLeft className="down-arrow" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <img src={man} alt="" width='' height='' className="man"/>
                    </div>
                </div>
            </header>
                <div className="parent-tape">
                    <motion.div className="header-tape" animate={{ x: "-100%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatType: "loop", repeatDelay: -2, offset: 1 }}>
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                        <img src={logo} alt="" width='' height='' className="logo-tape" />
                    </motion.div>
                </div>
        </Fragment>
    );
};

export default Header;