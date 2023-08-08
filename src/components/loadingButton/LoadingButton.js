import React from 'react';
import { RotatingLines } from  'react-loader-spinner';


const LoadingButton = () => {
    return (
    <div> 
        <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
        />
    </div>
    )
}

export default LoadingButton