'use client'

//機能インポート
import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

//関数・変数定義
let Map = null;
//MAPコンテナスタイル
const containerStyle = {
    height: "100vh",
    width: "358px",
    position: "relative",
};
//MAP中心位置
const center = {
    lat: 35.6813489,
    lng: 139.7673068,
};

//MAP検索設定
export default function SearchMap(){
    const [searchWord, setSearchWord] = useState('');
    const [markerPoint, setMarkerPoint] = useState(center);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'APIキー',
        libraries: ["places"],
    });
    const mapRef = useRef();
    const infoWindows = useRef([]);
    const onMapLoad = useCallback((map) => {mapRef.current = map;}, []);

    //MAP読み込めない場合の表示
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    async function getMapData() {
        //getLat,getLng初期化
        let getLat = 0;
        let getLng = 0;
        try {
            const geocoder = new google.maps.Geocoder();
            const results = await new Promise((resolve, reject) => {
                geocoder.geocode({ address: searchWord }, (results, status) => {
                    if (status === 'OK' && results) {
                        resolve(results);
                    } else {
                        reject(new Error('Geocode failed'));
                    }
                });
            });
            if (results.length > 0) {
                getLat = results[0].geometry.location.lat();
                getLng = results[0].geometry.location.lng();
                const newCenter = {
                    lat: getLat,
                    lng: getLng,
                };
                setMarkerPoint(newCenter);
                getNearshop(getLat, getLng);
            }
        } catch (error) {
            alert('エラーが発生しました');
            throw error;
        }
    }

    function getNearshop(lat, lng) {
        try {
            //地図が存在しない場合は処理を中断
            if (!document.getElementById('map')) {
                return;
            }

            // 検索対象の位置を LatLng オブジェクトとして作成
            const pyrmont = new google.maps.LatLng(lat, lng);
            
            // 地図を作成し、指定された位置を中心に表示
            Map = new google.maps.Map(document.getElementById('map'), {
                center: pyrmont,
                zoom: 17
            });
            
            // 検索パラメータ設定
            const request = {
                location: pyrmont,   // 検索基準の位置
                radius: 1000,        // 検索半径（メートル単位）
                language:"ja",
                type: "restaurant",  // 検索対象の施設の種類
                keyword: searchWord, // 検索キーワード
            };
            
            // Google Places API を使用して近くの施設を検索
            const service = new google.maps.places.PlacesService(Map);
            service.nearbySearch(request, callback);

        } catch (error) {
            // エラーが発生した場合の処理
            console.error('エラーが発生しました', error);
            alert('エラーが発生しました。詳細はコンソールを確認してください。');
        }
    }

    // 検索結果の処理
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    // 検索結果にマーカーを生成
    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;
        //マーカー作成
        const marker = new google.maps.Marker({
            map: Map,
            position: place.geometry.location,
            title: place.name,
            label: place.name?.substr(0, 1),
            //optimized: false,
        });
        // インフォウィンドウ初期化
        infoWindows[0] = new google.maps.InfoWindow();

        // 施設情報を表示するための情報リスト作成
        const price = place.price_level ? place.price_level : '取得できませんでした';
        const infoList = [
            place.name,
            `ランク：${place.rating}`,
            `金額：${price}`,
            (place.photos && place.photos.length > 0) ?
            `<p><img style="max-width:200px" src="${place.photos[0].getUrl()}"/></p>` : null
        ];

        // マーカーがクリックされた時のインフォウィンドウ表示
        const info = infoList.join('<br>');
        google.maps.event.addListener(marker, "click", () => {
            if (infoWindows[1]) infoWindows[1].close();    //複数のマーカーがクリックされたとき前のウィンドウを閉じる
            if (!infoWindows[0]) return;                   //ウィンドウが存在しない場合は何もせずに終了
            infoWindows[0].close();                        //同じマーカーを再度クリックした場合、前に開いたウィンドウを閉じる
            infoWindows[0].setContent(info);               //マーカーがクリックされたときに表示情報を更新
            infoWindows[0].open(marker.getMap(), marker);  //クリックされたマーカーに関連する情報が表示
        });
    }

    return (
        <div>
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '100' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'white', width: '320px', height: '83px', borderRadius: '5px', padding: '0 10px', border: '1px solid #ccc' }}>
                <input
                    id="standard-basic"
                    label="今日何食べる？"
                    type="text"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    style={{ flex: 1, marginRight: '10px', border: '1px solid gray', outline: 'none', width: '260px', padding: '8px' }}
                />
                <button
                    type="button"
                    onClick={async() => await getMapData()}
                    style={{ background: '#FFA500', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}
                >
                    検索
                </button>
            </div>
            </div>
            <div style={{ height: "70vh", width: "100%", position: 'relative' }}>
                <GoogleMap
                    id="map"
                    mapContainerStyle={containerStyle}
                    zoom={17}
                    center={markerPoint}
                    options={{ disableDefaultUI: true, zoomControl: true }}
                    onLoad={onMapLoad}
                >
                    <Marker position={markerPoint} />
                </GoogleMap>
            </div>
        </div>
    );
};