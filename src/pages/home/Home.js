import React, { Fragment } from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import Influencers from "../../components/infulencers/Influencers";
import { useState } from "react";



const Home = () => {

    const [id,setId] =useState('');

    return (
        <Fragment>
            <Navbar id={id} setId={setId} />
            <div className="home">
                <Influencers id={id} setId={setId}/>
            </div>
            <Footer/>
        </Fragment>
    );
};

export default Home;