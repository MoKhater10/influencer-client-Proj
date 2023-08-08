import React, { Fragment, useState, useEffect } from "react";
import "./navbar.css";
import profile from "../../assets/images/profile.webp";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import authHeader from "../../services/auth-header";
import axios from "axios";
import { getApiUrl } from "../../helpers";
import { BiLogOut } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineChevronDown } from 'react-icons/hi';
import influencer from '../../assets/images/logo.webp'
import azzrak from '../../assets/images/azzrak.png' ;
import athar from '../../assets/images/athar.png';
import mardod from '../../assets/images/mardod.png';
import waraqaa from '../../assets/images/waraqaa.png';
import darb from '../../assets/images/darb.jpg';
import smoue from '../../assets/images/smoue.webp';


const DOMAINS = {
    "AZZRK": "https://influencer.azzrk.com",
    "ATHAR" : "https://influencer.atherr.com",
    "MARDOD" : "https://influencer.marrdoud.com",
    "WARAQA" : "https://influencer.warrqa.com",
    "DARB" : "https://influencer.darbplatform.com",
    "SMOUE" : "https://influencer.sumoue.com",
}

const Navbar = (props) => {

    var subdomain = window.location.origin;
    var logo 
    switch (subdomain){
        case DOMAINS.AZZRK: 
        logo = azzrak;
        break;

        case DOMAINS.ATHAR : 
        logo = athar;
        break;

        case DOMAINS.MARDOD: 
        logo = mardod;
        break;

        case DOMAINS.WARAQA : 
        logo = waraqaa;
        break;

        case DOMAINS.DARB: 
        logo = darb;
        break;

        case DOMAINS.SMOUE: 
        logo = smoue;
        break;

        default :  
        logo = influencer;
    }
    
    const [toogleIcon, setToogleIcon] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [dropDownToogle, setDropDownToogle] = useState(false);
    const userInfoUrl = getApiUrl("api/brands/me/");
    const [userInfo, setUserInfo] = useState("");
    const [confirmAdd, setConfirmAdd] = useState(false);
    const [id,setId] =useState('')

    const navigate = useNavigate();

    const handleClick = () => {
    setToogleIcon(!toogleIcon);
    setDropDown(!dropDown);
    setDropDownToogle(false);
    };
    const logoutFunc = () => {
    localStorage.removeItem("brand");
    navigate("/");
    };

    const getUserData = () => {
    axios.get(userInfoUrl, { headers: authHeader() }).then((response) => {
        setUserInfo(response.data);
    });
    };

    const userToken = localStorage.getItem('brand');
    useEffect(() => {
        if (userToken) { 
            getUserData();
        } 
    }, []);

    return (
    <Fragment>
        <div className="navbar-parent">
        <div className="navbar ">
            <div className="navbar-icon">
            { toogleIcon ? <GrClose className="toogle-icon" onClick={handleClick}/> : <AiOutlineMenu onClick={handleClick}  className="toogle-icon" /> }
            </div>
            <div className="navbar-logo">
            <NavLink to="/home">
                <img
                src={logo}
                alt=""
                width=""
                height=""
                className="navbar-logo-img"
                onClick={()=>{setId(props.setId)}}
                />
            </NavLink>
            </div>
            <div
            className="navbar-profile"
            onClick={() => {
                setDropDownToogle(!dropDownToogle);
                setDropDown(false);
                setToogleIcon(false);
            }}
            >
            <HiOutlineChevronDown className="arrow" />
            <img src={profile} alt="" width="" height="" className="profile" />
            {dropDownToogle && (
                <div className="drop-setting">
                <NavLink to="/profile-setting/info">
                    <div className="user-info">
                    <img src={profile} alt="" width="" height="" />
                    <h6>{userInfo.brand_name}</h6>
                    </div>
                </NavLink>
                <hr className="container" />
                <div onClick={() => setConfirmAdd(true)} className="logout-div">
                    <BiLogOut className="logout"/>
                    <span>تسجيل الخروج</span>
                </div>
                </div>
            )}
            {confirmAdd && (
                <div className="popup-delete-influencer">
                <div className="popup-delete-influencer-content">
                    <div className="popup-delete-influencer-title">
                    <p>هل تريد تسجيل الخروج ؟</p>
                    </div>
                    <div className="popup-delete-influencer-btns">
                    <button onClick={logoutFunc} className="confirm-delete">
                        نعم
                    </button>
                    <button
                        onClick={() => setConfirmAdd(false)}
                        className="confirm-delete-no"
                    >
                        لا
                    </button>
                    </div>
                </div>
                </div>
            )}
            </div>
            
            </div>
            <div className="div-hr ">
            <hr className="hr" />
            </div>
        
            
            <div className={dropDown ? "dropdown dropdown-open" : "dropdown dropdown-close"}>
                <GrClose className="close-icon" onClick={handleClick}/>
                <div className="titles">        
                <NavLink
                to="/home"
                className={({ isActive }) =>
                    isActive ? "title-setting" : "toogle-title"
                }
                >
                <h1>الصفحة الرئيسية</h1>
                </NavLink>
                <NavLink
                to="/choosen-influencers"
                className={({ isActive }) =>
                    isActive ? "title-setting" : "toogle-title"
                }
                >
                <h1>المؤثرين المختارون</h1>
                </NavLink>
                <NavLink
                to="/contact"
                className={({ isActive }) =>
                    isActive ? "title-setting" : "toogle-title"
                }
                >
                <h1>تواصل معنا</h1>
                </NavLink>
                </div>
            </div>
            
        </div>
        
    </Fragment>
    );
};

export default Navbar;
