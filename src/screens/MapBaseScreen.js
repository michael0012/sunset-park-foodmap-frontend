import React from "react";
import ScrollToTop from '../components/ScrollToTop';
import ChangeLang from '../components/ChangeLang';
import HeadTranslator from '../components/HeadTranslator';

const MapBaseScreen = (props) => {

    return (
        <div style={{postition: 'relative'}}>
            <ScrollToTop/>
            {props.children}
            <ChangeLang/>
            <HeadTranslator/>
        </div>
    );
};

export default MapBaseScreen;