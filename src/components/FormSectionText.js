import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    gridSpace:{
        paddingTop: 5,
        paddingBottom: 0, 
    },
    labelTextHolder:{
        fontSize: 20,
    },
}));

const FormSectionText = (props) => {

    const classes = useStyles();

    return (
        <div style={{paddingLeft: 5}}>
            <Grid container justify="center" alignItems="center" className={classes.gridSpace}>
                <Grid item xs={12} sm={10} md={9}>
                    <Typography variant="h5" className={classes.labelTextHolder}>{props.label}</Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default FormSectionText;