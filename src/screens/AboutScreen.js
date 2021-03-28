import React from 'react';
import BaseScreen from './BaseScreen';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    smallerFont : {
		fontSize: '16px',
        lineHeight: "1.6",
        whiteSpace: "pre-wrap"
	},
    titleHolder:{
        padding:"20px 0px 8px 0px",
        textAlign:"center",
    },

}));

const AboutScreen = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <BaseScreen>
            <Grid container className={classes.largeContainer} style={{padding: 10, paddingTop: 100, minHeight: '100vh'}} justify="center">
                <Grid item xs={12} sm={10} md={8}>
                    <Typography variant="h4" component="h3" style={{textAlign: "center"}}  className={classes.textMiddle}>{ t("About") }</Typography><br/><br/>
                    <div style={{padding: "0px 10px 40px", maxWidth: 800, margin: "auto"}}>
                        <Typography gutterBottom className={classes.smallerFont}  variant="h5" component="p">
                            { t('about-text') }
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </BaseScreen>
    );
};

export default AboutScreen;