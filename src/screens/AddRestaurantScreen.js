import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import i18n from '../i18n';
import BaseScreen from './BaseScreen';
import AddRestaurantForm from '../components/AddRestaurantForm';
import LoadingScreen from '../screens/LoadingScreen';
import Typography from '@material-ui/core/Typography';
import axios from '../api';
import { getCookie } from '../utils';




const AddRestaurantScreen = (props) => {
    const { t } = useTranslation();
	const [state, setState] = useState({
		loading: true,
		submitted: false,
		categories: [],
	});
	useEffect(() => {
		const getCategories = async () => {
			const csrftoken = getCookie("csrftoken") || "";
			try{
				const response = await axios.get('/api/v0/categorytags/', {}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
				setState(state => ({
					...state,
					loading: false,
					categories: [...response.data]
				}));
			}catch(error){
				setState(state => ({
					...state,
					loading: false,
				}));
			}
		};
		getCategories();
	}, []);
    const initialValues = { 
		name: "", 
		description: "",
		profile_image: null, 
		address: "", 
		borough: "", 
		zip_code: "",
		website: "",
		email: "",
		phone_number: "",
		twitter: "",
		instagram: "",
		facebook: "",
		indoor_dining: false,
		outdoor_dining: false,
		takeout: false,
		restaurant: false,
		cash_only: false,
		monday_open: null,
		monday_close: null,
		tuesday_open: null,
		tuesday_close: null,
		wednesday_open: null,
		wednesday_close: null,
		thursday_open: null,
		thursday_close: null,
		friday_open: null,
		friday_close: null,
		saturday_open: null,
		saturday_close: null,
		sunday_open: null,
		sunday_close: null,
		categories: []
	};
    const onSubmit = async (values, formikBag) => {
        try{
			formikBag.setSubmitting(true);
			let valuesCopy = { ...values, categories: [...values.categories]};
			if(valuesCopy.phone_number){
				valuesCopy['phone_number'] = valuesCopy['phone_number'].replace('-','').replace(' ', '').replace('(','').replace(')','');
			}
            const csrftoken = getCookie("csrftoken") || "";
            //const response = 
			await axios.post('/api/v0/foodlocations/', valuesCopy, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
            setState({
				...state,
				submitted: true,
			});
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
	if(state.loading)
		return(
			<LoadingScreen/>
		);
	else if(state.submitted)
		return (
			<BaseScreen>
				<div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<Typography variant="h1" style={{textAlign: 'center'}}>{t("Thanks for summitting!")}</Typography>
				</div>
			</BaseScreen>
		);
	else
		return (
			<BaseScreen>
				<div style={{paddingTop: 60, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					{
						<AddRestaurantForm {...{categories: state.categories, title: t("Add Restaurant"), initialValues, createMethod: onSubmit }}/>
					}
				</div>
			</BaseScreen>
		);
};

export default AddRestaurantScreen;