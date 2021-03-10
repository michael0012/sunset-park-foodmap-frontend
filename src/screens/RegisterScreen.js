import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import BaseScreen from './BaseScreen';
import RegisterForm from '../components/RegisterForm';
import axios from '../api';
import { getCookie } from '../utils';
import { Typography } from "@material-ui/core";


const signupValidator = (t) =>  (( values ) => {
	const errors = {};
	if(!values.first_name){
		errors.first_name = t('Required');
	} else if(
		false // all if false are for future use. To add condition where a whatever would be invalid
	){
		errors.first_name = t('Invalid valid for first name');
	}
	if(!values.last_name){
		errors.last_name = t('Required');
	} else if(
		false
	){
		errors.last_name = t('Invalid valid for last name');
	}
	if (!values.email) {
		errors.email = t('Required');
	} else if (
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,256}$/i.test(values.email)
	) {
		errors.email = t('Invalid email address');
	}
	if(!values.password){
		errors.password = t('Required');
	} else if(false){
		errors.password = '';
	}
	if(!values.re_password){
		errors.re_password = t('Required');
	}else if(values.password !== values.re_password){
		errors.re_password = t('Passwords do not match!');
	}
	
	return errors;
});

const RegisterScreen = (props) => {
    const { t } = useTranslation();
	const [ state, setState ] = useState({
		success: false,
	});
    const initialValues={ first_name: '', last_name: '', email: '', password:'', re_password: ''};
    const onSubmit = async (values, formikBag) => {
        try{
            formikBag.setSubmitting(true);
            const csrftoken = getCookie("csrftoken") || "";
            const response = await axios.post('/auth/signup', values, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
            setState({...state, success: true});
		} catch(error){
			/*
			if(error.response === undefined || error.response.status !== 400)
				setState({
					...state,
					displayError: true,
					errorMessage: error.message,
				});
			*/
			let errors = {};
			if(error.response.data){
                for(let key in error.response.data){
                    errors[key] = error.response.data[key][0];
                }
			}
			formikBag.setErrors({
				...errors,
			});
			formikBag.setSubmitting(false);
			return;
		}

    };
	if(state.success){
		return (
			<BaseScreen>
				<div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<div style={{textAlign: "center"}}>
						<Typography variant="h4">{ t("Your registration has been submitted!") }</Typography><br/>
						<Typography variant="h4">{ t("Please wait for approval by system admin.") }</Typography>
					</div>
				</div>
			</BaseScreen>
		);
	}else{
		return (
			<BaseScreen>
				<div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					{
						<RegisterForm {...{title: t("Sign Up"), initialValues, onSubmit, validate: signupValidator(t)}}/>
					}
				</div>
			</BaseScreen>
		);
	}
};

export default RegisterScreen;