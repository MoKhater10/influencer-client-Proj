import { HashLoader } from 'react-spinners';
import React from 'react';

const LoadingWebsite = () => {
  return (
    <div>
        <div >
            <div className="loading-website">
            <HashLoader color="var(--primaryColor)" size={100} />
            </div>
        </div>
    </div>
  );
};

export default LoadingWebsite;