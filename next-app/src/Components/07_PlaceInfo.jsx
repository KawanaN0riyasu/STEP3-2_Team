import React, { useState } from 'react';
import { Marker, InfoWindow } from "@react-google-maps/api";

export default function PlaceInfo(){
    // 店舗データ取得
    const restaurantsFromLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("filteredRestaurants")) : null;
    console.log("Restaurants from localStorage:", restaurantsFromLocalStorage);
    
    const places = (restaurantsFromLocalStorage && restaurantsFromLocalStorage.length > 0)
        ? restaurantsFromLocalStorage.map((restaurant) => ({
            info: {
                name: restaurant.name || "Default Name",
                image: restaurant.image || null,
                address: restaurant.address || "Default Address",
                rating: restaurant.rating || "Default Rating",
            },
            location: {
                lat: restaurant.lat || 0,
                lng: restaurant.lng || 0,
            },
        }))
        : [];

    console.log("places:", places);

    places.forEach((marker) => {
        console.log("Image URL:", marker.info.image);
    });

    const [selected, setSelected] = useState(null);

    return(
        <>
            {places.map((marker) => (
                <Marker
                    key={`${marker.location.lat * marker.location.lng}`}
                    position={{
                        lat: marker.location.lat,
                        lng: marker.location.lng,
                    }} 
                    onMouseOver={() => {
                        setSelected(marker);
                        //マウスオーバーでInfoWindowを描画
                    }}
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(15,15),
                        scaledSize: new google.maps.Size(30, 30),
                        //path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        strokeWeight: 1,
                        strokeColor: '#fff',
                        fillColor: '#f00',
                        fillOpacity: 1
                        //アイコン表示設定
                    }}
                />
            ))}

            {selected ? (
                <InfoWindow
                    position={{
                        lat: selected.location.lat,
                        lng: selected.location.lng,
                    }}
                    onCloseClick={() => {
                        setSelected(null);
                    }}
                >
                    <div>
                        <p>店名: {selected.info.name}</p>
                        {selected.info.image &&  <img src={selected.info.image} alt="店舗画像" />}
                        <p>ユーザー評価: {selected.info.rating}</p>
                    </div>
                </InfoWindow>
            ) : null}
        </>
    );
}