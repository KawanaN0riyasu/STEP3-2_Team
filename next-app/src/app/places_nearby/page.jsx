'use client'

import React, { useState, useEffect} from 'react';

export default function MyComponent() {
    const [placeNearby, setPlaceNearby] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        try{
            const response = await fetch('http://127.0.0.1:8000/places_nearby');
            const data = await response.json();
            setPlaceNearby(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // データ取得完了またはエラー時にloadingをfalseに設定
        }
    }

    return (
        <div>
            <button
                onClick={fetchData}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007BFF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >検索</button>
            {loading? (
                <p>Loading...</p>
            ):placeNearby ? (
                <pre>{JSON.stringify(placeNearby, null, 2)}</pre>
            ): null}
        </div>
    );
            // JSON.stringify(value, replacer, space);
            // value: 変換するJavaScriptオブジェクトまたは値
            // replacer: JSON文字列を生成する際にプロパティを置き換えるための関数または配列。通常nullを指定して全プロパティを含むようにする
            // space: 出力されるJSON文字列を整形するための空白を表す文字列または数値
}