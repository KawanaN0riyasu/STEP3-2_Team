import React, { useEffect, useRef, useContext } from 'react';
import { useGoogleMaps } from '../components/googleMapsScript';

// コンテキストの作成
const MapContext = React.createContext();

function Map({ places }) {
    const mapRef = useRef(null); 
    const isMounted = useRef(true);
    const { isLoaded, loadError } = useGoogleMaps();

    // useContextでコンテキストの値を取得
    const shouldLoadScript = useContext(MapContext);

    if (loadError) {
        return <div>Error loading Google Maps: {loadError.message}</div>;
    }

    useEffect(() => {
        console.log('useEffect called');

        const initMap = () => {
            if (isMounted.current){
                console.log('initMap function called');

                // マップの初期設定
                const map = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 35.7122544, lng: 139.7892628 },
                    zoom: 15,
                    zoomControl: false,
                    disableDefaultUI: true,
                });

                // マーカーが存在する場合に、境界ボックスを計算
                if (places && places.length > 0) {
                    const bounds = new window.google.maps.LatLngBounds();
                    places.forEach(place => {
                        const markerPosition = new window.google.maps.LatLng(place.location.lat, place.location.lng);
                        bounds.extend(markerPosition);
                        addMarker(map, place);
                    });

                    // マーカーが収まるように地図を調整
                    map.fitBounds(bounds);
                } else {
                    // マーカーが存在しない場合のデフォルト位置
                    map.setCenter({ lat: 35.7122544, lng: 139.7892628 });
                    map.setZoom(15);
                }

                // 地図の初期化時にサイズを指定
                mapRef.current.style.height = '503px';
                mapRef.current.style.width = '100%';

                isMounted.current = false;
            }
        };

        const addMarker = (map, place) => {
            // アイコンの色を指定
            const markerColor = place.info.rating > 4 ? 'green' : 'red';

            // マーカーに情報ウィンドウを追加
            const infoWindow = new window.google.maps.InfoWindow({
                content: `<div><strong>${place.info.name}</strong><br>${place.info.address}<br>ユーザー評価：${place.info.rating}</div>`,
            });

            // マーカーアイコンの設定
            const markerIcon = `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`;

            // マーカーの作成
            const marker = new window.google.maps.Marker({
                position: { lat: place.location.lat, lng: place.location.lng },
                map,
                title: place.info.name,
                icon: {
                    url: markerIcon,
                },
            });

            // マーカーにマウスオーバーイベントを追加
            marker.addListener('mouseover', () => {
                infoWindow.open(map, marker);
            });

            // マーカーにマウスアウトイベントを追加
            marker.addListener('mouseout', () => {
                infoWindow.close();
            });
            
        };
        // shouldLoadScriptがtrueで、isLoadedがtrueのときのみ実行
        if (shouldLoadScript && isLoaded && places && places.length > 0) {
            initMap();
        }
    }, [shouldLoadScript, isLoaded, places, mapRef]);

    return <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />;
}

export { MapContext }; // コンテキストのエクスポート
export default Map;