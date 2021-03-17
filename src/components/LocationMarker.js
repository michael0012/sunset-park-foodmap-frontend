import React, { useState, useEffect } from 'react';
import { useMapEvents, Marker, CircleMarker } from 'react-leaflet';
const LocationMarker = (props) => {
    const [position, setPosition] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng);
            setAccuracy(e.accuracy);
            const zoomLevel = 19;
            map.setView(e.latlng, zoomLevel, { animate: true });
        },
        locationerror(e){
            alert(e.message);
        }
    });
    useEffect(() => {
        if(props.locate === "start"){
            //set locate to 2
            props.clickLocateIcon("wait");
            map.locate();
            props.clickLocateIcon("begin");
            // set to 0
        }
    });
    return (position === null) || (accuracy === null) ? null : (
        <CircleMarker center={position} radius={accuracy}>
            <Marker position={position}/>
        </CircleMarker>
    )
};

export default LocationMarker;