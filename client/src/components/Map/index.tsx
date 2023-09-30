import {useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.scss";
import mainImage from "../../assets/main-section-image.jpg";

const API_KEY = 'pk.eyJ1Ijoia2VuYW44NSIsImEiOiJjbG11c2drMTQwZm9zMnJ2emtyZHZqZnBjIn0.I__aD3NUpPqMt1DWjFA6LQ';

interface CustomMarkerProps {
    latitude: number,
    longitude: number
}

const CustomMarker = ({ latitude, longitude }: CustomMarkerProps) => {

    return (
        <Marker longitude={longitude} latitude={latitude}>
            <div style={{width: '100px', height: '100px'}}>
                <img src={mainImage} alt="img" height="100px" width="100px" style={{
                    borderRadius: '50%',
                    backgroundSize: 'cover',
                    border: '5px solid',
                }}/>
            </div>
        </Marker>
    );
}

const Map = () => {

    const [popup, setPopup] = useState(true)

    return (
        <div>
            <ReactMapGL
                mapLib={import('mapbox-gl')}
                mapboxAccessToken={API_KEY}
                onClick={e => {console.log(e)}}
                initialViewState={{
                    latitude: 45.4211,
                    longitude: -75.6903,
                    zoom: 13
                }}
                style={{width: '100vw', height: '70vh'}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <CustomMarker latitude={45.42006386841473} longitude={-75.67117355462116} />

                {
                    // popup se prikaze umjesto markera nakon klika na njeg
                    popup && (
                        <Popup
                            longitude={-75.6903}
                            latitude={45.4211}
                            closeOnClick={false}
                            onClose={() => setPopup(false)}
                            onOpen={e => {}}
                        >
                            <div className="mapboxgl-popup-content" style={{ width: 150, height: 100 }}>
                                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{ flexGrow: .5 }} />
                                        <h2 style={{fontWeight: 'unset', fontSize: '.5rem'}}>
                                            Picturesque waterfalls near city of Ljubuški
                                        </h2>
                                        <h1>Vodopadi Kravice</h1>
                                        <div style={{ flexGrow: .5 }} />
                                        <button>sskjsk</button>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    )
                }
            </ReactMapGL>
        </div>
    );
};

export default Map;