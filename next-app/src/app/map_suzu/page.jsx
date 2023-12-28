'use client'
import { useCallback, useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  height: "100vh",
  width: "358px",
  position: "relative", // Relative position for containing absolutely positioned elements
};
//東京駅を真ん中に
const center = {
  lat: 35.6813489,
  lng: 139.7673068,
};

let Map;
let infoWindows = [];

export default function SearchMap() {
  const [searchWord, setSearchWord] = useState('');
  const [markerPoint, setMarkerPoint] = useState(center);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'APIキーを入れてください',
    libraries: ["places"],
  });
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  async function getMapData() {
    try {
      const geocoder = new google.maps.Geocoder();
      let getLat = 0;
      let getLng = 0;
  
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: searchWord }, (results, status) => {
          if (status === 'OK' && results) {
            getLat = results[0].geometry.location.lat();
            getLng = results[0].geometry.location.lng();
            const newCenter = {
              lat: getLat,
              lng: getLng
            };
            setMarkerPoint(newCenter);
            getNearshop(getLat, getLng);
            resolve(results);
          } else {
            reject(new Error('住所情報が見つかりませんでした'));
            const newCenter = {
              lat: center.lat,
              lng: center.lng
            };
            setMarkerPoint(newCenter);
            getNearshop(newCenter.lat, newCenter.lng);
          }
        });
      });
    } catch (error) {
      alert('住所情報がなかったため、東京駅を中心に検索します');
      throw error;
    }
  }

  function getNearshop(lat, lng) {
    try {
      if (!document.getElementById('map')) {
        return;
      }
      const pyrmont = new google.maps.LatLng(lat, lng);
      Map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 17
      });

      const request = {
        location: pyrmont,
        radius: 1000,
        type: "restaurant",
        keyword: searchWord,
      };
      const service = new google.maps.places.PlacesService(Map);
      service.nearbySearch(request, callback);
    } catch (error) {
      alert('エラーが発生しました');
      throw error;
    }
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map: Map,
      position: place.geometry.location,
      title: place.name,
      label: place.name?.substr(0, 1),
      optimized: false,
    });

    infoWindows[0] = new google.maps.InfoWindow();

    const price = place.price_level ? place.price_level : '取得できませんでした';

    const infoList = [
      place.name,
      `ランク：${place.rating}`,
      `金額：${price}`,
      (place.photos && place.photos.length > 0) ?
        `<p><img style="max-width:200px" src="${place.photos[0].getUrl()}"/></p>` : null
    ];

    const info = infoList.join('<br>');
    google.maps.event.addListener(marker, "click", () => {
      if (infoWindows[1]) infoWindows[1].close();
      if (!infoWindows[0]) return;
      infoWindows[0].close();
      infoWindows[0].setContent(info);
      infoWindows[0].open(marker.getMap(), marker);
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
          onClick={async () => await getMapData()}
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
}
