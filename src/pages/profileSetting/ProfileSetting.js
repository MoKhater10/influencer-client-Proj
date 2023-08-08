import React, { Fragment, useState } from "react";
import "./profile-setting.css";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../../components/navbar/navbar";
import profileImg from "../../assets/images/profileImg.png";
import { NavLink } from "react-router-dom";
import { VscKey } from 'react-icons/vsc';
import { BiUser } from 'react-icons/bi';
import { SlLogout } from 'react-icons/sl';



const ProfileSetting = () => {
    const navigate = useNavigate();
    const logoutFunc = () => {
    localStorage.removeItem("brand");
    navigate("/");
    };
    const [confirmAdd, setConfirmAdd] = useState(false);
    return (
    <Fragment>
        <Navbar />
        <div className="profile-setting-parent container">
        <div className="profile-setting ">
            <aside>
            <div>
                <ul>
                <NavLink
                    to="/profile-setting/info"
                    className={({ isActive }) =>
                    isActive ? "title-setting" : "setting-toogle-title"
                    }
                >
                    <li>
                    <BiUser  className="user"/>
                    <span>الملف الشخصى</span>
                    </li>
                </NavLink>
                <NavLink
                    to="/profile-setting/change-password"
                    className={({ isActive }) =>
                    isActive ? "title-setting" : "setting-toogle-title"
                    }
                >
                    <li>
                    <VscKey className="key"/>
                    <span>تغيير كلمة المرور</span>
                    </li>
                </NavLink>
                <li onClick={() => setConfirmAdd(true)}>
                    <SlLogout className="logout"/>
                    <span className="logout-span">تسجيل الخروج</span>
                </li>
                </ul>
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
            </aside>
        </div>

        <div className="setting-outlet">
            <div className="setting-title">
            <h3>الملف الشخصى</h3>
            </div>
            <diV>
            <img
                src={profileImg}
                alt=""
                width=""
                height=""
                className="profileImg"
            />
            </diV>
        </div>
        <Outlet />
        </div>
    </Fragment>
    );
};

export default ProfileSetting;
