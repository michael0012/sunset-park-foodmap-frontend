import React from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

let HeadTranslator = (props) => {
    const { t } = useTranslation();
    return (
        <Helmet>
            <html lang={props.language} amp />
            <meta name={t("description")} content={t("This is a FoodMap app for the Sunset Park, Brooklyn Area!")}/>
            <meta http-equiv="content-language" content={props.language} />
            <title>{t('Sunset Park Food Map')}</title>
        </Helmet>
    );
};

const mapStateToProps = state => ({ language: state.language.language })

export default connect(mapStateToProps, null)(HeadTranslator);