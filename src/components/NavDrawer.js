import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from '../api';
import i18n from '../i18n';
import { LOGOUT } from '../reducers/loggedIn';
import { getCookie } from '../utils';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';


const useStyles = makeStyles((theme) => ({
    list: {
      width: 320,
    },
    fullList: {
      width: 'auto',
    },
    toolbar: theme.mixins.toolbar,
}));

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut: () => dispatch({
      type: LOGOUT,
    })
  };
}

let NavDrawer = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const goAndClose = (routeString) => ((e) => {
      history.push(t(routeString));
      props.toggleDrawer(e);
    });
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const logOut = async () =>{
      try{
        const csrftoken = getCookie("csrftoken") || "";
        await axios.post('/auth/logout', {}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
        props.logOut();
        history.push(t('/'));
      }catch(error){

      }
    };

    if(props.loggedIn){

      return (
        <React.Fragment>
          <SwipeableDrawer
            anchor="left"
            open={props.openDrawer}
            onClose={props.toggleDrawer}
            onOpen={props.toggleDrawer}
            disableSwipeToOpen={true}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
          >
            <div className={classes.toolbar} />
            <Divider/>
            <div className={classes.list} role="presentation">
              <List>
                <ListItem button onClick={goAndClose('/foodmap')}>
                  <ListItemIcon><RoomOutlinedIcon /></ListItemIcon>
                  <ListItemText primary={"Map"} />
                </ListItem>
                {
                  props.user.admin &&
                  (
                    <ListItem button onClick={() => {history.push(t('/control-panel'))}}>
                      <ListItemIcon><SupervisorAccountOutlinedIcon /></ListItemIcon>
                      <ListItemText primary={t("Admin Panel")} />
                    </ListItem>
                  )
                }
                <ListItem button onClick={logOut}>
                  <ListItemIcon><AccountCircleOutlinedIcon /></ListItemIcon>
                  <ListItemText primary={t("Log Out")} />
                </ListItem>
              </List>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      );
    } else{
      return (
        <React.Fragment>
          <SwipeableDrawer
            anchor="left"
            open={props.openDrawer}
            onClose={props.toggleDrawer}
            onOpen={props.toggleDrawer}
            disableSwipeToOpen={true}
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS}
          >
            <div className={classes.toolbar} />
            <Divider/>
            <div className={classes.list} role="presentation">
              <List>
                <ListItem button onClick={goAndClose('/foodmap') }>
                  <ListItemIcon><RoomOutlinedIcon /></ListItemIcon>
                  <ListItemText primary={"Map"} />
                </ListItem>
                <ListItem button onClick={goAndClose('/login')}>
                  <ListItemIcon><AccountCircleOutlinedIcon /></ListItemIcon>
                  <ListItemText primary={t("Login")} />
                </ListItem>
              </List>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      );
    }
};

const mapStateToProps = state => ({ loggedIn: state.loggedIn.loggedIn, user: state.loggedIn.user });

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);