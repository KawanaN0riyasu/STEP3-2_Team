'use client'
import Map from '../../components/07_map';
import { useEffect, useState } from 'react';

function Home({ initialPlaces }) {
    const [places, setPlaces] = useState(initialPlaces);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, []); // 第二引数が空の場合、マウント時のみ実行

    if (loading) {
        return <div>Loading...</div>; // データ取得中の場合はローディング表示
    }

    return (
        <div className="mockup-phone">
        <div className="camera"></div> 
        <div className="display">
          <div className="artboard artboard-demo phone-1">
            <div style={{ backgroundColor: "#FCAA00", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/*スマホサイズ(375*800)指定→layout.jsで当てるか調べ中*/}
              <div className="sm-phone-4">
                <Map places={places} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;