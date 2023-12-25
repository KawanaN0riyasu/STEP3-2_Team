import { useEffect, useRef } from 'react';

function Map({ places }) {
    const mapRef = useRef(null);

    useEffect(() => {
        // Google Maps APIのロード
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=自身のAPIキー&libraries=places`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            // Google Maps APIがロードされた後に初期化を行うの
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat: 35.7122544, lng: 139.7892628 }, // 初期表示位置（浅草駅周辺）
              zoom: 15, // ズームレベル
            });

            // placesが存在するか確認してからマーカーの追加を行う
            if (places && places.length > 0) {
                places.forEach(place => {
                    const marker = new window.google.maps.Marker({
                        position: { lat: place.geometry.location.lat, lng: place.geometry.location.lng },
                        map,
                        title: place.name,
                    });
                });
            }
        };
    },[places]); // placesが変更されたときに再実行されるように変更

    return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
}

export default Map;