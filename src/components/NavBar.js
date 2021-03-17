import React, { useState } from 'react';
import axios from '../api';
import i18n from '../i18n';
import { LOGOUT } from '../reducers/loggedIn';
import { getCookie } from '../utils';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavDrawer from './NavDrawer';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      zIndex: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    titleSpan: {
        padding: "20px 12px",
        '&:hover':{
            'cursor': "pointer",
        }
    }
}));

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut: () => dispatch({
      type: LOGOUT,
    })
  };
}

let NavBar = (props) => {
    const classes = useStyles();
    const [ state, setState] = useState({openDrawer: false}); 
    const { t } = useTranslation();
    const history = useHistory();
    const logOut = async () =>{
      try{
        const csrftoken = getCookie("csrftoken") || "";
        await axios.post('/auth/logout', {}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
        props.logOut();
        history.push(t('/'));
      }catch(error){

      }
    };
    const toggleDrawer = (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState(state => ({ ...state, openDrawer: !state.openDrawer}));
    };

    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="fixed" style={{zIndex: 2}}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label={t("menu")} onClick={()=>{setState({...state, openDrawer:true})}}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <span onClick={()=>{history.push(t('/'))}} className={classes.titleSpan}>{ t("Sunset Park Food Map") }</span>
              </Typography>
              {
                (
                  !props.loggedIn &&
                  <Button color="inherit" onClick={()=>{history.push(t('/login'))}}>{ t("Login") }</Button>
                )  ||
                (
                  <Button color="inherit" onClick={logOut}>{ t("Log Out") }</Button>
                )
              }
              </Toolbar>
          </AppBar>
        </div>
        <NavDrawer toggleDrawer={toggleDrawer} openDrawer={state.openDrawer}/>
      </React.Fragment>
    );
};

const mapStateToProps = state => ({ loggedIn: state.loggedIn.loggedIn });

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);