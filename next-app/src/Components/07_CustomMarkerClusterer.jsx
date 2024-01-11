import React from "react";
import { Marker, MarkerClusterer } from "@react-google-maps/api";

export default function CustomClusterer(){
    const places = [
        { info: "info1", location: { lat: 43, lng: 141}},
        { info: "info2", location: { lat: 43, lng: 141}},
    ];

    const clusterStyles = [
        {
            textColor: "white",
            url: "map.png",
            height: 50,
            width: 50,
        },
        {
            textColor: "white",
            url: "map.png",
            height: 50,
            width: 50,
        },
        {
            textColor: "white",
            url: "map.png",
            height: 50,
            width: 50,
        },
    ];

    const options ={
        gridSize: 50,
        styles: clusterStyles,
        maxZoom: 15,
    };

    return (
        <MarkerClusterer options={options}>
            {(clusterer) =>
                places.map(
                    (marker) =>
                        selectedActivities[marker.activityClass] && (
                            <Marker
                                key={`${marker.location.lat * marker.location.lng}`}
                                clusterer={clusterer}
                                position={{
                                    lat: marker.location.lat,
                                    lng: marker.location.lng,
                                }}
                                icon={{
                                    url: (restaurantsFromLocalStorage.image && restaurantsFromLocalStorage.image > 0) ? restaurantsFromLocalStorage.image : "/map.png",
                                    origin: new window.google.maps.Point(0,0),
                                    anchor: new window.google.maps.Point(15,15),
                                    scaledSize: new window.google.maps.Size(30,30),
                                }}
                            />
                        )
                )
            }
        </MarkerClusterer>
    );
}

