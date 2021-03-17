import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import GpsFixedOutlinedIcon from '@material-ui/icons/GpsFixedOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import NavDrawer from './NavDrawer';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 800,
        width: "90%",
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));


const MapScreenBar = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [state, setState] = useState({
      searchValue: "",
      loading: false,
      submitted: false,
      openNavDrawer: false,
    });
    const toggleNavDrawer = (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, openNavDrawer: false});
    };
    const loadingSearch = (onSubmit) => (async (e) => {
      e.preventDefault();
      setState({...state, loading: true});
      await onSubmit(state.searchValue);
      setState({...state, loading: false, submitted: true});
    });
    const clearSearch = (onSubmit) => (async () => {
      setState({...state, submitted: false, searchValue: ""});
      await onSubmit("");
    });
    const onChange = (e) => {
      setState({
        ...state,
        searchValue: e.target.value,
      });
    }; 
    
    return (
      <React.Fragment>
        <Paper component="form" className={classes.root} onSubmit={loadingSearch(props.onSubmit)}>
          <IconButton className={classes.iconButton} aria-label={t("menu")} onClick={ ()=>{setState({...state, openNavDrawer: true})} } >
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder={ t("Search Food Map") }
            inputProps={{ 'aria-label': t('search map') }}
            name="search"
            value={state.searchValue}
            onChange={onChange}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          {
            (!state.submitted &&(
                (!state.loading && (
                <IconButton color="primary" className={classes.iconButton} aria-label={t("location")} onClick={() => {props.clickLocateIcon("start")}}>
                  <GpsFixedOutlinedIcon /> 
                </IconButton>
                ) ) ||
                (
                  <CircularProgress style={{width: "22px", height: "22px"}}/>
                )
            ) )|| (
              <IconButton color="primary" className={classes.iconButton} aria-label={t("clear search")} onClick={clearSearch(props.onSubmit)}>
                <CloseOutlinedIcon/>
              </IconButton>

            )
          }
        </Paper>
        <NavDrawer toggleDrawer={toggleNavDrawer} openDrawer={state.openNavDrawer}/>
      </React.Fragment>
      );   
};

export default MapScreenBar;