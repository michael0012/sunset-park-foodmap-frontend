import React from 'react';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
    }
}));

const RegisterForm = (props) => {
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
                                <TextInputMaterial { ...{name: "first_name",  label: t("First Name"), type: "text", required: true, values, errors, touched, handleChange, handleBlur,}}/>
                                <TextInputMaterial { ...{name: "last_name",  label: t("Last Name"), type: "text", required: true, values, errors, touched, handleChange, handleBlur,}}/>
                                <TextInputMaterial { ...{name: "email",  label: t("Email"), type: "text", values, required: true, errors, touched, handleChange, handleBlur,}}/>
                                <PasswordInput { ...{name: "password",  label: t("Password"), type: "password", required: true, values, errors, touched, handleChange, handleBlur}}/>
                                <PasswordInput { ...{name: "re_password",  label: t("Confirm Password"), type: "password", required: true, values, errors, touched, handleChange, handleBlur}}/>
                                <Grid container justify="center" alignItems="center" className={classes.buttonHolder}>
                                    <Grid item xs={12} sm={10} md={6}>
                                        <Button variant="contained" size="large" type="submit" color="primary" disabled={isSubmitting}>{t("Submit")}</Button>
                                    </Grid>
                                </Grid>
                                
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Grid>
    );
};

export default RegisterForm;