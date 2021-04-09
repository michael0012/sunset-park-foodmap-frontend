import React, { useState, useEffect } from 'react';
import MapBaseScreen from './MapBaseScreen';
import { getCookie, camelToSnake } from '../utils';
import moment from 'moment-timezone';
import axios from '../api';
import i18n from '../i18n';
import MapSearchBar from '../components/MapSearchBar';
import HoverLocationInfo from '../components/HoverLocationInfo';
import MapFilterBar from '../components/MapFilterBar';
import LocationMarker from '../components/LocationMarker';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './MapScreen.css';
import FoodLocationDrawer from '../components/FoodLocationDrawer';

let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;
L.Control.Zoom.prototype.options.position = 'bottomleft';


const MapScreen = (props) => {
    const [state, setState] = useState({
        zoom: 15,
        center: [40.647568, -74.004103],
        locate: "begin",
        locations: null,
        queryLocations: null,
        searched: false,
        paramsObject: {},
        queryFiltersFlags: {
            openCurrently: false,
            indoorDining: false,
            outdoorDining: false,
            takeout: false,
            restaurant: false,
            cashOnly: false,
            acceptsCredit: false,
        },
        foodLocationId: null,
        foodLocationDrawer: false,
    });
    useEffect(() => {
        const getFoodLocations = async () => {
            const csrftoken = getCookie("csrftoken") || "";
            try{
                const response = await axios.get('/api/v0/foodlocations/', {}, {responseType: 'json', 
                    withCredentials: true, 
                    credentials: 'include', 
                    headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}
                });
                if( response.data){
                    const modifiedLocationData = response.data.results.features.map( item => ({
                        ...item.properties, 
                        coordinates: [item.geometry.coordinates[1], item.geometry.coordinates[0]]
                    }) );
                    setState( state => ({
                        ...state,
                        locations: modifiedLocationData,
                        queryLocations: modifiedLocationData,
                    }));
                }
            }catch{
            // nothing needed... for now
            }
        };
        getFoodLocations();
    }, []);
    const toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ 
            ...state, 
            foodLocationDrawer: !state.foodLocationDrawer,
            foodLocationId: null
        });
      };
    const clickLocationMarker = (foodLocationId) => {
        setState(state => ({
            ...state,
            foodLocationId: foodLocationId,
            foodLocationDrawer: true
        }));
    };
    const clickLocateIcon = (value) => {
        setState({
            ...state,
            locate: value
        });
    };

    const filterFoodLocations = (foodLocations, queryFiltersFlags) => {
        let filteredFoodLocations = [...foodLocations];

        for (let key in queryFiltersFlags){
            if(queryFiltersFlags[key]){
                if(key === 'openCurrently'){
                    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                    const momentTimeObject = moment(Date.now()).tz('America/New_York');
                    const currentDay = momentTimeObject.day();
                    const currentDayString = daysOfWeek[currentDay];
                    const currentTime  = momentTimeObject.format('HH:mm')+":00";
                    const timeLess = `${currentDayString}_open`;
                    const timeMore = `${currentDayString}_close`;
                    filteredFoodLocations = filteredFoodLocations.filter(item => (item[timeLess] && item[timeMore] && (item[timeLess] <= currentTime) && (item[timeMore] >= currentTime)))
                }
                if(['indoorDining', 'outdoorDining', 'takeout', 'restaurant', 'cashOnly', 'acceptsCredit'].includes(key)){
                    filteredFoodLocations = filteredFoodLocations.filter(item => item[camelToSnake(key)]);
                }
            }
        }
        return filteredFoodLocations;
    };

    const submitSearch = (keyQuery) => (async (value) => {
        if((value || keyQuery !== 'search') || state.searched){
            if(!value && keyQuery === 'search'){
                delete state.paramsObject[keyQuery];
            }else if(keyQuery === 'search'){
                state.paramsObject[keyQuery] = value;
            }
            const csrftoken = getCookie("csrftoken") || "";
            const params = state.paramsObject.search ? { search: state.paramsObject.search } : {};
            try{
                const response = await axios.get('/api/v0/foodlocations/', {params}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
                if( response.data){
                    const modifiedLocationData = response.data.results.features.map( item => ({...item.properties, coordinates: [item.geometry.coordinates[1], item.geometry.coordinates[0]]}) );
                    await setState( state => ({
                        ...state,
                        locations: modifiedLocationData,
                        queryLocations: filterFoodLocations(modifiedLocationData, state.queryFiltersFlags),
                        searched: true,
                    }));
                }
            }catch{
            // nothing needed... for now
            }
        }
    });
    const filterClick = (filterValue) => (async () => {
        const passingFlag = state.queryFiltersFlags[filterValue];
        //await submitSearch(filterValue)(!passingFlag);
        let queryFiltersFlags = {...state.queryFiltersFlags};
        if(filterValue === 'cashOnly' && !passingFlag && state.queryFiltersFlags['acceptsCredit']){
            queryFiltersFlags = {
                ...queryFiltersFlags,
                [filterValue]: !queryFiltersFlags[filterValue],
                acceptsCredit: false,
                queryLocations: filterFoodLocations(state.locations, queryFiltersFlags),
            };
            await setState(state => ({
                ...state,
                queryFiltersFlags
            }));
        } else if(filterValue === 'acceptsCredit' && !passingFlag && state.queryFiltersFlags['cashOnly']){
            queryFiltersFlags = {
                ...queryFiltersFlags,
                [filterValue]: !queryFiltersFlags[filterValue],
                cashOnly: false,
            }; 
            await setState(state => ({
                ...state,
                queryFiltersFlags,
                queryLocations: filterFoodLocations(state.locations, queryFiltersFlags),
            }));
        }else{
            queryFiltersFlags = {
                ...queryFiltersFlags,
                [filterValue]: !queryFiltersFlags[filterValue]
            }
            await setState(state => ({
                ...state,
                queryFiltersFlags,
                queryLocations: filterFoodLocations(state.locations, queryFiltersFlags),
            }));
        }

    });
    return (
        <MapBaseScreen>
            {
                state.foodLocationDrawer && (
                    <FoodLocationDrawer 
                        openDrawer={state.foodLocationDrawer}
                        toggleDrawer={toggleDrawer}
                        foodLocations={state.locations}
                        foodLocationId={state.foodLocationId} 
                    />
                )
            }
            
            <MapSearchBar onSubmit={submitSearch('search')} clickLocateIcon={clickLocateIcon}/>
            <MapFilterBar filterClick={filterClick} queryFiltersFlags={state.queryFiltersFlags} />
            <MapContainer center={state.center} zoom={state.zoom} scrollWheelZoom={true} style={{height: "100vh", width: "100%", zIndex:0}}>
                <TileLayer
                attribution='Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                ext="png"
                subdomains="abcd"
                minZoom="0"
                maxZoom="20"
                />
                {
                    state.queryLocations && (
                        state.queryLocations.map(item => {
                            if(item.coordinates && item.coordinates.length === 2){
                                return (
                                    <Marker
                                        key={item.id}
                                        position={item.coordinates}
                                        value={item.id}
                                        eventHandlers={{
                                            click: (e) => {
                                                e.target.closePopup();
                                                clickLocationMarker(item.id);
                                            },
                                            mouseover: (e) => {
                                                e.target._tooltip.setOpacity(0);
                                                e.target.openPopup();
                                              },
                                            mouseout: (e) => {
                                                e.target.closePopup();
                                                e.target._tooltip.setOpacity(1);
                                            },
                                        }}
                                    >
                                        <Popup closeButton={false}>
                                            <HoverLocationInfo location={item}/>
                                        </Popup>
                                        <Tooltip direction="top" offset={[-8, -2]} opacity={1} permanent>
                                            <span style={{fontSize: 14}}>{item.name}</span>
                                        </Tooltip>
                                    </Marker>
                                );
                            }else{
                                return null;
                            }
                        }
                        )
                    )
                    
                }
                <LocationMarker locate={state.locate} clickLocateIcon={clickLocateIcon}/>
            </MapContainer>
        </MapBaseScreen>
    );
    
};

export default MapScreen;