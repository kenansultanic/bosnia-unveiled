import "mapbox-gl/dist/mapbox-gl.css";
import "./map.scss";
import { useState, Fragment } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mainImage from "../../assets/main-section-image.jpg";

const API_KEY = 'pk.eyJ1Ijoia2VuYW44NSIsImEiOiJjbG11c2drMTQwZm9zMnJ2emtyZHZqZnBjIn0.I__aD3NUpPqMt1DWjFA6LQ';

interface MapProps {
    latitude?: number,
    longitude?: number,
    zoom?: number,
    markers?: any[]
}

const Map = ({ latitude, longitude, zoom, markers }: MapProps) => {
    const renderedMarkers = markers?.map(mark => (
        <Marker key={mark.color} longitude={mark.lon} latitude={mark.lat}>
            <div
                className="map-custom-marker"
                style={{ border: `10px solid ${mark.color}` }}></div>
        </Marker>
    ));

    return (
        <div className="map">
            <ReactMapGL
                mapLib={import('mapbox-gl')}
                mapboxAccessToken={API_KEY}
                onClick={e => { console.log(e) }}
                initialViewState={{
                    latitude,
                    longitude,
                    zoom
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                {
                    markers ?
                        renderedMarkers
                        : null
                }
            </ReactMapGL>
        </div>
    );
};

export default Map;