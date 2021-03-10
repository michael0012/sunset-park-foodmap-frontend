import React from 'react';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    largeContainer: {
        padding: 10, 
        paddingTop: 60,
    },
    container: {
        paddingTop: 10,
	    paddingBottom: 80,
    },
    paper: {
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "25px 18px",
        maxWidth: 600,
    },
    titleHolder:{
        padding:"20px 0px 8px 0px",
        textAlign:"center",
    },
}));

const FormPaper = (props) => {
    const classes = useStyles();
    return (
        <Grid container justify="center" className={classes.largeContainer} >
            <Container className={classes.container} maxWidth="md">
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
                                
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Container>
        </Grid>
        
    );
};

export default FormPaper;