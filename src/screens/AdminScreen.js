import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import CRUDTable from '../components/CRUDTable';
import CategoriesForm from '../components/CategoriesForm';
import LoadingScreen from './LoadingScreen';
import BaseScreen from './BaseScreen';
import axios from '../api';
import i18n from '../i18n';
import { getCookie } from '../utils';


const AdminScreen = (props) => {
    const [state, setState] = useState({
        loading: true,
        foodLocations: null,
        categories: null,
        categoriesTranslations: null,
        fieldTranslations: null,
        categoriesModal: false,
        categoriesTranslationsModal: false,
        foodLocationsModal: false,
        fieldTranslationsModal: false,
        editId: null,
    });
    const { t } = useTranslation();
    useEffect(() => {
        const getItems = async () =>{
            try{
                // get all items
                const csrftoken = getCookie("csrftoken") || "";
                const foodlocationsResponse = await axios.get('/api/v0/foodlocations/', {}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
                const categoriesResponse = await axios.get('/api/v0/categorytags/', {}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
                const categoriesTranslations = await axios.get('/api/v0/categorytagtranslations/', {}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
                const fieldTranslations = await axios.get('/api/v0/foodlocationtranslations/', {}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
                if( foodlocationsResponse.data && categoriesResponse.data ){
                    setState( state => ({
                        ...state,
                        foodLocations:
                            foodlocationsResponse.data.results.features.map( item => ({...item.properties, coordinates: [item.geometry.coordinates[1], item.geometry.coordinates[0]]}) )
                        ,
                        categories: categoriesResponse.data,
                        categoriesTranslations: categoriesTranslations.data,
                        fieldTranslations: fieldTranslations.data
                    }));
                }
            }catch(errors){

            }
            setState(state => ({
                ...state,
                loading: false
            }))
        };
        getItems();
    }, []);
    const closeModal = (modalName) => {
        setState({
            ...state,
            [modalName]: false,
            editId: null
        });
    };
    const addNamefromCategories = (array) => {
        return array.map(translation => {
            const itemsWithId =  state.categories.filter(item => item.id === translation.category);
            if(itemsWithId.length){
                translation['category_name'] = itemsWithId[0].name;
            }
            return translation;
        });
    };
    const deleteItem = (id, route, arrayName) => (async () => {
        try{
            const csrftoken = getCookie("csrftoken") || "";
            await axios.delete(route+`${id}/`, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
            const newArray = state[arrayName].filter((item)=> (item.id !== id));
            if(arrayName === 'categories'){
                const itemsWithId =  state.categoriesTranslations.filter(item => item.category !== id);
                setState(state =>({
                    ...state,
                    categories: newArray,
                    categoriesTranslations: itemsWithId,
                }));
            }else{
                setState(state =>({
                    ...state,
                    [arrayName]: newArray
                }));
            }
        }catch(error){

        }
    });
    const editItem = (id, route, arrayName) => ( async (values) => {
        try{
            const csrftoken = getCookie("csrftoken") || "";
            const response = await axios.put(route+`${id}/`, values, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
            if(arrayName !== 'foodLocations'){
                const newArray = state[arrayName].map((item)=> {
                    if(item.id === id){
                        return response.data;
                    }else{
                        return item;
                    }
                });
                
                setState(state => ({
                    ...state,
                    [arrayName]: newArray,
                    editId: null,
                    [`${arrayName}Modal`]: false
                }));
            } else {
                const newArray = state[arrayName].map((item)=> {
                    if(item.id === id){
                        return {...response.item.properties, coordinates: [response.geometry.coordinates[1], response.geometry.coordinates[0]]};
                    }else{
                        return item;
                    }
                });
                setState(state => ({
                    ...state,
                    [arrayName]: newArray,
                    editId: null,
                    [`${arrayName}Modal`]: false
                }));
            }
            
        }catch(error){

        }
    });
    const addItem = (route, arrayName) => ( async (values) =>{
        try{
            const csrftoken = getCookie("csrftoken") || "";
            const response = await axios.post(route, values, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
            
            if(arrayName === 'foodLocations'){
                let newArray = state[arrayName].map(item=> item);
                newArray.push({...response.item.properties, coordinates: [response.geometry.coordinates[1], response.geometry.coordinates[0]]});
                setState(state => ({
                    ...state,
                    [arrayName]: newArray,
                    [`${arrayName}Modal`]: false
                }));
            } else {
                let newArray = state[arrayName].map(item=> item)
                newArray.push(response.data);
                setState(state => ({
                    ...state,
                    [arrayName]: newArray,
                    [`${arrayName}Modal`]: false
                }));
            }
        }catch(error){

        }
    });
    const callEditModal = (id, arrayName) => {
        setState({
            ...state,
            editId: id,
            [`${arrayName}Modal`]: true
        });
    };
    if(state.loading){
        return <LoadingScreen/>;
    }else{
        return (
            <BaseScreen>
                <div style={{maxWidth: "600px", margin: "80px auto 10px auto"}}>
                    <CRUDTable title={"Food Locations"} keysElements={["name", "address"]} rows={state.foodLocations} callEditModal={callEditModal} deleteMethod={deleteItem} route={'/api/v0/foodlocations/'} objectPropName={'foodLocations'} />
                </div>
                <div style={{maxWidth: "600px", margin: "80px auto 10px auto"}}>
                    <CRUDTable title={"Categories"} keysElements={["name"]} rows={state.categories} callEditModal={callEditModal} deleteMethod={deleteItem} route={'/api/v0/categorytags/'} objectPropName={'categories'} />
                </div>
                <div style={{maxWidth: "600px", margin: "80px auto 10px auto"}}>
                    <CRUDTable title={"Category Translations"} keysElements={["category_name", "language", "text"]} rows={addNamefromCategories(state.categoriesTranslations)} callEditModal={callEditModal} deleteMethod={deleteItem} route={'/api/v0/categorytagtranslations/'} objectPropName={'categoriesTranslations'} />
                </div>
                <div style={{maxWidth: "600px", margin: "80px auto 10px auto"}}>
                    <CRUDTable title={"Food Locations Translations"} keysElements={[ "foodlocation", "field", "language"]} rows={state.fieldTranslations} callEditModal={callEditModal} deleteMethod={deleteItem} route={'/api/v0/foodlocationtranslations/'} objectPropName={'fieldTranslations'} />
                </div>
                {
                    state.categoriesModal && <CategoriesForm title={"Add Category"} fadeIn={state.categoriesModal} createMethod={addItem('/api/v0/categorytags/', 'categories')} editMethod={editItem(state.editId, '/api/v0/categorytags/', 'categories')} categories={state.categories} id={state.editId} closeModal={closeModal} />
                }
            </BaseScreen>
        )
    }

};

export default AdminScreen;