import React, { Fragment, useEffect, useState , useMemo } from "react";
import "./trade-mark-register.css";
import PhoneInput from 'react-phone-number-input';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import authService from "../../services/auth-services";
import validator from "validator";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import LoadingButton from "../../components/loadingButton/LoadingButton";
import { NavLink } from "react-router-dom";
import influencer from '../../assets/images/logo.webp'
import azzrak from '../../assets/images/azzrak.png' ;
import athar from '../../assets/images/athar.png';
import mardod from '../../assets/images/mardod.png';
import waraqaa from '../../assets/images/waraqaa.png';
import darb from '../../assets/images/darb.jpg';
import smoue from '../../assets/images/smoue.webp';

const TradeMarkRegister = () => {

    const [mobile , setMobile] = useState();
    const [country, setCountry] = useState('')
    const [username, setUsername] = useState('')
    const [brand_name, setBrand_name] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    
    const [userToogelHint, setuserToogelhint] = useState(false);
    const [focusUser, setfocusUser] = useState(false);
    const [brandToogelHint, setBrandToogelhint] = useState(false);
    const [focusBrand, setFocusBrand] = useState(false);
    const [mobileToogelHint, setMobileToogelhint] = useState(false);
    const [focusMobile, setFocusMobile] = useState(false);
    const [countryToogelHint, setCountryToogelhint] = useState(false);
    const [focusCountry, setFocusCountry] = useState(false);
    const [emailToogelHint, setEmailToogelhint] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);
    const [passToggelhint, setpassToggelhint] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [checklengthPassword, setchecklengthPass] = useState("");
    const [checkuppercase, setcheckUppercase] = useState("");
    const [checkLowercase, setcheckLowercase] = useState("");
    const [checkDigit, setcheckDigit] = useState("");
    const [checkSpecialChar, setcheckSpecialChar] = useState("");
    const [savedPassoword, setsavedPassword] = useState(false);
    const [toogelaccount, settoggelaccount] = useState(false);
    const [isFocusedConfirm, setIsFocusedConfirm] = useState(false);
    const options = useMemo(() => countryList().getData(), [])
    const navigate =useNavigate();
    const [isValid, setIsValid] = useState(true);
    const [loadingLogin,setLoadingLogin]=useState(false);



    useEffect(()=>{
    },[username, password, brand_name, country, mobile, email])

    const isValidPassword = (password) => {
    const options = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
    };
        return validator.isStrongPassword(password, options);
    };

    useEffect(() => {
    setchecklengthPass(password.length >= 8 ? true : false);
    setcheckUppercase(/[A-Z]+/.test(password));
    setcheckLowercase(/[a-z]+/.test(password));
    setcheckDigit(/[0-9]+/.test(password));
    setcheckSpecialChar(/[^A-Za-z0-9]+/.test(password));
    }, [password]);

    useEffect(() => {
        if (password === confirmPassword) {
            setIsFocusedConfirm(false);
        }
        else {
            setIsFocusedConfirm(true);
        }
    },[confirmPassword])

    function handleInputChange(event) {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
        setIsValid(validateEmail(inputEmail));
    }

    function handleBlur() {
        setIsValid(validateEmail(email));
    }

    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

      //focus username
    const handeluserFocus = () => {
        setfocusUser(true);
        setuserToogelhint(false);
    };
    //focus brand-name
    const handelBrandFocus = () => {
        setFocusBrand(true);
        setBrandToogelhint(false);
    };
    //focus mobile
    const handelMobileFocus = () => {
        setFocusMobile(true);
        setMobileToogelhint(false);
        const icon = document.querySelector('.PhoneInputInput');
        icon.classList.add('className', 'toogle-dir');
    };
    //focus country
    const handelCountryFocus = () => {
        setFocusCountry(true);
        setCountryToogelhint(false);
    };
    //focus email
    const handelEmailFocus = () => {
        setFocusEmail(true);
        setEmailToogelhint(false);
    };
    //focus pass
    const handlePassFocus = () => {
        setIsFocused(true);
        setpassToggelhint(false);
        setsavedPassword(false);
    };
    //focus confirm password
    const handleFocusConfirm = () => {
        setIsFocusedConfirm(true);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        //usename
        if (!username) {
            setuserToogelhint(true);
            setfocusUser(false);
        }
        //brand_name
        if (!brand_name) {
            setBrandToogelhint(true);
            setFocusBrand(false);
        }
        //mobile
        if (!mobile) {
            setMobileToogelhint(true);
            setFocusMobile(false);
        }
        //country
        if (!country) {
            setCountryToogelhint(true);
            setFocusCountry(false);
        }
        //email
        if (!email) {
            setEmailToogelhint(true);
            setFocusEmail(false);
        }
        //password
        if (!password) {
            setpassToggelhint(true);
            setIsFocused(false);
        }
        if (password.length > 0 && !validator.isStrongPassword(password)) {
        setsavedPassword(true);
        }
        if (
            isValidPassword(password) &&  password === confirmPassword &&
            username && brand_name && country && mobile && email
        )
        try {
            setLoadingLogin(true)
        await authService.brandSignup(
            username,
            password,
            brand_name,
            country,
            mobile,
            email
        ).then(
        (response) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `تم التسجيل بنجاح`,
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/')
            settoggelaccount(false);
        },
        (error) => {
            setLoadingLogin(false)
            console.log(error)
            if(error.response.data.username[0] === "A user with that username already exists."){
                settoggelaccount(true)
            }
        }
        );
        } catch (err) {
        console.log(err);
        }
    }
    
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
            <div className="trade-mark-register container">
                <div className="register-logo">
                    <NavLink to = {'/'}>
                    <img src={logo} alt="" width='' height='' className="logo"/>
                    </NavLink>
                </div>
                <hr />
                <div className="register-title">
                    <h3>تسجيل كعلامة تجارية</h3>
                    <h6>مرحبا بك في رحلة نجاحنا، احصل علي مؤثر ليساعدك في التسويق لعلامتك التجاريه من خلال موقعنا</h6>
                </div>
                <div >
                    <form onSubmit={handleSubmit}>
                    {toogelaccount && (
                    <div className="alert alert-danger hintMsg" role="alert">
                        هذا الحساب موجود بالفعل
                    </div>
                    )}
                        <div className="trade-mark-form">
                            <div className="form-sec">
                                <label>اسم المستخدم</label>
                                <input type="text" placeholder="قم بإدخال اسم المستخدم" value={username} onFocus={handeluserFocus} onChange = {(e)=>{setUsername(e.target.value)}}
                                className="input" />
                                {userToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusUser && !username && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>اسم العلامة التجارية</label>
                                <input type="text" placeholder="ادخل اسم العلامة التجارية" value={brand_name} onFocus={handelBrandFocus} onChange = {(e)=>{setBrand_name(e.target.value)}}
                                className="input" />
                                {brandToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusBrand && !brand_name && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>رقم الهاتف</label>
                                <PhoneInput 
                                    international
                                    placeholder="قم بإدخال رقم الهاتف"
                                    value={mobile}
                                    onFocus={handelMobileFocus}
                                    onChange={setMobile}
                                    className = 'form-phone-input'
                                />
                                {mobileToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusMobile && !mobile && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>الدولة</label>
                                <Select options={options} defaultValue={country} onFocus={handelCountryFocus} onChange={(value)=>setCountry(value.label)}  placeholder='الدولة'  />
                                {countryToogelHint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                                {focusCountry && !country && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>كلمة المرور</label>
                                <input type="password" placeholder="ادخل كلمة المرور" value={password} onFocus={handlePassFocus} onChange={(e)=>{setPassword(e.target.value)}}
                                className="input" />
                                <div className="password-hints">
                                {passToggelhint && (
                                    <span className=" spanhint">مطلوب</span>
                                )}
                                {isFocused && !checklengthPassword && (
                                    <span className=" spanhint">
                                    يجب ألا تقل كلمة المرور عن 8 أحرف,
                                    </span>
                                )}
                                {isFocused && !checkuppercase && (
                                    <span className=" spanhint">
                                    حرف كبير,
                                    </span>
                                )}
                                {isFocused && !checkLowercase && (
                                    <span className="spanhint">
                                    &nbsp;&nbsp;حرف صغير,
                                    </span>
                                )}
                                
                                {isFocused && !checkDigit && (
                                    <span className=" spanhint">
                                    رقم, 
                                    </span>
                                )}
                                {isFocused && !checkSpecialChar && (
                                    <span className=" spanhint">
                                    رمز
                                    </span>
                                )}
                                {savedPassoword && (
                                    <span className=" spanhint">غير صحيح</span>
                                )}
                                </div>
                            </div>
                            <div className="form-sec">
                                <label>تأكيد كلمة المرور</label>
                                <input type="password" placeholder="أعد كتابة كلمة المرور" value={confirmPassword} onFocus={handleFocusConfirm} onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                className="input" />
                                {isFocusedConfirm && confirmPassword && (
                                <span className=" spanhint">
                                    كلمة المرور غير متطابقة
                                </span>
                                )}
                            </div>
                            <div className="form-sec">
                            <label>البريد الإلكترونى</label>
                            <input type="email" placeholder="ادخل البريد الإلكترونى للعلامة التجارية" value={email} onFocus={handelEmailFocus} 
                            onChange={handleInputChange} onBlur={handleBlur} className="input" />
                            {focusEmail && !isValid && (
                                <span className=" spanhint">يجب أن يكون بريد إلكترونى</span>
                                )}
                            {emailToogelHint && (
                            <span className=" spanhint">مطلوب</span>
                            )}
                        </div>
                            <br />
                        </div>
                        <div>
                            <button type="submit" className="button-register">
                                { loadingLogin ? <LoadingButton /> : ('تسجيل ') }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default TradeMarkRegister;