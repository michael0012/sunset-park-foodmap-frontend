import React from "react";
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LOGIN } from '../reducers/loggedIn';
import BaseScreen from './BaseScreen';
import LoginForm from '../components/LoginForm';
import { useHistory } from "react-router-dom";
import axios from '../api';
import i18n from '../i18n';
import { getCookie } from '../utils';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (user) =>  dispatch({
            type: LOGIN,
            email: user.email,
            admin: user.admin
        }),
    };
  }

const loginValidator = (t) =>( ( values ) => {
    let errors = {};
    if (!values.email) {
        errors.email = t('Enter an Email');
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,256}$/i.test(values.email)
    ) {
        errors.email = t('Invalid email address');
    }
    if (!values.password) {
        errors.password = t('Enter Password');
    }
    return errors;
});

let LoginScreen = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const initialValues={ email: '', password:''};
    const onSubmit = async (values, formikBag) => {
        try{
            formikBag.setSubmitting(true);
            const csrftoken = getCookie("csrftoken") || "";
            const loginResponse = await axios.post('/auth/login', values, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
			props.login(loginResponse.data.user);
            history.push(t('/'));
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
    return (
        <BaseScreen>
            <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {
                    <LoginForm title={t("Log In")} initialValues={initialValues} onSubmit={onSubmit} validate={loginValidator(t)}/>
                }
            </div>
        </BaseScreen>
    );
};

export default connect(null, mapDispatchToProps) (LoginScreen);