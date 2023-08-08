import React, { Fragment, useState, useEffect } from "react";
import "./login-form.css";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth-services";
import LoadingButton from "../loadingButton/LoadingButton";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userToogelhint, setUserToogelhint] = useState(false);
    const [checkUser, setcheckUser] = useState("");
    const [focusUser, setfocusUser] = useState(false);
    const [passToogelhint, setpassToogelhint] = useState(false);
    const [checkpass, setcheckpass] = useState("");
    const [focuspass, setfocuspass] = useState(false);
    const [toogelaccount, settoggelaccount] = useState(false);
    const [toogelPass, settoggelPass] = useState(false);
    const [toogelActive, settoggelActive] = useState(false);
    const [loadingLogin,setLoadingLogin]=useState(false);

    const navigate = useNavigate();

    const handelpass = () => {
    setpassToogelhint(false);
    setfocuspass(true);
    };

    useEffect(() => {
    if (username) {
        setUserToogelhint(false);
    }
    }, [username]);
    useEffect(() => {
    setcheckpass(password.length >= 1 ? true : false);
    }, [password]);

    const handleLogin = async (e) => {
    e.preventDefault();

    if (!username) {
        setUserToogelhint(true);
    }
    if (!password) {
        setpassToogelhint(true);
        setfocuspass(false);
    }
    if (username && password) {
        try {
            setLoadingLogin(true)
            await authService.brandLogin(username, password).then(
            () => {
            navigate(`/home`);
            },
            (error) => {
                setLoadingLogin(false)
                console.log(error)
                if(error.response.data.detail === "User account does not exist."){
                    settoggelaccount(true)
                }
                if(error.response.data.detail === "Incorrect password."){
                    settoggelPass(true)
                }
                if(error.response.data.detail === "User account is not active, check your email to activate your account."){
                    settoggelActive(true)
                }
            }
        );
        } catch (err) {
        console.log(err);
        }
    }
    };
return (
    <Fragment>
        <div className="login-form-comp">
        <div className="login-form-title">
            <h3>مرحبا بك من جديد</h3>
            <h6>
            احصل علي مؤثر ليساعدك في التسويق لعلامتك التجاريه من خلال موقعنا
            </h6>
        </div>
        <div className="login-form">
            {toogelaccount && (
                <div className="alert alert-danger hintMsg" role="alert">
                اسم المستخدم غير موجود
                </div>
            )}
            {toogelPass && (
                <div className="alert alert-danger hintMsg" role="alert">
                كلمة المرور غير صحيحة
                </div>
            )}
            {toogelActive && (
                <div className="alert alert-danger hintMsg" role="alert">
                لم يتم تنشيط الحساب بعد, جارى التنشيط
                </div>
            )}
            <form onSubmit={handleLogin}>
            <div className="form-sec">
                <label>اسم المستخدم</label>
                <input
                type="text"
                placeholder="قم بإدخال اسم المستخدم الخاص بك"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                {focusUser && !checkUser && (
                <span className=" spanhint">مطلوب</span>
                )}
                {userToogelhint && <span className=" spanhint">مطلوب</span>}
            </div>
            <div className="form-sec">
                <label>كلمة المرور</label>
                <input
                type="password"
                placeholder="قم بإدخال كلمة المرور"
                value={password}
                onFocus={handelpass}
                onChange={(e) => setPassword(e.target.value)}
                />
                {focuspass && !checkpass && (
                <span className=" spanhint">مطلوب</span>
                )}
                {passToogelhint && <span className=" spanhint">مطلوب</span>}
            </div>
            <button type="submit"> 
            { loadingLogin ? <LoadingButton /> : ('تسجيل الدخول') }
            </button>
            </form>
            <div className="have-no-account">
            <span className="no-account"> ليس لديك حساب ؟</span>
            <Link to="/create-account">
                <span className="create-account"> انشاء حساب</span>
            </Link>
            </div>
        </div>
        </div>
    </Fragment>
    );
};

export default LoginForm;
