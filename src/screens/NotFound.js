import React from "react";
import { useTranslation } from 'react-i18next';
import BaseScreen from './BaseScreen';

const NotFound = (props) => {
    const { t } = useTranslation();
    
    return (
        <BaseScreen>
            <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{textAlign: 'center'}}>{t('404-error')}</h1>
            </div>
        </BaseScreen>
    );
};

export default NotFound;