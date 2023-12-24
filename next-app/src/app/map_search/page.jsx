'use client'
import Map from '../../components/Map';
import { useEffect, useState } from 'react';

function Home({ initialPlaces }) {
  const [places, setPlaces] = useState(initialPlaces);

  useEffect(() => {
    // クライアントサイドでのデータ取得
    async function fetchData() {
      const response = await fetch('http://localhost:8000/places_nearby');
      const data = await response.json();
      setPlaces(data);
    }

    fetchData();
  }, []); // 第二引数が空の場合、マウント時のみ実行

  return (
    <div>
      <h1>Places Near You</h1>
      <Map places={places} />
    </div>
  );
}

export default Home;