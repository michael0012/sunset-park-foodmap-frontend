import React from 'react';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextInputMaterial from './TextInputMaterial';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import FormModalBase from './FormModalBase';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme) =>({
    largeContainer: {
        maxWidth: 540,
        '&:hover':{
            'cursor': "initial"
        }
    },
    title:{
        fontSize: '1.8rem',
    },
    paper: {
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        padding: "25px 12px",
       
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

const CategoriesForm = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const state = {
        name: (props.id? props.categories.filter(item => item.id === props.id)[0].name: "") 
    };
    const submitValues = props.id? props.editMethod: props.createMethod;
    const validateValues = (values) =>{
        let errors = {};
        if(!values.name){
            errors.name = "Required";
        }
        return errors;
    }
    
    return (
        <FormModalBase fadeIn={props.fadeIn} onClick={()=>{props.closeModal('categoriesModal');}}>
            <Grid container justify="center" className={classes.largeContainer} >
                <Container maxWidth="md">
                    <Paper id="formModal" depth={3} className={classes.paper}>
                        <div style={{marginBottom: "11px"}}>
                        <IconButton style={{color: "black", float: "right", marginTop: "-18px"}} aria-label="close" onClick={()=>{props.closeModal('categoriesModal');}}>
                            <CloseOutlinedIcon/>
                        </IconButton>
                        </div>
                        <Box className={classes.titleHolder}>
                            <Typography variant="h5" className={classes.title}>{props.title}</Typography>
                        </Box>
                        <Formik initialValues={state} onSubmit={submitValues} validate={validateValues}>
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
                                    <TextInputMaterial { ...{name: "name",  label: t("Name"), type: "text", required: true, values, errors, touched, handleChange, handleBlur,}}/>                                
                                    <Grid container justify="center" alignItems="center" className={classes.buttonHolder}>
                                        <Grid item xs={12} sm={10} md={6}>
                                            <Button variant="contained" size="large" type="submit" color="primary" disabled={isSubmitting}>
                                                {t("Submit")}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    
                                </form>
                            )}
                        </Formik>
                    </Paper>
                </Container>
            </Grid>
        </FormModalBase>
    );
};

export default CategoriesForm;