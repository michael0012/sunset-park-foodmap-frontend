import React from 'react';
import Grid from '@material-ui/core/Grid';
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

const AddErrors = (props) => {
    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center" className={classes.gridSpace}>
            <Grid item xs={12} sm={10} md={9}>
                { props.children }
                {props.touched[props.name] && props.errors[props.name] && <React.Fragment><br/><Typography component="p" className={classes.error} variant="body2" ><ErrorOutlineOutlinedIcon fontSize="small" className={classes.errorIcon}/> {props.errors[props.name]}</Typography></React.Fragment>}
            </Grid>
        </Grid>
    );
};

AddErrors.protoTypes ={
    name: PropTypes.string,
    touched: PropTypes.object,
    errors: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default AddErrors;