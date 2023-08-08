import React, { Fragment, useEffect, useState } from "react";
import "./Influencer-profile.css";
import authService from "../../services/auth-services";
import instgram from "../../assets/images/instgram.webp";
import youtube from "../../assets/images/youtube.webp";
import snapchat from "../../assets/images/snapchat.webp";
import tiktok from "../../assets/images/tiktok.webp";
import colorAdd from "../../assets/images/colorAdd.webp";
import colorTrash from "../../assets/images/colorTrash.webp";
import girl from "../../assets/images/girl.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingButton from "../../components/loadingButton/LoadingButton";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import influencer from '../../assets/images/logo.webp'
import azzrak from '../../assets/images/azzrak.png' ;
import athar from '../../assets/images/athar.png';
import mardod from '../../assets/images/mardod.png';
import waraqaa from '../../assets/images/waraqaa.png';
import darb from '../../assets/images/darb.jpg';
import smoue from '../../assets/images/smoue.webp';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';


const InfluencerProfile = (props) => {


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

    case DOMAINS.SMOUE : 
    logo = smoue;
    break;

    default :  
    logo = influencer;
}



  const [influencerInfo, setInfluencerInfo] = useState();
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [added, setAdded] = useState(false);

  const getInfluencerInfo = () => {
    authService.influencerInformation(props.id).then((response) => {
      setInfluencerInfo(response);
    });
  };

  useEffect(() => {
    getInfluencerInfo();
  }, [props.id, added]);

  const addInfluencers = (addedId) => {
    try {
      setLoadingLogin(true);
      authService.addInfluencer(addedId).then(
        (response) => {
          setConfirmAdd(false);
          setLoadingLogin(false);
          props.setAdded(true);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "تم الاضافة بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
          props.getAllInfluencers();
        },
        (error) => {
          setLoadingLogin(false);
          if (
            error.response.data.non_field_errors[0] ===
            "Maximum influencers reached"
          ) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "لقد وصلت للحد الأقصي من عدد المؤثرين",
              showConfirmButton: false,
              timer: 1500,
            });
            setConfirmAdd(false);
          }
        }
      );
    } catch (err) {
      console.log("errrrrr");
    }
  };

  const deleteInfluencers = (deletedId) => {
    try {
      setLoadingLogin(true);
      setConfirmAdd(false);
      props.setAdded(false);
      authService.deleteInfluencer(deletedId).then(
        (response) => {
          setLoadingLogin(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "تم الحذف بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
          props.getAllInfluencers();
        },
        (error) => {
          setLoadingLogin(false);
        }
      );
    } catch (err) {
      console.log("errrrrr");
    }
  };

  return (
    <Fragment>
      {influencerInfo ? (
        <div className="influencer-profile container">
          <div className="influencer-profile-des">
            <div className="titles">
              <h1 className="title-name">{influencerInfo.name}</h1>
              <h1 className="title-follower">
                {influencerInfo.instagram_followers >= 1000000
                  ? (influencerInfo.instagram_followers / 1000000).toFixed(0) +
                    ` ` +
                    "مليون"
                  : influencerInfo.instagram_followers >= 1000
                  ? (influencerInfo.instagram_followers / 1000).toFixed(0) +
                    ` ` +
                    "الاف"
                  : influencerInfo.instagram_followers}
              </h1>
              <h1 className="title-follow">متابع</h1>
            </div>
            <div className="social">
              {influencerInfo.youtube_url && (
                <Link to={influencerInfo.youtube_url} target="_blank">
                  <img src={youtube} alt="" width="" height="" />
                </Link>
              )}
              {influencerInfo.tiktok_url && (
                <Link to={influencerInfo.tiktok_url} target="_blank">
                  <img src={tiktok} alt="" width="" height="" />
                </Link>
              )}
              {influencerInfo.snapchat_url && (
                <Link to={influencerInfo.snapchat_url} target="_blank">
                  <img src={snapchat} alt="" width="" height="" />
                </Link>
              )}
              {influencerInfo.instagram_username && (
                <Link
                  to={`https://www.instagram.com/${influencerInfo.instagram_username}/`} target="_blank"
                >
                  <img src={instgram} alt="" width="" height="" />
                </Link>
              )}
            </div>
            <motion.div
              className="add-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setConfirmAdd(true)}
            >
              {props.added ? <BiTrash className="addIcon" /> : <AiOutlinePlus className="addIcon" /> } 
              
              <span> {props.added ? "حذف" : "اضافة"}</span>
            </motion.div>
            {confirmAdd && (
              <div className="popup-delete-influencer">
                <div className="popup-delete-influencer-content">
                  <div className="popup-delete-influencer-title">
                    <p>
                      {props.added
                        ? "هل تريد حذف المؤثر ؟"
                        : "هل تريد اضافة المؤثر ؟"}
                    </p>
                  </div>
                  <div className="popup-delete-influencer-btns">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (props.added) {
                          deleteInfluencers(influencerInfo.id);
                        } else {
                          addInfluencers(influencerInfo.id);
                        }
                      }}
                      className="confirm-delete"
                    >
                      {loadingLogin ? <LoadingButton /> : "نعم"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setConfirmAdd(false)}
                      className="confirm-delete-no"
                    >
                      لا
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="images">
            <div className="influencer-img">
              <img
                src={influencerInfo.photo ? influencerInfo.photo : girl}
                alt=""
                width=""
                height=""
                className="girl"
              />
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
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
        </motion.div>
    </div>
    </Fragment>
  );
};

export default InfluencerProfile;
