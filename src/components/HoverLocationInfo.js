import React from 'react';
import moment from 'moment-timezone';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { formatTime } from '../utils';

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
    const currentESTMoment =  moment(Date.now()).tz('America/New_York');
    const currentDay = currentESTMoment.day();
    const currentDayString = daysOfWeek[currentDay];
    const openDateTime = props.location[`${currentDayString}_open`];
    const closeDateTime = props.location[`${currentDayString}_close`];
    const checkOpen = () => {
        if(openDateTime === null){
            return false;
        }else if( closeDateTime === null){
            return true;
        }
        const currentTime = currentESTMoment.format('HH:mm');
        return ( (openDateTime <= currentTime) && ((closeDateTime === '23:59') || (currentTime <= closeDateTime)));
        

    };
    const isOpen = checkOpen();
    return (
        <div style={{padding: "0px"}}>
            <img src={props.location.profile_image || defaultImage } alt={props.location.name} style={{width:"230px"}} onError={(e)=>{e.target.onerror = null; e.target.src=defaultImage}} />
            <div className={classes.textHolder}>
                <Typography variant="h6" className={classes.name} gutterBottom style={{margin: "2px 0px"}}>{props.location.name}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.subInfoText} style={{margin: "2px 0px"}}>{props.location.address}</Typography>
                <Typography variant="body2" color={(isOpen && "initial") || ("error")} component="p" className={classes.subInfoText} style={{margin: "2px 0px", color: (isOpen && "green") || ""}}>{ (isOpen && t("Open")) || t("Closed")}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.subInfoText} style={{margin: "2px 0px"}}>{(openDateTime !== null) && (t("Opens at") + " " + formatTime(openDateTime))}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.subInfoText} style={{margin: "2px 0px"}}>{(closeDateTime !== null) && (t("Closes at") + " " + formatTime(closeDateTime))}</Typography>
            </div>
        </div>
    );

};

export default HoverLocationInfo;