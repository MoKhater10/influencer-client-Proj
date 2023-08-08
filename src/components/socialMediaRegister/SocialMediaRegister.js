import React, { Fragment, useState } from "react";
import "./social-media-register.css";
import { useNavigate } from "react-router-dom";
import instgram from '../../assets/images/instgram.webp'
import youtube from '../../assets/images/youtube.webp'
import snapchat from '../../assets/images/snapchat.webp'
import tiktok from '../../assets/images/tiktok.webp'
import authService from "../../services/auth-services";
import Swal from "sweetalert2";
import LoadingButton from "../loadingButton/LoadingButton";



const SocialMediaRegister = (props) => {
    const navigate = useNavigate()
    const [loadingLogin,setLoadingLogin]=useState(false);

    const [youtube_url , setYoutube_url] = useState(props.youtube_url);
    const [snapchat_url , setSnapchat_url] = useState(props.snapchat_url);
    const [tiktok_url , setTiktok_url] = useState(props.tiktok_url);
    const [instagram_username , setInstagram_username] = useState(props.instagram_username);
    const [instagram_reaction_rate , setInstagram_reaction_rate] = useState(props.instagram_reaction_rate);
    const [youtube_followers , setYoutube_followers] = useState(props.youtube_followers);
    const [snapchat_followers , setSnapchat_followers] = useState(props.snapchat_followers);
    const [tiktok_followers , setTiktok_followers] = useState(props.tiktok_followers);
    const [instagram_followers , setInstagram_followers] = useState(props.instagram_followers);
    const [linkError , setlinkError] = useState(false);
    const [youtube_numbers , setYoutube_numbers] = useState(props.youtube_numbers);
    const [snapchat_numbers , setSnapchat_numbers] = useState(props.snapchat_numbers);
    const [tiktok_numbers , setTiktok_numbers] = useState(props.tiktok_numbers);
    const [instagram_numbers , setInstagram_numbers] = useState(props.instagram_numbers);



    const [youtube_urlToogelHint, setYoutube_urlToogelhint] = useState(false);
    const [focusyoutube_url, setFocusYoutube_url] = useState(false)
    const [snapchat_urlToogelHint, setSnapchat_urlToogelhint] = useState(false);
    const [focusSnapchat_url, setFocusSnapchat_url] = useState(false)
    const [tiktok_urlToogelHint, setTiktok_urlToogelhint] = useState(false);
    const [focusTiktok_url, setFocusTiktok_url] = useState(false)
    const [instagram_usernameToogelHint, setInstagram_usernameToogelhint] = useState(false);
    const [focusInstagram_username, setFocusInstagram_username] = useState(false)
    const [instagram_reaction_rateToogelHint, setInstagram_reaction_rateToogelhint] = useState(false);
    const [focusInstagram_reaction_rate, setFocusInstagram_reaction_rate] = useState(false)
    const [youtube_followersToogelHint, setYoutube_followersToogelhint] = useState(false);
    const [focusYoutube_followers, setFocusYoutube_followers] = useState(false);
    const [snapchat_followersToogelHint, setSnapchat_followersToogelhint] = useState(false);
    const [focusSnapchat_followers, setFocusSnapchat_followers] = useState(false);
    const [tiktok_followersToogelHint, setTiktok_followersToogelhint] = useState(false);
    const [focusTiktok_followers, setFocusTiktok_followers] = useState(false);
    const [instagram_followersToogelHint, setInstagram_followersToogelhint] = useState(false);
    const [focusInstagram_followers, setFocusInstagram_followers] = useState(false);


    const concatYoutubeFollowers = youtube_followers * youtube_numbers;
    const concatSnapChatFollowers = snapchat_followers * snapchat_numbers;
    const concatTiktokFollowers = tiktok_followers * tiktok_numbers;
    const concatInstagramFollowers = instagram_followers * instagram_numbers;

    //focus youtube url
    const handelYoutubeUrlFocus = () => {
        setFocusYoutube_url(true);
        setYoutube_urlToogelhint(false);
    };

    //focus snapchat url
    const handelSnapchatUrlFocus = () => {
        setFocusSnapchat_url(true);
        setSnapchat_urlToogelhint(false);
    };

    //focus tiktok url
    const handelTiktokUrlFocus = () => {
        setFocusTiktok_url(true);
        setTiktok_urlToogelhint(false);
    };

    //focus instgram username
    const handelInstagramUsernameFocus = () => {
        setFocusInstagram_username(true);
        setInstagram_usernameToogelhint(false);
    };
    //focus instgram rate 
    const handelInstagramReactionRateFocus = () => {
        setFocusInstagram_reaction_rate(true);
        setInstagram_reaction_rateToogelhint(false);
    };
    //focus youtube_followers  
    const handelYoutubeFollowersFocus = () => {
        setFocusYoutube_followers(true);
        setYoutube_followersToogelhint(false);
    };
    //focus snapchat_followers  
    const handelSnapchatFollowersFocus = () => {
        setFocusSnapchat_followers(true);
        setSnapchat_followersToogelhint(false);
    };
    //focus tiktok_followers  
    const handelTiktokFollowersFocus = () => {
        setFocusTiktok_followers(true);
        setTiktok_followersToogelhint(false);
    };
    //focus instagram_followers  
    const handelInstagramFollowersFocus = () => {
        setFocusInstagram_followers(true);
        setInstagram_followersToogelhint(false);
    };

    const handleLink = (element) =>{
        let val = element.target.value;
        return val.startsWith("https://") ? setlinkError(false) : setlinkError(true);
    }
    const handleNext = async () =>{

        //youtube_url 
        if (!youtube_url) {
            setYoutube_urlToogelhint(true);
            setFocusYoutube_url(false);
        }
        //snapchat-url 
        if (!snapchat_url) {
            setSnapchat_urlToogelhint(true);
            setFocusSnapchat_url(false);
        }
        //tiktok-url 
        if (!tiktok_url) {
            setTiktok_urlToogelhint(true);
            setFocusTiktok_url(false);
        }
        //instgram-username 
        if (!instagram_username) {
            setInstagram_usernameToogelhint(true);
            setFocusInstagram_username(false);
        }
        //instgram-rate 
        if (!instagram_reaction_rate) {
            setInstagram_reaction_rateToogelhint(true);
            setFocusInstagram_reaction_rate(false);
        }
        //youtube followers
        if (!youtube_followers) {
            setYoutube_followersToogelhint(true);
            setFocusYoutube_followers(false);
        }
        //snapchat followers
        if (!snapchat_followers) {
            setSnapchat_followersToogelhint(true);
            setFocusSnapchat_followers(false);
        }
        //tiktok followers
        if (!tiktok_followers) {
            setTiktok_followersToogelhint(true);
            setFocusSnapchat_followers(false);
        }
        //instgram followers
        if (!instagram_followers) {
            setInstagram_followersToogelhint(true);
            setFocusInstagram_followers(false);
        }
        const formData = new FormData();
        formData.append("name", props.name);
        formData.append("bio", props.bio);
        formData.append("photo", props.photo);
        formData.append("nationality", props.nationality);
        formData.append("country", props.country);
        formData.append("governorate", props.governorate);
        formData.append("address", props.address);
        formData.append("email", props.email);
        formData.append("mobile", props.mobile);
        formData.append("whatsapp", props.whatsapp);
        formData.append("instagram_username", instagram_username);
        formData.append("instagram_followers", concatInstagramFollowers);
        formData.append("instagram_reaction_rate", instagram_reaction_rate);
        formData.append("snapchat_url", snapchat_url);
        formData.append("tiktok_url", tiktok_url);
        formData.append("tiktok_followers", concatTiktokFollowers);
        formData.append("youtube_url", youtube_url);
        formData.append("youtube_followers", concatYoutubeFollowers);
        formData.append("occupation", props.occupation);
        formData.append("specialization", props.specialization);
        formData.append("marital_status", props.marital_status);
        formData.append("face_appears", props.face_appears);
        formData.append("speaks", props.speaks);
        formData.append("public", props.accountPublic);
        formData.append("wears_headscarf", props.wears_headscarf);
        props.categories.forEach(element => {
            formData.append("categories", element);
        });
        if (formData)
        try {
            setLoadingLogin(true)
            authService.influencerSignup(formData
            ).then(
            (response) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `تم التسجيل بنجاح`,
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/create-account')
            },
            (error) => {
                setLoadingLogin(false)
                console.log(error)
            }
            );
            } catch (err) {
            console.log(err);
            }
    }

    const handleBefore = () => {
        props.setToogleBtnContact(true) ;
        props.setToogleBtnSocial(false) ;
        props.setYoutube_url(youtube_url);
        props.setSnapchat_url(snapchat_url);
        props.setTiktok_url(tiktok_url);
        props.setInstagram_username(instagram_username);
        props.setInstagram_reaction_rate(instagram_reaction_rate);
        props.setYoutube_followers(youtube_followers);
        props.setSnapchat_followers(snapchat_followers);
        props.setTiktok_followers(tiktok_followers);
        props.setInstagram_followers(instagram_followers);
        props.setYoutube_numbers(youtube_numbers);
        props.setSnapchat_numbers(snapchat_numbers);
        props.setTiktok_numbers(tiktok_numbers);
        props.setInstagram_followers(instagram_followers);
        props.setTitleClass2(false)  
        props.setBorderCircle3(false);
        props.setBorderCircle2(true) ;
    }

    return (
        <Fragment>
                <div className="social-media-register">
                    <form>
                        <div className="social-media-form">
                            <div className="form-sec">
                                <div className="account">
                                    <img src={youtube} alt="" width='' height=''/>
                                    <label> رابط القناة</label>
                                </div>
                                <input type="text" placeholder="ادخل رابط اليوتيوب" className="input" value={youtube_url} 
                                onFocus={handelYoutubeUrlFocus} onChange = {(e)=>{setYoutube_url(e.target.value)}} onBlur = {(e)=>handleLink(e)} />
                                {linkError && (
                                <span className=" spanhint">يجب أن يكون لينك</span>
                                )}
                                {youtube_urlToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusyoutube_url && !youtube_url && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>المتابعون</label>
                                <div className="followers">
                                    <input type="number" placeholder="ادخل عدد المتابعين " className="input-follower" value={youtube_followers} 
                                    onFocus={handelYoutubeFollowersFocus} onChange = {(e)=>{setYoutube_followers(e.target.value)}} />
                                    <select defaultValue={youtube_numbers} onChange = {(e)=>{if(e.target.value === 'k'){setYoutube_numbers(1000)} else {setYoutube_numbers(1000000)}}}>
                                        <option>K</option>
                                        <option>M</option>
                                    </select>
                                </div>
                                {youtube_followersToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusYoutube_followers && !youtube_followers && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <div className="account">
                                    <img src={snapchat} alt="" width='' height=''/>
                                    <label>اسم المستخدم</label>
                                </div>
                                <input type="text" placeholder="ادخل رابط للاسناب شات   " className="input" value={snapchat_url} 
                                onFocus={handelSnapchatUrlFocus} onChange = {(e)=>{setSnapchat_url(e.target.value)}} onBlur = {(e)=>handleLink(e)} />
                                {linkError && (
                                <span className=" spanhint">يجب أن يكون لينك</span>
                                )}
                                {snapchat_urlToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusSnapchat_url && !snapchat_url && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>المتابعون</label>
                                <div className="followers">
                                    <input type="number" placeholder="ادخل عدد المتابعين   "  className="input-follower" value={snapchat_followers} 
                                    onFocus={handelSnapchatFollowersFocus} onChange = {(e)=>{setSnapchat_followers(e.target.value)}} />
                                    <select defaultValue={snapchat_numbers} onChange = {(e)=>{if(e.target.value === 'k'){setSnapchat_numbers(1000)} else {setSnapchat_numbers(1000000)}}}>
                                        <option>K</option>
                                        <option>M</option>
                                    </select>
                                </div>
                                {snapchat_followersToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusSnapchat_followers && !snapchat_followers && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <div className="account">
                                    <img src={tiktok} alt="" width='' height=''/>
                                    <label>رابط الحساب</label>
                                </div>
                                <input type="text" placeholder="ادخل رابط حساب التيك توك " className="input" value={tiktok_url} 
                                onFocus={handelTiktokUrlFocus} onChange = {(e)=>{setTiktok_url(e.target.value)}} onBlur = {(e)=>handleLink(e)} />
                                {linkError && (
                                <span className=" spanhint">يجب أن يكون لينك</span>
                                )}
                                {tiktok_urlToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusTiktok_url && !tiktok_url && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>المتابعون</label>
                                <div className="followers">
                                    <input type="number" placeholder="ادخل عدد المتابعين"  className="input-follower" value={tiktok_followers} 
                                    onFocus={handelTiktokFollowersFocus} onChange = {(e)=>{setTiktok_followers(e.target.value)}} />
                                    <select defaultValue={tiktok_numbers} onChange = {(e)=>{if(e.target.value === 'k'){setTiktok_numbers(1000)} else {setTiktok_numbers(1000000)}}}>
                                        <option>K</option>
                                        <option>M</option>
                                    </select>
                                </div>
                                {tiktok_followersToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusTiktok_followers && !tiktok_followers && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <div className="account">
                                    <img src={instgram} alt="" width='' height=''/>
                                    <label>اسم المستخدم</label>
                                </div>
                                <input type="text" placeholder="ادخل رابط الانستجرام   " className="input" value={instagram_username} 
                                onFocus={handelInstagramUsernameFocus} onChange = {(e)=>{setInstagram_username(e.target.value)}} />
                                {instagram_usernameToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusInstagram_username && !instagram_username && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>المتابعون</label>
                                <div className="followers">
                                    <input type="number" placeholder="ادخل عدد المتابعين   "  className="input-follower" value={instagram_followers} 
                                    onFocus={handelInstagramFollowersFocus} onChange = {(e)=>{setInstagram_followers(e.target.value)}} />
                                    <select defaultValue={instagram_numbers} onChange = {(e)=>{if(e.target.value === 'k'){setInstagram_numbers(1000)} else {setInstagram_numbers(1000000)}}}>
                                        <option>K</option>
                                        <option>M</option>
                                    </select>
                                </div>
                                {instagram_followersToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusInstagram_followers && !instagram_followers && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <div className="account">
                                    <img src={instgram} alt="" width='' height=''/>
                                    <label>نسبة التفاعل</label>
                                </div>
                                <input type="number" placeholder="ادخل نسبة التفاعل   "  className="input" value={instagram_reaction_rate} 
                                onFocus={handelInstagramReactionRateFocus} onChange = {(e)=>{setInstagram_reaction_rate(e.target.value)}} />
                                {instagram_reaction_rateToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusInstagram_reaction_rate && !instagram_reaction_rate && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                        </div>
                        <div className="register-btns">
                            <div type='submit' className="btn-next" onClick={handleNext}>
                                { loadingLogin ? <LoadingButton /> : ('تسجيل ') }
                            </div>
                            <div type='submit' className="btn-back" onClick={handleBefore}>السابق</div>
                        </div>  
                    </form>
                </div>
        </Fragment>
    );
};

export default SocialMediaRegister;