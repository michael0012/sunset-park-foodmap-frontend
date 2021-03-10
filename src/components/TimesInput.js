import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { TimePicker } from "@material-ui/pickers";
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    gridSpace:{
        paddingTop: 10,
        paddingBottom: 10, 
    },
    error:{
        color:"#f44336",
    },
    errorIcon:{
        marginRight: "2px",
        position: "relative",
        top: "5px",
    },
}));

const TimesInput = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [state, setState] = useState({
        selectTime: 0,
    });
    const setOpenCloseTime = (event) =>{
        const selectTime = event.target.value;
        if(selectTime === 0){
            props.setFieldValue(`${props.day}_open`, null);
            props.setFieldValue(`${props.day}_close`, null);
        }else if(selectTime === 1){
            props.setFieldValue(`${props.day}_open`, '00:00:00');
            props.setFieldValue(`${props.day}_close`, '23:59:00');
        }else if(selectTime === 2){
            if(props.values[`${props.day}_open`] === null){
                props.setFieldValue(`${props.day}_open`, '00:00:00');
            }
            if(props.values[`${props.day}_close`] === null){
                props.setFieldValue(`${props.day}_close`, '23:59:00');
            }
        }
        setState({
            ...state,
            selectTime: event.target.value,
        });
    };
    const handleChangeTime = (openOrClose) => ((timeObject) => {
        if(timeObject){
            let timeString = timeObject.format("HH:mm:ss");
            props.setFieldValue(`${props.day}_${openOrClose}`, timeString);
        }
    });

    let openTempValue = props.values[`${props.day}_open`] === null ? new Date(null) : new Date("1970-01-01T"+props.values[`${props.day}_open`]);
    let closeTempValue = props.values[`${props.day}_close`] === null ? new Date(null) : new Date("1970-01-01T"+props.values[`${props.day}_close`]);
    return (
        <React.Fragment>
            <Grid container justify="center" alignItems="center" className={classes.gridSpace}>
                <Grid item xs={12} sm={10} md={9}>
                    <FormControl variant="outlined" fullWidth className={classes.formControlSelector}>
                        <InputLabel id="open-times-select-label">{t("Business Hours")}</InputLabel>
                        <Select labelId="open-times-select-label" id="timeSelection" name="timeSelection" label={t("Business Hours")} fullWidth value={state.selectTime} onChange={setOpenCloseTime}>
                            <MenuItem value={0}>{t("Closed")}</MenuItem>
                            <MenuItem value={1}>{t("Open 24 Hours")}</MenuItem>
                            <MenuItem value={2}>{t("Other Time")}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {
                (state.selectTime === 2) &&
                (
                    <React.Fragment>
                        <Grid container justify="center" className={classes.gridSpace}>
                            <Grid item xs={6} sm={5} md={4}>
                                <TimePicker autoOk name={`${props.day}_open`} label={"Open"} inputVariant="outlined" format="hh:mm a" value={openTempValue} onChange={handleChangeTime("open")} error={props.touched[`${props.day}_open`] && Boolean(props.errors[`${props.day}_open`])} onBlur={props.handleBlur}/>
                                {props.touched[`${props.day}_open`] && props.errors[`${props.day}_open`] && <React.Fragment><br/><Typography component="p" className={classes.error} variant="body2" ><ErrorOutlineOutlinedIcon fontSize="small" className={classes.errorIcon}/> {props.errors[`${props.day}_open`]}</Typography></React.Fragment>}
                            </Grid>
                            <Grid item xs={false} sm={false} md={1}></Grid>
                            <Grid item xs={6} sm={5} md={4}>
                                <TimePicker autoOk label={"Close"} name={`${props.day}_close`} inputVariant="outlined" format="hh:mm a" value={closeTempValue} onChange={handleChangeTime("close")} error={props.touched[`${props.day}_close`] && Boolean(props.errors[`${props.day}_close`])} onBlur={props.handleBlur}/>
                                {props.touched[`${props.day}_close`] && props.errors[`${props.day}_close`] && <React.Fragment><br/><Typography component="p" className={classes.error} variant="body2" ><ErrorOutlineOutlinedIcon fontSize="small" className={classes.errorIcon}/> {props.errors[`${props.day}_close`]}</Typography></React.Fragment>}
                            </Grid>
                        </Grid>
                    </React.Fragment>
                ) 
            }
        </React.Fragment>
    );
};

export default TimesInput;