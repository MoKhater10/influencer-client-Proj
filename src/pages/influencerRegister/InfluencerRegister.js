import React, { Fragment, useState } from "react";
import "./influencer-register.css";
import { NavLink } from "react-router-dom";
import logo from '../../assets/images/logo.webp'
import ProfileInfoRegister from "../../components/profileInfoRegister/ProfileInfoRegister";
import ContactInfoRegister from "../../components/contactInfoRegister/ContactInfoRegister";
import SocialMediaRegister from "../../components/socialMediaRegister/SocialMediaRegister";
import influencer from '../../assets/images/logo.webp'
import azzrak from '../../assets/images/azzrak.png' ;
import athar from '../../assets/images/athar.png';
import mardod from '../../assets/images/mardod.png';
import waraqaa from '../../assets/images/waraqaa.png';
import darb from '../../assets/images/darb.jpg';
import smoue from '../../assets/images/smoue.webp';

const InfluencerRegister = () => {
        const [toogleBtnProfile,setToogleBtnProfile] = useState(true);
        const [toogleBtnContact,setToogleBtnContact] = useState(false);
        const [toogleBtnSocial,setToogleBtnSocial] = useState(false);
        const [name,setName] = useState('');
        const [country, setCountry] = useState('');
        const [governorate, setGovernorate] = useState('');
        const [nationality, setNationality] = useState('');
        const [bio, setBio] = useState('');
        const [address, setAddress] = useState('');
        const [occupation, setOccupation] = useState('');
        const [marital_status, setMarital_status] = useState('أعزب');
        const [specialization, setSpecialization] = useState('');
        const [speaks, setSpeaks] = useState(true);
        const [face_appears, setFace_appears] = useState(true);
        const [wears_headscarf, setWears_headscarf] = useState(true);
        const [accountPublic, setAccountPublic] = useState(true);
        const [categories, setCategories] = useState([]);
        const [photo, setPhoto] = useState('');

        const [mobile , setMobile] = useState('');
        const [whatsapp , setWhatsapp] = useState('');
        const [email , setEmail] = useState('');

        const [youtube_url , setYoutube_url] = useState('');
        const [snapchat_url , setSnapchat_url] = useState('');
        const [tiktok_url , setTiktok_url] = useState('');
        const [instagram_username , setInstagram_username] = useState('');
        const [instagram_reaction_rate , setInstagram_reaction_rate] = useState('');
        const [youtube_followers , setYoutube_followers] = useState('');
        const [snapchat_followers , setSnapchat_followers] = useState('');
        const [tiktok_followers , setTiktok_followers] = useState('');
        const [instagram_followers , setInstagram_followers] = useState('');
        const [youtube_numbers , setYoutube_numbers] = useState(1000);
        const [snapchat_numbers , setSnapchat_numbers] = useState(1000);
        const [tiktok_numbers , setTiktok_numbers] = useState(1000);
        const [instagram_numbers , setInstagram_numbers] = useState(1000);
        const [titleClass1, setTitleClass1] = useState(false);
        const [titleClass2, setTitleClass2] = useState(false);
        const [circleClass1, setCircleClass1] = useState(false);
        const [circleClass2, setCircleClass2] = useState(false);
        const [borderCircle1, setBorderCircle1] = useState(true);
        const [borderCircle2, setBorderCircle2] = useState(false);
        const [borderCircle3, setBorderCircle3] = useState(false);
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
    
            case DOMAINS.SMOUE: 
            logo = smoue;
            break;
    
            default :  
            logo = influencer;
        }

    return (
        <Fragment>
            <div className="influencer-register container">
                <div className="register-logo">
                <NavLink to = {'/'}>
                    <img src={logo} alt="" width='' height='' className="logo"/>
                </NavLink>
                </div>
                <hr />
                <div className="register-title">
                    <h3>تسجيل كمؤثر</h3>
                    <h6>مرحبا بك لتكون شريكا في نجاحنا وجزء من موقعنا </h6>
                </div>
                <div className="circles">
                    <div className="lines">
                        <div className={borderCircle1 ? "border-circle" : "no-border-circle"}>
                            <span className="circle"></span>
                        </div>
                        <div>
                            <span></span>
                        </div>
                        <div className={borderCircle2 ? "border-circle" : "no-border-circle"} >
                            <span className={circleClass1? "circle" : 'noCircle'}></span>
                        </div>
                        <div>
                            <span></span>
                        </div>
                        <div className={borderCircle3 ? "border-circle" : "no-border-circle"}>
                            <span className={circleClass2? "circle" : 'noCircle'}></span>
                        </div>
                    </div>
                    <div className="titles">
                        <span className='title'>معلومات شخصية</span>
                        <span className={titleClass1? "title" : 'select'}>معلومات للتواصل</span>
                        <span className={titleClass2? "title" : 'select'}>وسائل تواصل اجتماعى</span>
                    </div>
                </div>
                <div>
                {toogleBtnProfile && <ProfileInfoRegister  setToogleBtnProfile={setToogleBtnProfile} setToogleBtnContact= {setToogleBtnContact} name={name} setName={setName}
                country={country} setCountry={setCountry} governorate={governorate} setGovernorate={setGovernorate} nationality={nationality} setNationality={setNationality}
                bio={bio} setBio={setBio} address={address} setAddress={setAddress} occupation={occupation} setOccupation={setOccupation}
                marital_status={marital_status} setMarital_status={setMarital_status} specialization={specialization} setSpecialization={setSpecialization}
                speaks={speaks} setSpeaks={setSpeaks} face_appears={face_appears} setFace_appears={setFace_appears} wears_headscarf={wears_headscarf} setWears_headscarf={setWears_headscarf}
                accountPublic={accountPublic} setAccountPublic={setAccountPublic} categories={categories} setCategories={setCategories} photo={photo} setPhoto={setPhoto}
                titleClass1={titleClass1} setTitleClass1 = {setTitleClass1} titleClass2={titleClass2} setTitleClass2 = {setTitleClass2} 
                circleClass1={circleClass1} setCircleClass1 = {setCircleClass1} circleClass2={circleClass2} setCircleClass2 = {setCircleClass2} 
                borderCircle1={borderCircle1} setBorderCircle1 = {setBorderCircle1} borderCircle2={borderCircle2} setBorderCircle2 = {setBorderCircle2} /> }


                {toogleBtnContact && <ContactInfoRegister setToogleBtnProfile={setToogleBtnProfile} setToogleBtnContact= {setToogleBtnContact}
                setToogleBtnSocial= {setToogleBtnSocial} mobile={mobile} setMobile={setMobile} whatsapp={whatsapp} setWhatsapp={setWhatsapp} email={email} setEmail={setEmail} 
                titleClass1={titleClass1} setTitleClass1 = {setTitleClass1} titleClass2={titleClass2} setTitleClass2 = {setTitleClass2} 
                circleClass1={circleClass1} setCircleClass1 = {setCircleClass1} circleClass2={circleClass2} setCircleClass2 = {setCircleClass2}  
                borderCircle1={borderCircle1} setBorderCircle1 = {setBorderCircle1} borderCircle2={borderCircle2} setBorderCircle2 = {setBorderCircle2}
                borderCircle3={borderCircle3} setBorderCircle3 = {setBorderCircle3}/> }


                {toogleBtnSocial && <SocialMediaRegister setToogleBtnContact= {setToogleBtnContact} setToogleBtnSocial= {setToogleBtnSocial} 
                name={name} country={country} governorate={governorate} nationality={nationality} bio={bio} address={address} occupation={occupation} 
                marital_status={marital_status} specialization={specialization}
                speaks={speaks} face_appears={face_appears} wears_headscarf={wears_headscarf} accountPublic={accountPublic} categories={categories} photo={photo}
                mobile={mobile} whatsapp={whatsapp} email={email} youtube_url={youtube_url} setYoutube_url={setYoutube_url} snapchat_url={snapchat_url} setSnapchat_url={setSnapchat_url}
                tiktok_url={tiktok_url} setTiktok_url={setTiktok_url} instagram_username={instagram_username} setInstagram_username={setInstagram_username}
                instagram_reaction_rate={instagram_reaction_rate} setInstagram_reaction_rate={setInstagram_reaction_rate} youtube_followers={youtube_followers} setYoutube_followers={setYoutube_followers}
                snapchat_followers={snapchat_followers} setSnapchat_followers={setSnapchat_followers} tiktok_followers={tiktok_followers} setTiktok_followers={setTiktok_followers}
                instagram_followers={instagram_followers} setInstagram_followers={setInstagram_followers} youtube_numbers={youtube_numbers} setYoutube_numbers={setYoutube_numbers}
                snapchat_numbers={snapchat_numbers} setSnapchat_numbers={setSnapchat_numbers} tiktok_numbers={tiktok_numbers} setTiktok_numbers={setTiktok_numbers}
                instagram_numbers={instagram_numbers} setInstagram_numbers={setInstagram_numbers}
                titleClass1={titleClass1} setTitleClass1 = {setTitleClass1} titleClass2={titleClass2} setTitleClass2 = {setTitleClass2} 
                circleClass1={circleClass1} setCircleClass1 = {setCircleClass1} circleClass2={circleClass2} setCircleClass2 = {setCircleClass2}
                borderCircle2={borderCircle2} setBorderCircle2 = {setBorderCircle2} borderCircle3={borderCircle3} setBorderCircle3 = {setBorderCircle3}/> } 
                </div>
            </div>
        </Fragment>
    );
};

export default InfluencerRegister;