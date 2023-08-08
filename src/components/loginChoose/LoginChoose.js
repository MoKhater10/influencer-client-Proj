import React, { Fragment } from "react";
import "./login-choose.css";
import { Link } from "react-router-dom";


const LoginChoose = () => {
    return (
        <Fragment>
            <div className="login-choose-comp">
                <div className="login-choose-title">
                    <h3>سجل بإسم</h3>
                    <h6>اختر ما اذا كنت تريد التسجيل كعلانة تجارية أو اذا كنت مؤثرا تريد ان تكون جزء من نجاحنا</h6>
                </div>
                <div className="login-choice">
                    <Link to='/create-account/influencer'>
                        <div className="influencer">
                            مؤثر
                        </div>
                    </Link>
                    <Link to='/create-account/brand'>
                        <div className="trade-mark">
                        علامة تجارية
                        </div>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default LoginChoose;