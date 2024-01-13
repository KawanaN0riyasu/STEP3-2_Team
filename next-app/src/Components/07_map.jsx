import { useEffect, useRef } from 'react';

function Map({ places }) {
    const mapRef = useRef(null);

    useEffect(() => {
        const loadMapScript = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCzCWRo1T8I6JC_9C9LTafNKR_A-8W_VC4&libraries=places&callback=initMap`;
                script.async = true;

                script.onload = () => {
                    // Google Maps APIがロードされた後に初期化を行う
                    initMap();
                };

                document.head.appendChild(script);
            } else {
                // window.googleが既に存在する場合は直接初期化を行う
                initMap();
            }
        };

        const initMap = () => {
            console.log('initMap function called');
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 35.7122544, lng: 139.7892628 },
                zoom: 15,
            });

            // 地図の初期化時にサイズを指定
            mapRef.current.style.height = '500px';
            mapRef.current.style.width = '100%';

            if (places && places.length > 0) {
                places.forEach(place => {
                    addMarker(map, place);
                });
            }
        };

        const addMarker = (map, place) => {
            const marker = new window.google.maps.Marker({
                position: { lat: place.location.lat, lng: place.location.lng },
                map,
                title: place.name,
            });
        };

        loadMapScript();
    }, [places]);

    return <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />;
}

export default Map;