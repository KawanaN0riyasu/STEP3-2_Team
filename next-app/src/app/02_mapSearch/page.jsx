'use client'
//機能インポート
import React, { useCallback, useRef, useState} from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import sendSearchDataToServer from '../../components/toFastAPI';
import { useRouter } from 'next/navigation';

//関数・変数定義
let Map;

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
    const [searchWord, setSearchWord] = useState('');
    const [markerPoint, setMarkerPoint] = useState(center);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCzCWRo1T8I6JC_9C9LTafNKR_A-8W_VC4',
        libraries: libraries,
    });
    const mapRef = useRef();
    const infoWindows = useRef([]);
    const onMapLoad = useCallback((map) => {mapRef.current = map;}, []);
    const [showCreateBookButton, setShowCreateBookButton] = useState(false);
    const router = useRouter();

    //MAP読み込めない場合の表示
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    async function getMapData() {
        try {
            const geocoder = new google.maps.Geocoder();
            let results;

            if (searchWord.trim() === '') {
                // searchWord が空の場合、東京駅の座標をセット
                results = [
                    {
                        geometry: {
                            location: {
                                lat: 35.681298,
                                lng: 139.766247,
                            },
                        },
                    },
                ];
            } else {
                // searchWord がある場合、geocode を実行
                results = await new Promise((resolve, reject) => {
                    geocoder.geocode({ address: searchWord }, (results, status) => {
                        if (status === 'OK') {
                            resolve(results);
                        } else {
                            // エラーでも resolve にすることで reject にならないようにする
                            resolve([]);
                        }
                    });
                });
            }    

            if (results.length > 0) {
                const getLat = results[0].geometry.location.lat();
                const getLng = results[0].geometry.location.lng();
                const newCenter = {
                    lat: getLat,
                    lng: getLng,
                };
                setMarkerPoint(newCenter);
                getNearshop(getLat, getLng);
            }

        } catch (error) {
            console.error('エラーが発生しました', error);
            alert('エラーが発生しました。詳細はコンソールを確認してください。');
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
                zoom: 15,
                zoomControl: false,
                disableDefaultUI: true,
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
            // コンソールに結果を出力
            console.log(results);

            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }        
            // 検索結果が得られたら、サーバーにデータを送信
            // データの整形
            const formattedResults = results.map(place => {
                //画像URLの取得
                let imageUrl = null;
                if (place.photos && place.photos.length > 0) {
                    imageUrl = place.photos[0].getUrl();
                    console.log('Image URL:', imageUrl);
                } else {
                    console.log('No image available for this place.');
                }

                return {
                    GMid: place.place_id,
                    name: place.name,
                    image: imageUrl,
                    status: place.business_status,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    address: place.vicinity,
                    rating: place.rating,
                    // 他に必要な情報を追加できます
                };
            });

            //  localStorageに整形データを保存する。
            localStorage.setItem("searchList", JSON.stringify(formattedResults))
            // 「図鑑作成」ボタンを表示する。
            setShowCreateBookButton(true);
            // 整形データをサーバーに送る。
            sendSearchDataToServer(formattedResults);
        }
    }

    // localStorageに格納したデータの確認
    const storedData = localStorage.getItem("searchList");

    if (storedData) {
        // localStorageにデータが存在する場合
        let parsedData;
        try {
            parsedData = JSON.parse(storedData);
            console.log("localStorageにあるデータ:", parsedData);
        } catch (error) {
            console.error('JSONパースエラー:', error);
        }
    } else {
        // localStorageにデータが存在しない場合
        console.log("localStorageにデータがありません");
    }

    // 検索結果にマーカーを生成
    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;
        //マーカー作成
        const marker = new google.maps.Marker({
            map: Map,
            position: place.geometry.location,
            icon: {
                url: place.photos && place.photos.length > 0 ? place.photos[0].getUrl() : 'URLが見つかりません',
                scaledSize: new google.maps.Size(40, 40)
            },
            optimized: false,
        });
        // インフォウィンドウ初期化
        infoWindows[0] = new google.maps.InfoWindow();

        // 施設情報を表示するための情報リスト作成
        const infoList = [
            place.name,
            (place.photos && place.photos.length > 0) ?
            `<p><img style="max-width:200px" src="${place.photos[0].getUrl()}"/></p>` : null,
            `住所：${place.vicinity}`,
            `種類：${place.types.join(',')}`,
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
                    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '100' }}>
                        <div style={{ margin: 'auto', marginTop: '50px', display: 'flex', alignItems: 'center', background: 'white', width: '80%', height: '50px', borderRadius: '5px', padding: '10px 10px', border: '1px solid #ccc' }}>
                            <input
                                id="standard-basic"
                                label="今日何食べる？"
                                type="text"
                                value={searchWord}
                                onChange={(e) => setSearchWord(e.target.value)}
                                style={{ flex: 1, marginRight: '10px', border: '1px solid gray', outline: 'none', width: '80%', padding: '3px' }}
                            />
                            <button
                                type="button"
                                onClick={async() => await getMapData()}
                                style={{ background: '#FFA500', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 20px', cursor: 'pointer' }}
                            >
                                検索
                            </button>
                        </div>
                    </div>
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
                        {/* 図鑑作成ボタン */}
                        {showCreateBookButton && (
                            <div style={{ position: 'absolute', bottom: '30px', right: '20px', zIndex: '100' }}>
                                <button
                                    type="button"
                                    onClick={handleCreateBookClick}
                                    style={{ background: '#FFA500', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 20px', cursor: 'pointer' }}
                                >
                                    リストを見る
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};