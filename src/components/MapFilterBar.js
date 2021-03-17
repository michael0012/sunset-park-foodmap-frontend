import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) =>({
    chipHolder: {
        zIndex: 2,
        maxWidth: 800,
        width: "100%",
        position: "fixed",
        top: "70px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        padding: "2px 0px", 
        overflow: "hidden",
        height: "41px",
    },
    chipStyle:{
        marginRight: "8px",
    }
}));

const MapFilterBar = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return(
        <div className={classes.chipHolder}>
            <div style={{paddingBottom: "17px", overflowX: "scroll", boxSizing: "content-box", height: "100%", display: 'flex', marginRight: "12px"}}>
                <Chip variant="default" style={{marginLeft: "7px"}} className={classes.chipStyle} color={(props.queryFiltersFlags.openCurrently && "primary") || "default"} label={t("Open Now")}
                    onClick={props.filterClick('openCurrently')}
                />
                <Chip variant="default" className={classes.chipStyle} color={(props.queryFiltersFlags.cashOnly && "primary") || "default"} label={t("Cash Only")}
                    onClick={props.filterClick('cashOnly')}
                />
                <Chip variant="default" className={classes.chipStyle} color={(props.queryFiltersFlags.acceptsCredit && "primary") || "default"} label={t("Accepts Credit")}
                    onClick={props.filterClick('acceptsCredit')}
                />
                <Chip variant="default" className={classes.chipStyle} color={(props.queryFiltersFlags.indoorDining && "primary") || "default"} label={t("Indoor Dining")}
                    onClick={props.filterClick('indoorDining')}
                />
                <Chip variant="default" className={classes.chipStyle} color={(props.queryFiltersFlags.outdoorDining && "primary") || "default"} label={t("Outdoor Dining")}
                    onClick={props.filterClick('outdoorDining')}
                />
                <Chip variant="default" className={classes.chipStyle} color={(props.queryFiltersFlags.takeout && "primary") || "default"} label={t("Take Out")}
                    onClick={props.filterClick('takeout')}
                />
                <Chip variant="default" className={classes.chipStyle} color={(props.queryFiltersFlags.restaurant && "primary") || "default"} label={t("Restaurant")}
                    onClick={props.filterClick('restaurant')}
                />
            </div>
        </div>
    );
};

export default MapFilterBar;