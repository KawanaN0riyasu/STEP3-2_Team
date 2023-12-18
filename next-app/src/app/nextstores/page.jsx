import React, { useState, useEffect} from 'react';

const Stores = () =>{
    const [image, setImage] = useState(null);
    
    //コンポーネントのマウント時に画像をフェッチ
    useEffect(() =>{
        fetchImage();
    },[]);

    //画像を非同期でフェッチする関数
    const fetchImage = async () => {
        // APIから画像取得
        const response = await fetch('http://localhost:5000/api/get-image');
        // レスポンスをblob形式で取得
        const blob = await response.blob();
        // blobをBase64形式に変換
        const imageBase64 = URL.createObjectURL(blob);
        // imageのstateを更新
        setImage(imageBase64);
    };

    //画像が存在する場合はimgタグで表示
    return (
        <div>
            {image && <img src={image} alt="Fetched Image"/>}
        </div>
    );
} ;

// コンポーネントを "use client" でマーク
Stores.useClient = true;

export default Stores;

//async function fetchTest() {
    // fetch():指定URLにHTTPリクエストし、Response オブジェクトを返す
    // await  :非同期処理を同期的に扱う処理
//    const staticData = await fetch(`http://127.0.0.1:8000/store`);
//    return staticData.json();
//}

//export default async function Page() {
//    const stores = await fetchTest();
//    return <pre>{JSON.stringify(stores, null, 2)}</pre>
                // JSON.stringify(value, replacer, space);
                    // value: 変換するJavaScriptオブジェクトまたは値
                    // replacer: JSON文字列を生成する際にプロパティを置き換えるための関数または配列。通常nullを指定して全プロパティを含むようにする
                    // space: 出力されるJSON文字列を整形するための空白を表す文字列または数値
//}