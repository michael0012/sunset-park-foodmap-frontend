import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    textHolder:{
        fontSize: "8px",
        padding: "2px 8px",
    },
    name: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    subInfoText: {
        fontSize: "12px",
    },
}));

const HoverLocationInfo = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/320px-SunsetPark.jpg";
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = moment().day();
    const currentDayString = daysOfWeek[currentDay];
    const openDateTime = props.location[`${currentDayString}_open`] === null? null: moment("1970-01-01T"+props.location[`${currentDayString}_open`]);
    const closeDateTime = props.location[`${currentDayString}_close`] === null? null: moment("1970-01-01T"+props.location[`${currentDayString}_close`]);
    const checkOpen = () => {
        if(props.location[`${currentDayString}_open`] === null){
            return false;
        }else if( props.location[`${currentDayString}_close`] === null){
            return true;
        }
        const currentTime = moment().format('HH:mm');
        return ( (openDateTime.format('HH:mm') <= currentTime) && ((String(closeDateTime.format('HH:mm')) === '23:59') || (currentTime <= closeDateTime.format('HH:mm'))));
        

    };
    const isOpen = checkOpen();
    return (
        <div style={{padding: "0px"}}>
            <img src={props.location.profile_image || defaultImage } alt={props.location.name} style={{width:"230px"}} onError={(e)=>{e.target.onerror = null; e.target.src=defaultImage}} />
            <div className={classes.textHolder}>
                <Typography variant="h6" className={classes.name} gutterBottom style={{margin: "2px 0px"}}>{props.location.name}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.subInfoText} style={{margin: "2px 0px"}}>{props.location.address}</Typography>
                <Typography variant="body2" color={(isOpen && "initial") || ("error")} component="p" className={classes.subInfoText} style={{margin: "2px 0px", color: (isOpen && "green") || ""}}>{ (isOpen && t("Open")) || t("Closed")}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.subInfoText} style={{margin: "2px 0px"}}>{(openDateTime !== null) && (t("Opens at") + " " + openDateTime.format('hh:mm a'))}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.subInfoText} style={{margin: "2px 0px"}}>{(closeDateTime !== null) && (t("Closes at") + " " + closeDateTime.format('hh:mm a'))}</Typography>
            </div>
        </div>
    );

};

export default HoverLocationInfo;