import React, { Fragment, useState, useEffect } from "react";
import "./choosen-influencers.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import authService from "../../services/auth-services";
import girl from "../../assets/images/girl.png";
import Swal from "sweetalert2";
import NoInfluencer from "../../components/noInfluencer/NoInfluencer";
import LoadingButton from "../../components/loadingButton/LoadingButton";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const ChoosenInfluencers = () => {
  const [choosenInfluencers, setChoosenInfluencers] = useState();
  const [choosenInfluencersUrl, setChoosenInfluencersUrl] = useState(
    "api/brand-influencers/?accepted=True"
  );

  const [response, setResponse] = useState("");
  const [deletedId, setDeletedId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [nextOpacity, setNextOpacity] = useState(false);
  const [prevOpacity, setPrevOpacity] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingPrev, setLoadingPrev] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  const getAllInfluencers = () => {
    authService.choosenInfluencers(choosenInfluencersUrl).then((response) => {
      setLoadingNext(false);
      setLoadingPrev(false);
      setChoosenInfluencers(response.results);
      setResponse(response);
    });
  };
  useEffect(() => {
    getAllInfluencers();
    if (response.previous === null && response.next === null) {
      setNextOpacity(true);
      setPrevOpacity(true);
    }
    if (response.next) {
      setNextOpacity(false);
    }
    if (response.previous) {
      setPrevOpacity(false);
    }
    if (response.previous === null) {
      setPrevOpacity(true);
    }
  }, [choosenInfluencersUrl, response.previous, response.next]);

  const deleteInfluencers = (deletedId) => {
    try {
      setLoadingLogin(true);
      authService.deleteInfluencer(deletedId).then(
        (response) => {
          setConfirmDelete(false);
          getAllInfluencers();
          setLoadingLogin(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "تم الحذف بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          setLoadingLogin(false);
          console.log(error);
        }
      );
    } catch (err) {
      console.log("errrrrr");
    }
  };

  const setConfirmDeleteFunc = (index) => {
    setConfirmDelete(true);
    setDeletedId(index);
  };

  return (
    <Fragment>
      <Navbar />
      {choosenInfluencers ? (
        <div>
          {choosenInfluencers.length > 0 ? (
            <div className="choosen-influencers container">
              {choosenInfluencers.map((choosen, index) => (
                <div className="influencer-box" key={index}>
                  <div className="influeuncer-image">
                    <img
                      src={
                        choosenInfluencers[index].influencer.photo
                          ? choosenInfluencers[index].influencer.photo
                          : girl
                      }
                      alt=""
                      width=""
                      height=""
                      className="influencer-img"
                    />
                  </div>
                  <div className="influencer-info">
                    <div className="influencer-info-followers">
                      <h2>{choosenInfluencers[index].influencer.name}</h2>
                      <h2>
                        {
                          choosenInfluencers[index].influencer
                            .instagram_followers
                        }{" "}
                        متابع
                      </h2>
                    </div>
                    <div>
                      <div
                        className="add"
                        onClick={() =>
                          setConfirmDeleteFunc(
                            choosenInfluencers[index].influencer.id
                          )
                        }
                      >
                        <FaTrash />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {confirmDelete && (
                <div className="popup-delete-influencer">
                  <div className="popup-delete-influencer-content">
                    <div className="popup-delete-influencer-title">
                      <p>هل تريد حذف المؤثر</p>
                    </div>
                    <div className="popup-delete-influencer-btns">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteInfluencers(deletedId)}
                        className="confirm-delete"
                      >
                        {loadingLogin ? <LoadingButton /> : "نعم"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setConfirmDelete(false)}
                        className="confirm-delete-no"
                      >
                        لا
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NoInfluencer />
          )}
          {!nextOpacity && (
            <div className="register-btns">
              <motion.div
                className={nextOpacity ? "btn-next btn-opacity" : "btn-next"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (response.next) {
                    setChoosenInfluencersUrl(response.next.slice(31));
                    setLoadingNext(true);
                  } else {
                    setChoosenInfluencersUrl(
                      "api/brand-influencers/?accepted=True"
                    );
                  }
                }}
              >
                {loadingNext ? <LoadingButton /> : "التالى"}
              </motion.div>
              <motion.div
                className={prevOpacity ? "btn-back btn-opacity" : "btn-back"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (response.previous) {
                    setLoadingPrev(true);
                    setChoosenInfluencersUrl(response.previous.slice(31));
                  }
                }}
              >
                {loadingPrev ? <LoadingButton /> : "السابق"}
              </motion.div>
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
      
      <Footer />
    </Fragment>
  );
};

export default ChoosenInfluencers;
