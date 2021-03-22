import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import moment from 'moment';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckIcon from '@material-ui/icons/Check';
import i18n from '../i18n';

const useStyles = makeStyles((theme) => ({
    list: {
      width: 320,
      overflowX: "hidden",
    },
    fullList: {
      width: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    profileImage: {
        width: 320,
        minHeight: 239,
        maxHeight: 320,
    },
    name: {
        fontSize: "24px",
        fontWeight: "bold", 
    },
    descriptionCSS:{
        whiteSpace: "pre-wrap",
    },
    subText: {
        fontSize: "14px",
        fontWeight: "normal",
        padding: "0 5px",
        paddingTop: "2px",

    },
}));

const getFoodLocationFromId = (foodLocations, id) => {
    return foodLocations.filter(item => item.id === id)[0];
};

const mapBoroughCodeToName = (boroughCode) => {
    const keyBorough = {'BK': "Brooklyn", 'M': "New York", 'Q': "Queens", 'BX': "Bronx", 'SI': "Staten Island"};
    return keyBorough[boroughCode];
};

const FoodLocationDrawer= (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const location = getFoodLocationFromId(props.foodLocations, props.foodLocationId);
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/320px-SunsetPark.jpg";
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentESTMoment =  moment(Date.now()).utcOffset('-0500');
    const currentDay = currentESTMoment.day();
    const currentDayString = daysOfWeek[currentDay];
    const openDateTime = location[`${currentDayString}_open`];
    const closeDateTime = location[`${currentDayString}_close`];
    const checkOpen = () => {
        if(openDateTime === null){
            return false;
        }else if( closeDateTime === null){
            return true;
        }
        const currentTime = currentESTMoment.format('HH:mm');
        return ( (openDateTime <= currentTime) && ((closeDateTime === '23:59') || (currentTime <= closeDateTime)));
        

    };
    const formatPhoneNumber = (phoneNumber) => {
        return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6)}`
    };
    const formatDescription = (foodLocation) => {
        if(foodLocation.translations.length){
            const filteredFoodLocations = foodLocation.translations.filter(item => ((item.language === i18n.language) && (item.model_field === "description")));
            if(filteredFoodLocations.length){
                return filteredFoodLocations[0].text;
            }
        }
        return foodLocation.description;
    };
    const isOpen = checkOpen();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    return (
        <React.Fragment>
            <SwipeableDrawer
            anchor="left"
            open={props.openDrawer}
            onClose={props.toggleDrawer}
            disableSwipeToOpen={true}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            BackdropProps={{ invisible: true }}
            onOpen={()=>{}}
            >
            <img className={classes.profileImage} src={location.profile_image || defaultImage } alt={location.name} onError={(e)=>{e.target.onerror = null; e.target.src=defaultImage}} />
            <Divider/>
            <div className={classes.list} role="presentation">
                <List>
                    <ListItem >
                        <Typography variant="h4" className={classes.name} gutterBottom style={{margin: "2px 0px"}}>{location.name}</Typography>
                    </ListItem>
                    <ListItem >
                        <Typography variant="body1" className={classes.descriptionCSS} gutterBottom>{formatDescription(location)}</Typography>
                    </ListItem>
                    <ListItem >
                        <LocationOnOutlinedIcon color="primary" style={{marginRight: "8px", marginLeft: "2px"}}/>
                        <Typography variant="subtitle1" className={classes.subText}>{`${location.address}, ${mapBoroughCodeToName(location.borough)}, NY ${location.zip_code}`}</Typography>
                    </ListItem>
                    <ListItem>
                        <ScheduleIcon color="primary" style={{marginRight: "8px", marginLeft: "2px"}}/>
                        <Typography variant="subtitle1" style={{color: (isOpen && "green") || "red"}} className={classes.subText}>{(isOpen && t("Open")) || t("Closed") }</Typography>
                    </ListItem>
                    {
                        location.phone_number && (
                            <ListItem>
                                <PhoneIcon color="primary" style={{marginRight: "8px", marginLeft: "2px"}}/>
                                <Typography variant="subtitle1" className={classes.subText}>{formatPhoneNumber(location.phone_number)}</Typography>
                            </ListItem>
                        )
                    }
                    {
                        location.indoor_dining && (
                            <ListItem>
                                <CheckIcon color="primary" style={{marginRight: "8px", marginLeft: "2px"}}/>
                                <Typography variant="subtitle1" className={classes.subText}>{t("Indoor Dining")}</Typography>
                            </ListItem>
                        )
                    }
                    {
                        location.outdoor_dining && (
                            <ListItem>
                                <CheckIcon color="primary" style={{marginRight: "8px", marginLeft: "2px"}}/>
                                <Typography variant="subtitle1" className={classes.subText}>{t("Outdoor Dining")}</Typography>
                            </ListItem>
                        )
                    }
                    {
                        (!location.cash_only && (
                            <ListItem>
                                <CheckIcon color="primary" style={{marginRight: "8px", marginLeft: "2px"}}/>
                                <Typography variant="subtitle1" className={classes.subText}>{t("Accepts Credit")}</Typography>
                            </ListItem>
                        )) ||(
                            <ListItem>
                                <CheckIcon color="primary" style={{marginRight: "8px", marginLeft: "2px"}}/>
                                <Typography variant="subtitle1" className={classes.subText}>{t("Cash Only")}</Typography>
                            </ListItem>
                        )
                    }
                    {
                        location.takeout && (
                            <ListItem>
                                <CheckIcon color="primary" style={{marginRight: "8px", marginLeft: "2px"}}/>
                                <Typography variant="subtitle1" className={classes.subText}>{t("Take Out")}</Typography>
                            </ListItem>
                        )
                    }
                    {
                        location.restaurant && (
                            <ListItem>
                                <CheckIcon color="primary" style={{marginRight: "8px", marginLeft: "2px"}}/>
                                <Typography variant="subtitle1" className={classes.subText}>{t("Restaurant")}</Typography>
                            </ListItem>
                        )
                    }
                </List>
            </div>
            </SwipeableDrawer>
        </React.Fragment>
    );
};


export default FoodLocationDrawer;