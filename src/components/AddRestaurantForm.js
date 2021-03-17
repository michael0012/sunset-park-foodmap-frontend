import React, { useState } from 'react';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextInputMaterial from './TextInputMaterial';
import CategoriesInput from './CategoriesInput';
import PhoneNumberInput from './PhoneNumberInput';
import TimesInput from './TimesInput';
import AddErrors from './AddErrors';
import { fileListToBase64 } from '../utils';
import FormSectionText from './FormSectionText';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    largeContainer: {
    },
    title:{
        fontSize: '1.8rem',
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
    checkBoxHolder:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: "5px",
    },
    checkBoxText:{
        fontSize: "18px",
    },
    buttonHolder:{
        paddingTop: 10,
        textAlign:"center", 
        paddingBottom:25,
    }
}));

const AddRestaurantForm = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [ fileName, setFileName ] = useState(null);
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
                            setFieldValue,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <TextInputMaterial { ...{name: "name",  label: t("Name"), type: "text", required: true, values, errors, touched, handleChange, handleBlur,}}/>
                                <TextInputMaterial { ...{name: "description",  label: t("Description"), type: "text", required: true, values, errors, touched, handleChange, handleBlur, multiline:true, rows: 4}}/>
                                <div>
                                <AddErrors name="profile_image" touched={touched} errors={errors}>
                                    <Typography variant="h5" className={classes.checkBoxText}>{t("Profile Image")}</Typography>
                                    <Button
                                    variant="contained"
                                    component="label"
                                    >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                        name="profile_image"
                                        onChange={async (event) => {
                                           let imageStringArray = [null];
                                            try{
                                                setFileName(event.target.files[0].name);
                                                imageStringArray = await fileListToBase64(event.target.files);
                                            }catch(error){
                                                
                                            }
                                            setFieldValue("profile_image", imageStringArray[0] || null);
                                        }}
                                    />
                                    </Button>
                                    {
                                        fileName && <p>{fileName}</p>
                                    }
                                </AddErrors>
                                </div>
                                <div>
                                    <FormSectionText label={t("Address")}/>
                                    <div style={{marginLeft: '10px'}}>
                                        <TextInputMaterial { ...{name: "address",  label: t("Street Address"), type: "text", required: true, values, errors, touched, handleChange, handleBlur,}}/>
                                        <AddErrors name="borough" touched={touched} errors={errors}>
                                            <FormControl variant="outlined" required fullWidth className={classes.formControlSelector} error={touched.borough && Boolean(errors.borough)}>
                                                <InputLabel id="borough-select-label">{t("Borough")}</InputLabel>
                                                <Select labelId="borough-select-label" id="borough" name="borough" label={t("Borough")} fullWidth value={values.borough} onChange={handleChange} onBlur={handleBlur}>
                                                    <MenuItem value={"BK"}>Brooklyn</MenuItem>
                                                    <MenuItem value={"BX"}>Bronx</MenuItem>
                                                    <MenuItem value={"M"}>Manhattan</MenuItem>
                                                    <MenuItem value={"Q"}>Queens</MenuItem>
                                                    <MenuItem value={"SI"}>Staten Island</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </AddErrors>
                                        <TextInputMaterial { ...{name: "zip_code",  label: t("Zip Code"), type: "text", required: true, values, errors, touched, handleChange, handleBlur,}}/>
                                    </div>
                                </div>
                                <AddErrors {...{name: "categories", errors, touched}}>
                                    <CategoriesInput { ...{categories: props.categories, name: "categories", label: t("Categories"), values, errors, touched, handleChange, handleBlur,}} />
                                </AddErrors>
                                <AddErrors {...{name: "indoor_dining", errors, touched}}>
                                    <div className={classes.checkBoxHolder}>
                                        <Typography variant="h5" className={classes.checkBoxText}>{t("Indoor Dining")}</Typography> <Checkbox checked={values.indoor_dining} onChange={handleChange} name="indoor_dining" color="primary"/>
                                    </div>
                                </AddErrors>
                                <AddErrors {...{name: "outdoor_dining", errors, touched}}>
                                    <div className={classes.checkBoxHolder}>
                                        <Typography variant="h5" className={classes.checkBoxText}>{t("Outdoor Dining")}</Typography> <Checkbox checked={values.outdoor_dining} onChange={handleChange} name="outdoor_dining" color="primary"/>
                                    </div>
                                </AddErrors>
                                <AddErrors {...{name: "takeout", errors, touched}}>
                                    <div className={classes.checkBoxHolder}>
                                        <Typography variant="h5" className={classes.checkBoxText}>{t("Takeout")}</Typography> <Checkbox checked={values.takeout} onChange={handleChange} name="takeout" color="primary"/>
                                    </div>
                                </AddErrors>
                                <AddErrors {...{name: "restaurant", errors, touched}}>
                                    <div className={classes.checkBoxHolder}>
                                        <Typography variant="h5" className={classes.checkBoxText}>{t("Restaurant")}</Typography> <Checkbox checked={values.restaurant} onChange={handleChange} name="restaurant" color="primary"/>
                                    </div>
                                </AddErrors>
                                <AddErrors {...{name: "cash_only", errors, touched}}>
                                    <div className={classes.checkBoxHolder}>
                                        <Typography variant="h5" className={classes.checkBoxText}>{t("Cash Only")}</Typography> <Checkbox checked={values.cash_only} onChange={handleChange} name="cash_only" color="primary"/>
                                    </div>
                                </AddErrors>
                                <FormSectionText label={t("Monday Business Hours")}/>
                                <div style={{marginLeft: '10px'}}>
                                    <TimesInput { ...{day: "monday", setFieldValue, values, errors, touched, handleChange, handleBlur} } />
                                </div>
                                <FormSectionText label={t("Tueday Business Hours")}/>
                                <div style={{marginLeft: '10px'}}>
                                    <TimesInput { ...{day: "tuesday", setFieldValue, values, errors, touched, handleChange, handleBlur} } />
                                </div>
                                <FormSectionText label={t("Wednesday Business Hours")}/>
                                <div style={{marginLeft: '10px'}}>
                                    <TimesInput { ...{day: "wednesday", setFieldValue, values, errors, touched, handleChange, handleBlur} } />
                                </div>
                                <FormSectionText label={t("Thursday Business Hours")}/>
                                <div style={{marginLeft: '10px'}}>
                                    <TimesInput { ...{day: "thursday", setFieldValue, values, errors, touched, handleChange, handleBlur} } />
                                </div>
                                <FormSectionText label={t("Friday Business Hours")}/>
                                <div style={{marginLeft: '10px'}}>
                                    <TimesInput { ...{day: "friday", setFieldValue, values, errors, touched, handleChange, handleBlur} } />
                                </div>
                                <FormSectionText label={t("Saturday Business Hours")}/>
                                <div style={{marginLeft: '10px'}}>
                                    <TimesInput { ...{day: "saturday", setFieldValue, values, errors, touched, handleChange, handleBlur} } />
                                </div>
                                <FormSectionText label={t("Sunday Business Hours")}/>
                                <div style={{marginLeft: '10px'}}>
                                    <TimesInput { ...{day: "sunday", setFieldValue, values, errors, touched, handleChange, handleBlur} } />
                                </div>
                                <TextInputMaterial { ...{name: "email",  label: t("Email"), type: "text", values, errors, touched, handleChange, handleBlur,}}/>
                                <TextInputMaterial { ...{name: "website",  label: t("Website"), type: "text", values, errors, touched, handleChange, handleBlur,}}/>
                                <PhoneNumberInput { ...{name: "phone_number",  label: t("Phone Number"), type: "text", values, errors, touched, handleChange, handleBlur,}}/>
                                <TextInputMaterial { ...{name: "twitter",  label: t("Twitter"), type: "text", values, errors, touched, handleChange, handleBlur,}}/>
                                <TextInputMaterial { ...{name: "instagram",  label: t("Instagram"), type: "text", values, errors, touched, handleChange, handleBlur,}}/>
                                <TextInputMaterial { ...{name: "facebook",  label: t("Facebook"), type: "text", values, errors, touched, handleChange, handleBlur,}}/>
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

export default AddRestaurantForm;