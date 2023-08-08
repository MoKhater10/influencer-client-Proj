import React, { Fragment, useState, useEffect } from "react";
import "./influencers.css";
import girl from '../../assets/images/girl.png'
import { getApiUrl } from "../../helpers";
import authService from "../../services/auth-services";
import Swal from "sweetalert2";
import NoInfluencer from "../noInfluencer/NoInfluencer";
import { motion } from "framer-motion";
import LoadingButton from '../loadingButton/LoadingButton'
import InfluencerProfile from "../../pages/influencerProfile/InfluencerProfile";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import {AiOutlinePlus} from 'react-icons/ai';
import Header from "../header/Header";

const  Influencers = (props) => {
    const [influencers,setInfluencers] = useState();
    const [response,setResponse] = useState('');
    const [influencersUrl, setInfluencersUrl] = useState(getApiUrl('api/brand-influencers/?accepted=False'));
    const [addedId, setAddedId] = useState('');
    const [confirmAdd, setConfirmAdd] = useState(false);
    const [nextOpacity, setNextOpacity] = useState(false);
    const [prevOpacity, setPrevOpacity] = useState(false);
    const [loadingLogin,setLoadingLogin]=useState(false);
    const [loadingPrev,setLoadingPrev]=useState(false);
    const [loadingNext,setLoadingNext]=useState(false);


    const getAllInfluencers = () =>{
        authService.allInfluencers(influencersUrl).then((response) => {
          setLoadingNext(false)
          setLoadingPrev(false)
            setResponse(response)
            setInfluencers(response.results);
        });
    }
    useEffect(() => {
        getAllInfluencers()
        if(response.previous === null && response.next === null) {
          setNextOpacity(true);
          setPrevOpacity(true);
        }
        if(response.next) {
          setNextOpacity(false);
        }
        if(response.previous) {
          setPrevOpacity(false);
        }
        if(response.previous === null) {
          setPrevOpacity(true);
        }
    }, [influencersUrl, response.previous, response.next]);

    const setConfirmAddFunc = (index) => {
        setConfirmAdd(true);
        setAddedId(index);
    };
    
    const addInfluencers = (addedId) => {
      try {
        setLoadingLogin(true)
      authService.addInfluencer(addedId).then(
        (response) => {
          setConfirmAdd(false);
          getAllInfluencers();
          setLoadingLogin(false)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تم الاضافة بنجاح',
            showConfirmButton: false,
            timer: 1500
          })
          setLoadingNext(false)
        },
        (error) => {
          setLoadingLogin(false)
          if (error.response.data.non_field_errors[0] === "Maximum influencers reached") {
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'لقد وصلت للحد الأقصي من عدد المؤثرين',
            showConfirmButton: false,
            timer: 1500
            })
            setConfirmAdd(false);
          }
        }
      );
    } catch (err) {
      
    }
    }
    const [id,setId] =useState(props.id);
    const [added, setAdded] = useState(false);


    return (
        <Fragment>
            {props.id ? ( 
              <InfluencerProfile id={props.id} added = {added} setAdded={setAdded} getAllInfluencers={getAllInfluencers}/>) : (<Header/>)
            }
            {influencers  ? (
            <div className="influencers container" id="influuencers">
                <div className="influencers-title">
                    <h1>{id ? 'مؤثرين اخرين':'المؤثرين'}</h1>
                </div>
                <div>
                {influencers.length > 0 ?(
                <div className="all-influencers">
                {influencers 
                    .filter((influencer, index) => influencer.influencer.id !== props.id) 
                    .map((influencer, index) => (
                      <div className="influencer-box" key={index}>
                        <div className="influeuncer-image">
                          <img
                            src={influencer.influencer.photo ? influencer.influencer.photo : girl}
                            alt=""
                            width=""
                            height=""
                            className="influencer-img"
                            onClick={() => {
                              window.scroll(0,0)
                              setId(influencer.influencer.id);
                              props.setId(influencer.influencer.id);
                              setAdded(false);}
                            }
                          />
                        </div>
                        <div className="influencer-info">
                          <div className="influencer-info-followers">
                            <h2>{influencer.influencer.name}</h2>
                            <h2>                
                              {influencer.influencer.instagram_followers >= 1000000
                                ? (influencer.influencer.instagram_followers / 1000000).toFixed(0) +
                                  ` ` +
                                  "مليون"
                                : influencer.influencer.instagram_followers >= 1000
                                ? (influencer.influencer.instagram_followers / 1000).toFixed(0) +
                                  ` ` +
                                  "الاف"
                                : influencer.influencer.instagram_followers} متابع
                            </h2>
                          </div>
                          <div className="add" onClick={() => setConfirmAddFunc(influencer.influencer.id)} >
                            <AiOutlinePlus className='plus'/>
                          </div>
                        </div>
                      </div>
                    ))}
                    {confirmAdd && (
                    <div className="popup-delete-influencer">
                      <div className="popup-delete-influencer-content">
                        <div className="popup-delete-influencer-title">
                          <p>هل تريد اضافة المؤثر ؟</p>
                        </div>
                        <div className="popup-delete-influencer-btns">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={() => addInfluencers(addedId)}
                            className="confirm-delete"
                          >
                          { loadingLogin ? <LoadingButton/> : ('نعم') }
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={() => setConfirmAdd(false)}
                            className="confirm-delete-no"
                            >
                            لا
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  )}
                </div> ):(<NoInfluencer/>)}
                </div>
                {!nextOpacity &&
                <div className="register-btns">
                    <motion.div className={nextOpacity ? "btn-next btn-opacity" :'btn-next'} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {
                        if (response.next) {
                            setInfluencersUrl(getApiUrl((response.next.slice(31))));
                            setLoadingNext(true)
                        } else {
                          setInfluencersUrl(getApiUrl('api/brand-influencers/?accepted=False'));
                        }
                    }}>{ loadingNext ? <LoadingButton/> : ('التالى') }</motion.div>
                    <motion.div className={prevOpacity ? "btn-back btn-opacity" :'btn-back'} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {
                        if (response.previous) {
                          setLoadingPrev(true)
                          setInfluencersUrl(getApiUrl((response.previous.slice(31))));
                        }
                        }} 
                    >{ loadingPrev ? <LoadingButton/> : ('السابق') }</motion.div>
                </div>}
            </div>):(<LoadingSpinner/>)}
        </Fragment>
    );
};

export default Influencers;