'use client'
//機能インポート
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useRouter } from 'next/navigation';

//関数・変数定義
let Map;
const infoWindows = useRef([]);

//MAPコンテナスタイル
const containerStyle = {
    height: "100%",
    width: "100%",
    position: "relative",
};

//MAP中心位置
const center = {
    lat: 35.6813489,
    lng: 139.7673068,
};

// librariesを定義
const libraries = ["places"];

//MAP検索設定
export default function SearchMap(){
    const [markerPoint, setMarkerPoint] = useState(center);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: '',
        libraries: libraries,
    });
    const mapRef = useRef(null);
    const [infoWindows, setInfoWindows] = useState([]);
    const router = useRouter();
    const [hasMapDataLoaded, setMapDataLoaded] = useState(false);

    useEffect(() => {
        // これはisLoadedがtrueになったときに一度だけ呼び出されます
        if (isLoaded && !hasMapDataLoaded){
            getMapData();
            setMapDataLoaded(true);
        }
    }, [isLoaded, hasMapDataLoaded]);

    //MAP読み込めない場合の表示
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    async function getMapData() {
        try {
            const geocoder = new google.maps.Geocoder();
            const restaurantsFromLocalStorage = 
                typeof window !== 'undefined' 
                ? JSON.parse(localStorage.getItem("filteredRestaurants")) 
                : null;
            
            let places =
                (restaurantsFromLocalStorage && restaurantsFromLocalStorage.length > 0)
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
            
            if (Array.isArray(places) && places.length === 0) {
                // places が空の場合、東京駅の座標をセット
                places = [
                    {
                        location: {
                            lat: 35.681298,
                            lng: 139.766247,
                        },
                    },
                ];
            }    

            if (places.length > 0) {
                const getLat = places[0].location.lat;
                const getLng = places[0].location.lng;
                const newCenter = {
                    lat: getLat,
                    lng: getLng,
                };
                setMarkerPoint(newCenter);
            
                // 地図が存在しない場合にのみ初期化
                if (!Map) {
                    await getNearshop(getLat, getLng); // awaitを追加してgetNearshopが完了するのを待つ
                }
                // getNearshopが完了した後にcallbackを呼び出す
                callback(places);
            }
        } catch (error) {
            console.error('エラーが発生しました', error);
            alert('エラーが発生しました。詳細はコンソールを確認してください。');
        }
    }

    function getNearshop(lat, lng) {
        try {
            // 地図が存在しない場合のみ初期化
            if (!Map) {
                const pyrmont = new google.maps.LatLng(lat, lng);
                Map = new google.maps.Map(document.getElementById('map'), {
                    center: pyrmont,
                    zoom: 15,
                    zoomControl: false,
                    disableDefaultUI: true,
                });
            }
            console.log('Map:', Map); 
            return Promise.resolve();
        } catch (error) {
            // エラーが発生した場合の処理
            console.error('エラーが発生しました', error);
            alert('エラーが発生しました。詳細はコンソールを確認してください。');
            // エラーが発生した場合はPromise.reject(error)を返すか、適切なエラー処理を行う
            return Promise.reject(error);
        }
    }

    // 検索結果の処理
    function callback(places) {
        const newInfoWindows = [];
        for (let i = 0; i < places.length; i++) {
            const marker = createMarker(places[i]);
            const infoWindow = createInfoWindow(places[i]);
            newInfoWindows.push(infoWindow);

            // マーカーがクリックされた時の処理
            marker.addListener('click', () => {
                closeAllInfoWindows();
                infoWindow.open(mapRef.current, marker);
            });
        }     
        setInfoWindows(newInfoWindows);
    }

    // 検索結果にマーカーを生成
    function createMarker(place) {
        if (!place || !place.location) return;
        //マーカー作成
        const marker = new google.maps.Marker({
            map: Map,
            position: place.location,
            icon: {
                url: place.info.image && place.info.image.length > 0 ? place.info.image : 'URLが見つかりません',
                scaledSize: new google.maps.Size(40, 40)
            },
            optimized: false,
        });

        // 新しい InfoWindow インスタンスを作成し、infoWindows 配列に格納
        const infoWindow = new google.maps.InfoWindow();

        // 施設情報を表示するための情報リスト作成
        const infoList = [
            place.info.name,
            (place.info.image && place.info.image.length > 0) ?
            `<p><img style="max-width:200px" src="${place.info.image}"/></p>` : null,
            `住所：${place.info.address}`,
            `ユーザー評価：${place.info.rating}`,
        ];

        // マーカーがクリックされた時のインフォウィンドウ表示
        const info = infoList.join('<br>');
        google.maps.event.addListener(marker, "click", () => {
            console.log("Marker clicked:", place); 
            infoWindows.close();                        //同じマーカーを再度クリックした場合、前に開いたウィンドウを閉じる
            infoWindows.setContent(info);               //マーカーがクリックされたときに表示情報を更新
            infoWindows.open(marker.getMap(), marker);  //クリックされたマーカーに関連する情報が表示
        });

        // infoWindows 配列に新しい InfoWindow インスタンスを格納
        infoWindows.current.push(infoWindow);
    }

    // ボタンをクリックした時の処理
    function handleCreateBookClick() {
    // 図鑑を作成するための処理をここに追加
        console.log('Create book button clicked!');
        router.push('/03_createZukanList');
    }

    return (
        <div className="mockup-phone">
            <div className="camera"></div> 
            <div className="display">
                <div className="artboard artboard-demo phone-1">

                    <div style={{ height: "100%", width: "100%", position: 'relative' }}>
                        <GoogleMap
                            id="map"
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            zoom={14}
                            center={markerPoint}
                            options={{ disableDefaultUI: true, zoomControl: false}}
                            onLoad={onMapLoad}
                        >
                            <Marker position={markerPoint} />
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    );
};