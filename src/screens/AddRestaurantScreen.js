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


const addRestaurantValidator = (t) =>  (( values ) => {
	const errors = {};
	if(!values.name){
		errors.name = t('Required');
	} else if(
		false // all if false are for future use. To add condition where a whatever would be invalid
	){
		errors.name = t('Invalid valid for first name');
	}
	if(!values.description){
		errors.description = t('Required');
	} else if(
		false
	){
		errors.description = t('Invalid valid for description');
	}
	if(!values.address){
		errors.address = t('Required');
	} else if(false){
		errors.address = '';
	}
	if(!values.borough){
		errors.borough = t('Required');
	}else if(false){
		errors.borough = '';
	}if(!values.zip_code){
		errors.zip_code = t('Required');
	}else if(!/^\d{5}$/i.test(values.zip_code)){
		errors.zip_code = t('Invalid zip code');
	}else if( values.zip_code !== '11220' && values.zip_code !== '11232'){
		errors.zip_code = t('Invalid zip code');
	}
	if (
		values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,256}$/i.test(values.email)
	) {
		errors.email = t('Invalid email address');
	}
	const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	for(let i=0; i<daysOfWeek.length; i++){
		if(values[`${daysOfWeek[i]}_open`] !== null && values[`${daysOfWeek[i]}_close`] !== null){
			if( moment(values[`${daysOfWeek[i]}_open`], 'hh:mm:ss') > moment(values[`${daysOfWeek[i]}_close`], 'hh:mm:ss')){
				errors[`${daysOfWeek[i]}_close`] = t('Closing time must be greater than opening time.');
			}
		}
	}
	return errors;
});

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
			/*
			const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
			for(let i=0; i< daysOfWeek.length; i++){
				if(valuesCopy[`${daysOfWeek[i]}_open`]){
					valuesCopy[`${daysOfWeek[i]}_open`] = valuesCopy[`${daysOfWeek[i]}_open`];
				}
				if(valuesCopy[`${daysOfWeek[i]}_close`]){
					valuesCopy[`${daysOfWeek[i]}_close`] = valuesCopy[`${daysOfWeek[i]}_close`];
				}
			}
			*/
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
						<AddRestaurantForm {...{categories: state.categories, title: t("Add Restaurant"), initialValues, onSubmit, validate: addRestaurantValidator(t)}}/>
					}
				</div>
			</BaseScreen>
		);
};

export default AddRestaurantScreen;