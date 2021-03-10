import React from "react";
import NavBar from '../components/NavBar';
import ScrollToTop from '../components/ScrollToTop';
import ChangeLang from '../components/ChangeLang';
import HeadTranslator from '../components/HeadTranslator';

const BaseScreen = (props) => {

    return (
        <div style={{postition: 'relative'}}>
            <ScrollToTop/>
            <NavBar/>
            {props.children}
            <ChangeLang/>
            <HeadTranslator/>
        </div>
    );
};

export default BaseScreen;