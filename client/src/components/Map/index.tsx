import "mapbox-gl/dist/mapbox-gl.css";
import "./map.scss";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mainImage from "../../assets/main-section-image.jpg";

const API_KEY = 'pk.eyJ1Ijoia2VuYW44NSIsImEiOiJjbG11c2drMTQwZm9zMnJ2emtyZHZqZnBjIn0.I__aD3NUpPqMt1DWjFA6LQ';

interface CustomMarkerProps {
    latitude: number,
    longitude: number
}
interface CustomPopupProps {
    latitude: number,
    longitude: number
}

const CustomMarker = ({ latitude, longitude }: CustomMarkerProps) => {
    return (
        <Marker longitude={longitude} latitude={latitude}>
            <div className="map-custom-marker"></div>
        </Marker>
    );
}

const CustomPopup = ({ latitude, longitude }: CustomPopupProps) => {
    const [popup, setPopup] = useState(true);

    if (popup) {
        return (
            <Popup
                latitude={latitude}
                longitude={longitude}
                closeOnClick={false}
                onClose={() => setPopup(false)}
                onOpen={e => setPopup(true)}>
                <div className="map-custom-popup-container">
                    <h2 className="map-custom-popup-header">Vodopadi Kravice</h2>
                    <p className="map-custom-popup-paragraph">Picturesque waterfalls near city of Ljubuški</p>
                    <div className="map-custom-popup-coords">
                        <div>{latitude}</div>
                        <div>{longitude}</div>
                    </div>
                </div>
            </Popup>
        );
    } else {
        return null;
    }
};

const Map = () => {
    return (
        <div>
            <ReactMapGL
                mapLib={import('mapbox-gl')}
                mapboxAccessToken={API_KEY}
                onClick={e => { console.log(e) }}
                initialViewState={{
                    latitude: 45.4211,
                    longitude: -75.6903,
                    zoom: 10
                }}
                style={{ width: '100%', height: '450px' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <CustomMarker latitude={45.42006386841473} longitude={-75.67117355462116} />

            </ReactMapGL>
        </div>
    );
};

export default Map;