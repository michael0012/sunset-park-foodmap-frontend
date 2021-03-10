import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingScreen = (props) => {
    return (
        <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress style={{height: 80, width: 80}}/>
        </div>
    );
};

export default LoadingScreen;