import React, { Fragment, useEffect, useState, useRef } from "react";
import "./profile-user.css";
import { getApiUrl } from "../../helpers";
import authHeader from "../../services/auth-header";
import axios from "axios";
import Swal from "sweetalert2";
import authService from "../../services/auth-services";
import LoadingButton from "../loadingButton/LoadingButton";


const ProfileUser = () => {
    const userInfoUrl = getApiUrl("api/brands/me/");
    const [userInfo, setUserInfo] = useState('');
    const refName = useRef();
    const refUserName = useRef();
    const refEmail = useRef();
    const [loadingSave,setLoadingSave]=useState(false);
    const [brandNameChanged,setBrandNameChanged]=useState(false);
    const [userNameChanged,setUserNameChanged]=useState(false);
    const [emailChanged,setEmailChanged]=useState(false);
    const [toogelaccount, settoggelaccount] = useState(false);
    const [nameTooglehint, setnameToogelhint] = useState(false);
    const [userNameTooglehint, setUserNameToogelhint] = useState(false);
    const [emailToogelHint, setEmailToogelhint] = useState(false);



    const getUserData = () => {
        axios.get(userInfoUrl, { headers: authHeader() }).then((response) => {
            setUserInfo(response.data);
        });
    }

    useEffect(() => {
        getUserData();
    }, [])



    const handleInputChange = () => {
        setUserInfo({
            ...userInfo,
            brand_name: refName.current.value,
            username: refUserName.current.value,
            email: refEmail.current.value
        });
        if(userInfo.brand_name !== refName.current.value){
            setBrandNameChanged(true)
        }
        if(userInfo.username !== refUserName.current.value){
            setUserNameChanged(true)
        }
        if(userInfo.email !== refEmail.current.value){
            setEmailChanged(true)
        }
    };
    
    const handleSubmit = (e) => {
        if(!refName.current.value){
            setnameToogelhint(true);
        }
        if(!refUserName.current.value){
            setUserNameToogelhint(true);
        }
        if(!refEmail.current.value){
            setEmailToogelhint(true);
        }
        e.preventDefault();
        if((userInfo.brand_name || userInfo.email || userInfo.username)
        && (brandNameChanged || userNameChanged || emailChanged))
        try {
            setLoadingSave(true);
            authService.updateUserInfo(userInfo.brand_name, userInfo.username, userInfo.email,).then(
            (response) => {
                Swal.fire({
                position: "center",
                icon: "success",
                title: 'تم حفظ التغييرات',
                showConfirmButton: false,
                timer: 1500,
                });
                setLoadingSave(false);
                settoggelaccount(false)
                setnameToogelhint(false);
                setUserNameToogelhint(false);
                setEmailToogelhint(false);
            },
            (error) => {
            setLoadingSave(false);
            if(error.response.data.username[0] === "A user with that username already exists."){
                settoggelaccount(true)
            }
                console.log(error);
            }
            );
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Fragment>
            <div className="profile-user">
                    <div className="profile-user-form">
                        <form onSubmit={handleSubmit}>
                        {toogelaccount && (
                            <div className="alert alert-danger hintMsg" role="alert">
                            اسم المستخدم موجود بالفعل
                            </div>
                        )}
                            <div className="form-sec">
                                <label>الاسم</label>
                                <input
                                type="text"
                                ref={refName}
                                defaultValue={userInfo.brand_name}
                                onChange={handleInputChange}
                                />
                                {nameTooglehint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>اسم المستخدم</label>
                                <input
                                type="text"
                                ref={refUserName}
                                defaultValue={userInfo.username}
                                onChange={handleInputChange}
                                />
                                {userNameTooglehint && (
                                <span className=" spanhint">مطلوب</span>
                                )}
                            </div>
                            <div className="form-sec">
                                <label>البريد الإلكترونى</label>
                                <input
                                type="email"
                                ref={refEmail}
                                defaultValue={userInfo.email}
                                onChange={handleInputChange}
                                />
                                {emailToogelHint && (
                                <span className=" spanhint">مطلوب</span>
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

export default ProfileUser;