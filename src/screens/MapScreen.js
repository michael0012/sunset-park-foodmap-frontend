import React, { useState, useEffect } from 'react';
import MapBaseScreen from './MapBaseScreen';
import { getCookie } from '../utils';
import axios from '../api';
import i18n from '../i18n';
import MapSearchBar from '../components/MapSearchBar';
import HoverLocationInfo from '../components/HoverLocationInfo';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './MapScreen.css';

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
        locations: null,
        next: null,
        searched: false,
        paramsObject: {},
    });
    useEffect(() => {
        const getFoodLocations = async () => {
            const csrftoken = getCookie("csrftoken") || "";
            try{
                const response = await axios.get('/api/v0/foodlocations/', {}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
                if( response.data){
                    setState( state => ({
                        ...state,
                        next: response.data.next,
                        locations:
                            response.data.results.features.map( item => ({...item.properties, coordinates: [item.geometry.coordinates[1], item.geometry.coordinates[0]]}) )
                        ,
                    }));
                }
            }catch{
            // nothing needed... for now
            }
        };
        getFoodLocations();
    }, []);
    const submitSearch = (keyQuery) => (async (value) => {
        
        if(value || state.searched){
            if(!value){
                delete state.paramsObject[keyQuery];
            }else{
                state.paramsObject[keyQuery] = value;
            }
            const csrftoken = getCookie("csrftoken") || "";
            try{
                const response = await axios.get('/api/v0/foodlocations/', {params: state.paramsObject}, {responseType: 'json', withCredentials: true, credentials: 'include', headers:{'X-CSRFToken': csrftoken, "Accept-Language": i18n.language}});
                if( response.data){
                    setState( state => ({
                        ...state,
                        next: response.data.next,
                        locations:
                            response.data.results.features.map( item => ({...item.properties, coordinates: [item.geometry.coordinates[1], item.geometry.coordinates[0]]}) )
                        ,
                        searched: true,
                    }));
                }
            }catch{
            // nothing needed... for now
            }
        }
    });
    return (
        <MapBaseScreen>
            <MapSearchBar onSubmit={submitSearch('search')}/>
            <MapContainer center={state.center} zoom={state.zoom} scrollWheelZoom={true} style={{height: "100vh", width: "100%", zIndex:0}}>
                <TileLayer
                attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}"
                ext="png"
                subdomains="abcd"
                minZoom="0"
                maxZoom="20"
                />
                {
                    state.locations && (
                        state.locations.map(item => {
                            if(item.coordinates && item.coordinates.length === 2){
                                return (
                                    <Marker
                                        key={item.id}
                                        position={item.coordinates}
                                        value={item.id}
                                        eventHandlers={{
                                            click: (e) => {
                                                const map = e.target._map;
                                                const latLng = e.target.getLatLng();
                                                setState({
                                                    ...state,
                                                    center: [latLng.lat, latLng.lng],
                                                });
                                                const zoomedIn = 18;
                                                map.setView(latLng, zoomedIn, { animate: true });
                                                e.target.openPopup();
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
            </MapContainer>
        </MapBaseScreen>
    );
    
};

export default MapScreen;