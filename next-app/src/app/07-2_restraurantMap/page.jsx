'use client'
import Map, { MapContext } from '../../components/07_map';
import { useEffect, useState, useRef } from 'react';
import { useGoogleMaps } from '../../components/googleMapsScript'; 
import Mockupphone from '../../components/mockupphone'; //デモ用スマホ画面追加
import BottomAppBar from '../../components/BottomAppBar'; //下部メニューバー追加

function Home({ initialPlaces }) {
    const { isLoaded, loadError, isMounted } = useGoogleMaps();
    const [places, setPlaces] = useState(initialPlaces);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!isLoaded) {
            // Google Maps APIが読み込まれていない場合は何もしない
            return;
        }

        // localStorageからデータを取得
        const storedData = JSON.parse(localStorage.getItem('filteredRestaurants'));
        
        if (storedData) {
            let store = storedData.map((restaurant) => ({
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
            }));
            setPlaces(store);
        } else {
            console.log('店舗情報取得できませんでした');
        }

        // ローディング完了を示すためにloadingをfalseに設定
        setLoading(false);
    }, [isLoaded, isMounted]); // 第二引数が空の場合、マウント時のみ実行

    useEffect(() => {
        // places が変更されたときに再度マップを初期化
        if (isLoaded && places && places.length > 0) {
            console.log('initMap function called');
            // Mapコンポーネントを呼び出し、mapRefも渡す
            const mapComponent = <Map places={places} mapRef={mapRef} />;
            // この変数を任意の箇所で描画するか、またはstateに格納して使います
            console.log('Map component:', mapComponent);
        }
    }, [isLoaded, places]);

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    if (loading) {
        return <div>Loading...</div>; // データ取得中の場合はローディング表示
    }

    return (
        <Mockupphone> {/*デモ用スマホ画面*/}
            <MapContext.Provider value={isMounted}>
                                {/*スマホサイズ(375*800)指定→layout.jsで当てるか調べ中*/}
                                <div className="sm-phone-4">
                                    <Map places={places} />
                                </div>
            </MapContext.Provider>
            <BottomAppBar />{/*下部メニューバー*/}
        </Mockupphone>
    );
}

export default Home;