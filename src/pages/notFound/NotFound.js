import React, { Fragment } from "react";
import "./not-found.css";
import notFoundImg from '../../assets/images/notfound.webp'
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";




const NotFound = () => {
    return (
        <Fragment>
            <Navbar/>
            <div className="not-found">
                <img src={notFoundImg} className="not-found-img" alt="" width='' height='' />
                <div>
                    <Link to='/home'>
                        <button >الصفحة الرئيسية</button>
                    </Link>
                </div>
            </div>
            <Footer/>
        </Fragment>
    );
};

export default NotFound;