import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
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

const PasswordInput = (props) => {

    const classes = useStyles();
    const [state, setState] = useState({showPassword: false});
    return (
        <Grid container justify="center" alignItems="center" className={classes.gridSpace}>
            <Grid item xs={12} sm={10} md={9}>
                <FormControl variant="outlined" fullWidth required={props.required}>
                    <InputLabel htmlFor={`outlined-adornment-${props.name}`} error={props.touched[props.name] && Boolean(props.errors[props.name])}>{props.label}</InputLabel>
                    <OutlinedInput id={`outlined-adornment-${props.name}`} name={props.name} type={state.showPassword ? "text" : "password"} label={props.label} variant="outlined" fullWidth error={props.touched[props.name] && Boolean(props.errors[props.name])} value={props.values[props.name]} onChange={props.handleChange} onBlur={props.handleBlur} 
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                aria-label="toggle password visibility"
                                onClick={()=>{setState({...state, showPassword: !state.showPassword})}}
                                onMouseDown={(event)=>{event.preventDefault();}}
                            >
                                {state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    />
                </FormControl>
                {props.touched[props.name] && props.errors[props.name] && <React.Fragment><br/><Typography component="p" className={classes.error} variant="body2" ><ErrorOutlineOutlinedIcon fontSize="small" className={classes.errorIcon}/> {props.errors[props.name]}</Typography></React.Fragment>}
            </Grid>
        </Grid>
    );
};

PasswordInput.protoTypes ={
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    touched: PropTypes.object,
    errors: PropTypes.object,
    values: PropTypes.object,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    required: PropTypes.bool,
};

export default PasswordInput;