import React from 'react';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextInputMaterial from './TextInputMaterial';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import FormModalBase from './FormModalBase';
import AddErrors from './AddErrors';
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

const createObjectfromArray = (foodlocationTranslationsArray, id) =>{
    const translationWithId = foodlocationTranslationsArray.filter(item => item.id === id)[0];
    return {
        foodlocation: translationWithId.foodlocation,
        model_field: translationWithId.model_field,
        language: translationWithId.language,
        text: translationWithId.text
    };
};

const FoodLocationTranslationForm = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const state =  props.id? createObjectfromArray(props.foodLocationTranslations, props.id): {
        foodlocation: "",
        model_field: "",
        language: "",
        text: "",
    };
    const submitValues = props.id? props.editMethod: props.createMethod;
    const validateValues = (values) =>{
        let errors = {};
        if(!values.foodlocation){
            errors.foodlocation = "Required";
        }
        if(!values.model_field){
            errors.model_field="Required";
        } 
        if(!values.language){
            errors.language = "Required";
        }
        if(!values.text){
            errors.text = "Required";
        }
        return errors;
    }
    
    return (
        <FormModalBase fadeIn={props.fadeIn} onClick={()=>{props.closeModal('fieldTranslationsModal');}}>
            <Grid container justify="center" className={classes.largeContainer} >
                <Container maxWidth="md">
                    <Paper id="formModal" depth={3} className={classes.paper}>
                        <div style={{marginBottom: "11px"}}>
                            <IconButton style={{color: "black", float: "right", marginTop: "-18px"}} aria-label="close" onClick={()=>{props.closeModal('fieldTranslationsModal');}}>
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
                                    <AddErrors name="foodlocation" touched={touched} errors={errors}>
                                        <FormControl variant="outlined" disabled={Boolean(props.id)} required fullWidth className={classes.formControlSelector} error={touched.foodlocation && Boolean(errors.foodlocation)}>
                                            <InputLabel id="foodlocation-select-label">{t("Food Location")}</InputLabel>
                                            <Select labelId="foodlocation-select-label" id="foodlocation" name="foodlocation" label={t("Food Location")} fullWidth value={values.foodlocation} onChange={handleChange} onBlur={handleBlur}>
                                                {
                                                    props.foodlocation.map((item, index) =>
                                                        (
                                                            <MenuItem key={index} value={item.id}>{`${item.name}, ${item.address}`}</MenuItem>
                                                        )
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </AddErrors>
                                    <AddErrors name="model_field" touched={touched} errors={errors}>
                                        <FormControl variant="outlined" required fullWidth className={classes.formControlSelector} error={touched.model_field && Boolean(errors.model_field)}>
                                            <InputLabel id="model_field-select-label">{t("Field")}</InputLabel>
                                            <Select labelId="model_field-select-label" id="model_field" name="model_field" label={t("Field")} fullWidth value={values.model_field} onChange={handleChange} onBlur={handleBlur}>
                                                {
                                                    [{code: 'description', text: "Description"}, {code: 'name', text: "Name"}].map((item, index) =>
                                                        (
                                                            <MenuItem key={index} value={item.code}>{item.text}</MenuItem>
                                                        )
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </AddErrors>
                                    <AddErrors name="language" touched={touched} errors={errors}>
                                        <FormControl variant="outlined" required fullWidth className={classes.formControlSelector} error={touched.language && Boolean(errors.language)}>
                                            <InputLabel id="language-select-label">{t("Language")}</InputLabel>
                                            <Select labelId="language-select-label" id="language" name="language" label={t("Language")} fullWidth value={values.language} onChange={handleChange} onBlur={handleBlur}>
                                                {
                                                    [{code: 'es', text: "Spanish"}, {code: 'zh', text: "Chinese"}].map((item, index) =>
                                                        (
                                                            <MenuItem key={index} value={item.code}>{item.text}</MenuItem>
                                                        )
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </AddErrors>
                                    <TextInputMaterial { ...{name: "text",  label: t("Text"), type: "text", required: true, values, errors, touched, handleChange, handleBlur, multiline:true, rows: 4}}/>                                
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

export default FoodLocationTranslationForm;