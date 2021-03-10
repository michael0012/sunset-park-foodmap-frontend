import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from '../api';
import i18n from '../i18n';
import { LOGOUT } from '../reducers/loggedIn';
import { getCookie } from '../utils';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
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
          <Drawer
            anchor="left"
            open={props.openDrawer}
            onClose={props.toggleDrawer}
          >
            <div className={classes.toolbar} />
            <Divider/>
            <div className={classes.list} role="presentation">
              <List>
                <ListItem button onClick={goAndClose('/foodmap')}>
                  <ListItemIcon><RoomOutlinedIcon /></ListItemIcon>
                  <ListItemText primary={"Map"} />
                </ListItem>
                <ListItem button onClick={logOut}>
                  <ListItemIcon><AccountCircleOutlinedIcon /></ListItemIcon>
                  <ListItemText primary={t("Log Out")} />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </React.Fragment>
      );
    } else{
      return (
        <React.Fragment>
          <Drawer
            anchor="left"
            open={props.openDrawer}
            onClose={props.toggleDrawer}
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
          </Drawer>
        </React.Fragment>
      );
    }
};

const mapStateToProps = state => ({ loggedIn: state.loggedIn.loggedIn });

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);