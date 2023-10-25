import React from "react";
import {
    GoogleMap,
    MarkerF,
    InfoWindowF,
  } from "@react-google-maps/api";
import gymIcon from "../../assets/gymIcon.png";
import { memo } from "react";


function MapComponent({ filteredStudiosList }) {
    const [center, setCenter] = React.useState({ lat: 32.0853, lng: 34.7818 });
    const [activeMarker, setActiveMarker] = React.useState(null);
    //satate and constants to record specific area or region that users are currently viewing on the map (for the report)
    const [mapref, setMapRef] = React.useState(null);
    const north = [32.098178, 32.119506, 34.777687, 34.808425];
    const oldNorth = [32.079931, 32.098293, 34.766988, 34.801437];
    const centerArea = [32.064933, 32.078618, 34.760811, 34.792570];
    const south = [32.038641,32.064615, 34.745923, 34.787091];
    const telAvivNeighborhood = [north, oldNorth, centerArea, south];
  

    const handleMarkerClick = (marker) => {
        setActiveMarker(marker);
        //incremant click counter 
        const data = {
            "name" : marker.name
        };
        fetch('/api/inc_number_of_clicks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
            })
            .then(response => response.json())
    };
    
    const handleInfoWindowClose = () => {
        setActiveMarker(null);
    };

    //This function loads a reference to the map 
    const handleMapOnLoad = map => {
        setMapRef(map);
    };

    /*
        This function records the specific area or region of the map that the user is currently viewing
        in Tel-Aviv,and storing this information for the report.
    */
    function mapDragHandler(){
        const newCenter = mapref.getCenter();
        var lat = newCenter.lat();
        var lng = newCenter.lng();
        setCenter({lat:lat, lng:lng});
        for(var i=0; i < telAvivNeighborhood.length; i++){
        if(lat >= telAvivNeighborhood[i][0] && lat <= telAvivNeighborhood[i][1] && lng >= telAvivNeighborhood[i][2] && lng <= telAvivNeighborhood[i][3]){
            fetch('/api/inc_region', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"region":i})
            })
            .then(response => response.json())
        }
        }  
    }
    
    return (
        <div>
            <GoogleMap
            zoom={15}
            center={center}
            mapContainerClassName="map-container"
            onLoad={handleMapOnLoad}
            onDragEnd={mapDragHandler}
            >
                {filteredStudiosList.map((s) => (
                <MarkerF
                    key={s.name}
                    position={{ lat: s.latCoordinate, lng: s.lngCoordinate }}
                    onClick={() => handleMarkerClick(s)}
                    icon={{
                    url: gymIcon,
                    scaledSize: new window.google.maps.Size(35, 35),
                    }}
                />
                ))}

                {activeMarker && (
                <InfoWindowF
                    options={{
                    pixelOffset: new window.google.maps.Size(0, -38),
                    }}
                    position={{
                    lat: activeMarker.latCoordinate,
                    lng: activeMarker.lngCoordinate,
                    }}
                    onCloseClick={() => handleInfoWindowClose()}
                >
                    <div className="map-info-window">
                        <h3>{activeMarker.name}</h3>
                        <h3>{activeMarker.addressString}</h3>
                        <p>{activeMarker.description}</p>
                    </div>
                </InfoWindowF>
                )}
            </GoogleMap>            
        </div>
    );
}
  
export default memo(MapComponent);