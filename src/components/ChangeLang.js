import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import { CHANGE_LANG } from '../reducers/language';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeLang: () =>  dispatch({
            type: CHANGE_LANG,
        }),
    };
}

let ChangeLang = (props) => {
    const { t } = useTranslation();
    //if(!props.selected)
    //    return null;
    return (
        <Fade in={props.selected}>
            <div style={{right: '10px', bottom: '10px', position: 'fixed', zIndex: '1', }}>
                <Tooltip title={t('Language')}>
                    <IconButton style={{display: 'block'}} onClick={props.changeLang}>
                        <LanguageOutlinedIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </div>
        </Fade>
    );
}

const mapStateToProps = state => ({ selected: state.language.selected })

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLang); 