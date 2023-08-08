import React, { Fragment, useState, useEffect } from "react";
import "./profile-change-password.css";
import authService from "../../services/auth-services";
import validator from "validator";
import Swal from "sweetalert2";
import LoadingButton from "../loadingButton/LoadingButton";


const ProfileChangePassword = () => {

    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [confirmNewPassword, setconfirmNewPassword] = useState('');
    const [passToggelhint, setpassToggelhint] = useState(false);
    const [checklengthPassword, setchecklengthPass] = useState("");
    const [checkuppercase, setcheckUppercase] = useState("");
    const [checkLowercase, setcheckLowercase] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [checkDigit, setcheckDigit] = useState("");
    const [checkSpecialChar, setcheckSpecialChar] = useState("");
    const [isFocusedConfirm, setIsFocusedConfirm] = useState(false);
    const [hintoldPass,sethintoldPass]=useState(false);
    const [checkpass,setcheckpass]=useState(false)
    const [focusoldPAss,setfocusoldPass]=useState(false);
    const [loadingSave,setLoadingSave]=useState(false);
    const [toogelaccount, settoggelaccount] = useState(false);



    const isValidPassword = (newPassword) => {
        const options = {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
        };
        return validator.isStrongPassword(newPassword, options);
    }

    useEffect(() => {
        setchecklengthPass(newPassword.length >= 8 ? true : false);
        setcheckUppercase(/[A-Z]+/.test(newPassword));
        setcheckLowercase(/[a-z]+/.test(newPassword));
        setcheckDigit(/[0-9]+/.test(newPassword));
        setcheckSpecialChar(/[^A-Za-z0-9]+/.test(newPassword));
    }, [newPassword]);

    useEffect(() => {

    }, [oldPassword, newPassword, confirmNewPassword]);

    useEffect(() => {
        if (newPassword === confirmNewPassword) {
            setIsFocusedConfirm(false);
        }
        else {
            setIsFocusedConfirm(true);
        }
    }, [confirmNewPassword])

    useEffect(()=>{
        setcheckpass(oldPassword.length >0 ?false:true)
    },[oldPassword])
    
    const handeloldPass =()=>{
        sethintoldPass(false);
        setfocusoldPass(true);
    }

    const handleFocus = () => {
        setIsFocused(true);
        setpassToggelhint(false);
    };

    const handleFocusConfirm = () => {
        setIsFocusedConfirm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

            //password
        if (!newPassword) {
            setpassToggelhint(true);
            setIsFocused(false);
            }
        if(!oldPassword){
            sethintoldPass(true)
            setfocusoldPass(false)
        }
            if ( isValidPassword(newPassword) && newPassword === confirmNewPassword && oldPassword.length > 1 )
        {
        try {
            setLoadingSave(true)
            await authService.userChangePassword(oldPassword,newPassword).then(
                (response) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "تم تغيير كلمة المرور بنجاح",
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoadingSave(false)
                setconfirmNewPassword('');
                setnewPassword('');
                setoldPassword('')
                setfocusoldPass(false)
                setIsFocused(false);
                setpassToggelhint(false);
                },
                (error) => {
                    console.log(error)
                setLoadingSave(false)
                if(error.response.data.old_password[0] === "Old password is not correct"){
                    settoggelaccount(true)
                }
                }
            )}
            catch (err) {
                console.log("errrrrr");
            }
        }
    }

    return (
        <Fragment>
        
            <div className="profile-change-password">

                <div className="profile-user-form">
            
                    <form onSubmit={handleSubmit}>
                    {toogelaccount && (
                        <div className="alert alert-danger hintMsg" role="alert">
                        كلمة المرور الحالية غير صحيحة
                        </div>
                    )}
                        <div className="form-sec">
                            <label>كلمة المرور الحالية</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setoldPassword(e.target.value)}  
                                onFocus={handeloldPass} 
                            />
                        {hintoldPass && <span className="spanhint">مطلوب</span>}
                        {focusoldPAss && checkpass && <span className="spanhint">مطلوب</span>}
                        </div>
                        <div className="form-sec">
                            <label>كلمة المرور الجديدة</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setnewPassword(e.target.value)}
                                onFocus={handleFocus}
                            />
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
                                </div>
                        </div>
                        <div className="form-sec confirm-Pass">
                            <label> تأكيد كلمة المرور</label>
                            <input
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setconfirmNewPassword(e.target.value)} 
                                onFocus={handleFocusConfirm}                
                            />
                            {isFocusedConfirm && (
                            <span className=" spanhint">
                                كلمة المرور غير متطابقة
                            </span>
                            )}
                        </div>
                        <button type='submit'>
                        { loadingSave ? <LoadingButton /> : ('حفظ التغييرات ') }
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default ProfileChangePassword;