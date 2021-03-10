import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import i18n, { LANGUAGES } from '../i18n';
import { SELECTING } from '../reducers/language';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade'; 
import Paper from '@material-ui/core/Paper';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeLang: (lang) =>  dispatch({
            type: SELECTING,
            language: lang,
        }),
    };
}

// Using jss for elements style instead of css file
// More information: https://cssinjs.org/react-jss?v=v10.0.0-alpha.16

const useStyles = makeStyles(( theme ) => ({
    languageSelectionModal:{
        display: 'flex',
        position: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        left: '0px',
        top: '0px',
        minWidth: '100vw',
        minHeight: '100vh',
        overflowY: 'auto',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    languageSelectionModalContent:{
        backgroundColor: '#fefefe',
        margin: 'auto',
        padding: '20px',
        maxWidth: '500px',
        width: '90%',
    },
    fadeOut: {
        animation: '$fadeOut ease 5s infinite',
    },
    languageSelectionModalHolder: {
        padding: '40px 10px',
        paddingTop: '5px',
    },
    languageSelectionModalRow: {
        textAlign:'center',
        padding: '30px 5px',
        border: 'black solid 1px',
        borderTop: 'none',
        fontSize: '24px',
        fontWeight: '700',
        "&:hover": {
            backgroundColor: 'lightgray',
            cursor: 'pointer',
        },
        "&:focus": {
            backgroundColor: 'lightgray',
            cursor: 'pointer',
        },
        "&:active": {
            backgroundColor: 'lightgray',
            cursor: 'pointer',
        },
    },
    '@keyframes fadeOut': {
        '0%':{
          opacity:0,
        },
        '10%': {
          opacity:1,
        },
        '75%': {
          opacity:1,
        },
        '100%': {
          opacity:0,
        },
      },
    languageSelectionModalRowText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    languageText:{
        fontSize: 28,
        fontWeight: "bold",
    },
}));

const SelectLang = (props) => {

    let history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const selectLanguages = [
        "Select Language",
        "Selecciona Un Idioma",
        "选择语言"
    ];
    const [state, setState] = useState({
        titleIndex: 0,
        fadeIn: true,
    });
    const endOfLoop = () => {
        
        if(state.titleIndex >= LANGUAGES.length - 1){
            setState((state, props) =>{
                return {
                    ...state,
                    titleIndex: 0,
                };
            });
        }else{
            setState((state, props) => {
                return {
                    ...state,
                    titleIndex: state.titleIndex + 1,
                };
            });
        }
    };
    
    const selectingLang = (lang) => ( () => {
        props.changeLang(lang);
        i18n.changeLanguage(lang);
        let langPath = location.pathname.split('/');
        if (LANGUAGES.includes(langPath[1])){
            langPath[1] = lang;
        }else{
            langPath.shift();
            langPath.unshift(lang);
            langPath.unshift('');
        }
        const pathRoute = langPath.join('/');
        setState({...state, fadeIn: false});
        history.push({ pathname: pathRoute, search: location.search, hash: location.hash});
    });

    return(
        <Fade in={state.fadeIn}>
            <div className={classes.languageSelectionModal}>
                <Paper className={classes.languageSelectionModalContent} elevation={3}>
                    <h1 className={classes.fadeOut} onAnimationIteration={endOfLoop} style={{textAlign: "center", height: 60}}>
                        <Typography component="span" variant="h3" className={classes.languageText}>
                            {selectLanguages[state.titleIndex]}
                        </Typography>
                    </h1>
                    <div className={classes.languageSelectionModalHolder}>
                        <div style={{borderTop: 'black solid 1px'}} tabIndex="0" role="button" aria-pressed="false" className={classes.languageSelectionModalRow} onClick={selectingLang('en')}>
                            <Typography component="span" variant="h3" className={classes.languageSelectionModalRowText}>
                                English
                            </Typography>
                        </div>
                        <div className={classes.languageSelectionModalRow} tabIndex="0" role="button" aria-pressed="false" onClick={selectingLang('es')}>
                            <Typography component="span" variant="h3" className={classes.languageSelectionModalRowText}>
                                Español
                            </Typography>
                        </div>
                        <div className={classes.languageSelectionModalRow} tabIndex="0" role="button" aria-pressed="false" onClick={selectingLang('zh')}>
                            <Typography component="span" variant="h3" className={classes.languageSelectionModalRowText}>
                                中文
                            </Typography>
                        </div>
                    </div>
                </Paper>
            </div>
        </Fade>
    );
}

export default connect(null, mapDispatchToProps)(SelectLang);
