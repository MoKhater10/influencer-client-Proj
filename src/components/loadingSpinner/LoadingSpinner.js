import React from 'react'
import { HashLoader } from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
const LoadingSpinner = () => {
    return (
        <div className="preloadContainer">
            <div className="preload">
                <HashLoader color="#C5F60D" cssOverride={override} size={100}/>
            </div>
        </div>)
}

export default LoadingSpinner;