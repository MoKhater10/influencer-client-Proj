import React, { Fragment } from "react";
import "./no-influencer.css";
import noInfluencer from "../../assets/images/noInfluencer.webp";


const NoInfluencer = () => {
    return (
    <Fragment>
        <div className="no-influencer">
        <div className="noInfluencerImg">
            <img src={noInfluencer} alt="" width="" height="" />
        </div>
        </div>
    </Fragment>
    );
};

export default NoInfluencer;
