import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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

const TextInputMaterial = (props) => {
    const classes = useStyles();
    const { multiline, rows} = props;
    let extras = {};
    if(multiline !== undefined)
        extras = {multiline, rows};
    
    return (
        <Grid container justify="center" className={classes.gridSpace}>
            <Grid item xs={12} sm={10} md={9}>
                <TextField {...extras} id={`outlined-adornment-${props.name}`} name={props.name} required={props.required} type={props.type} label={props.label} variant="outlined" fullWidth error={props.touched[props.name] && Boolean(props.errors[props.name])} value={props.values[props.name]} onChange={props.handleChange} onBlur={props.handleBlur}/>
                {props.touched[props.name] && props.errors[props.name] && <React.Fragment><br/><Typography component="p" className={classes.error} variant="body2" ><ErrorOutlineOutlinedIcon fontSize="small" className={classes.errorIcon}/> {props.errors[props.name]}</Typography></React.Fragment>}
            </Grid>
        </Grid>
    );
};

TextInputMaterial.protoTypes ={
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

export default TextInputMaterial;