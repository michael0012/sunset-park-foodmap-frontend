import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import BaseScreen from './BaseScreen';

const Welcome = (props) => {
    const { t } = useTranslation();

    return (
        <BaseScreen>
            <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    <h1>{t('Welcome to React')}</h1>
                    <div style={{margin: '12px auto'}}>
                        <Link to={t('/otherthing')}>{t('Next Page')}</Link>
                    </div>
                </div>
            </div>
        </BaseScreen>
    );
};

export default Welcome;