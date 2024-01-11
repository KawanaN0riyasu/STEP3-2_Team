'use client'
import React, { useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import PlaceInfo from "../../components/07_PlaceInfo";
import CustomClusterer from "../../components/07_CustomMarkerClusterer";

const libraries = ["places"];
const mapApiKey = 'AIzaSyCzCWRo1T8I6JC_9C9LTafNKR_A-8W_VC4'; 

const containerStyle = {
    height: "100vh",
    width: "100%",
    position: "relative",
};

const options = {
    disableDefaultUI: true,
    zoomControl: false,
};

export default function GoogleMapComponent(){
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: mapApiKey,
        libraries: libraries,
    });

    const mapRef = useRef();
    const [center, setCenter] = useState({ lat: 35.6813489, lng: 139.7673068 });
    const [zoom, setZoom] = useState(15);

    useEffect(()=>{
        const restaurantsFromLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("filteredRestaurants")) : null;

        if (restaurantsFromLocalStorage && restaurantsFromLocalStorage.length > 0) {
            // 最初の店舗の位置をセンターに設定
            const firstRestaurant = restaurantsFromLocalStorage[0];
            setCenter({
                lat: firstRestaurant.lat || 0,
                lng: firstRestaurant.lng || 0,
            });
        }
    }, []); 

    
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    //useStateを使うとAPI読み込み後に再レンダーが発生するためuseRef,useCallbackを使う。

        // マップが移動またはズームしたときにセンター位置とズームレベルを更新
        const updateCenterAndZoom = () => {
            const newCenter = {
                lat: mapRef.current.getCenter().lat(),
                lng: mapRef.current.getCenter().lng(),
            };
        
            const newZoom = mapRef.current.getZoom();

            if (newCenter.lat !== center.lat || newCenter.lng !== center.lng || newZoom !== zoom) {
                // 既に設定されている center と新しい center が同じでない場合にのみ更新
                if (newCenter.lat !== center.lat || newCenter.lng !== center.lng) {
                    setCenter(newCenter);
                }
                // 既に設定されている zoom と新しい zoom が同じでない場合にのみ更新
                if (newZoom !== zoom) {
                    setZoom(newZoom);
                }
            }
        };

        // マップが移動したときにセンター位置とズームレベルを更新
        mapRef.current.addListener('center_changed', updateCenterAndZoom);

        // マップがズームしたときにもセンター位置とズームレベルを更新
        mapRef.current.addListener('zoom_changed', updateCenterAndZoom);
    }, [center, zoom]);

    
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return(
        <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center ={center}
            zoom ={zoom}
            options={options}
            onLoad ={onMapLoad}
        >
            {isLoaded && <PlaceInfo  center={center} />}
        </GoogleMap>
    );
}