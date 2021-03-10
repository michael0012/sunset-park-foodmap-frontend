import React from 'react';
import { Formik } from 'formik';
import { Link as RouterLink} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextInputMaterial from './TextInputMaterial';
import PasswordInput from './PasswordInput';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    largeContainer: {
    },
    paper: {
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "25px 12px",
        maxWidth: 540,
    },
    titleHolder:{
        padding:"20px 0px 8px 0px",
        textAlign:"center",
    },
    buttonHolder:{
        paddingTop: 10,
        textAlign:"center", 
        paddingBottom:25,
    },
    registerHolder:{
        textAlign: "center",
        padding: "3px 1px",
        width: "100%",
    },
}));

const LoginForm = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <Grid container justify="center" className={classes.largeContainer} >
            <Container maxWidth="md">
                <Paper depth={3} className={classes.paper}>
                    <Box className={classes.titleHolder}>
                        <Typography variant="h5" className={classes.title}>{props.title}</Typography>
                    </Box>
                    <Formik initialValues={props.initialValues} onSubmit={props.onSubmit} validate={props.validate}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <TextInputMaterial { ...{name: "email",  label: t("Email"), type: "text", values, errors, touched, handleChange, handleBlur,}}/>
                                <PasswordInput { ...{name: "password",  label: t("Password"), type: "password", values, errors, touched, handleChange, handleBlur}}/>
                                <Box className={classes.registerHolder} style={{ display: "none" }}>
                                    <Typography component="p" variant="body2"><Link to={t("/account-recovery")}  component={RouterLink}>{t("Forgot Password?")}</Link></Typography>
                                </Box>
                                <Grid container justify="center" alignItems="center" className={classes.buttonHolder}>
                                    <Grid item xs={12} sm={10} md={6}>
                                        <Button variant="contained" size="large" type="submit" color="primary" disabled={isSubmitting}>{t("Submit")}</Button>
                                    </Grid>
                                </Grid>
                                <Box className={classes.registerHolder}>
                                    <Typography component="p" variant="body2" className={classes.registerText}>{t("Don't have an account?")} <Link to={t("/signup")} component={RouterLink}>Sign Up</Link></Typography>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Grid>
        
    );
};

export default LoginForm;