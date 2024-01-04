'use client'
import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import photoUPImage from '/public/photo_up.png';
import { useRouter } from 'next/navigation';

const registerZukan = (e) => {
  const[zukan_name, setName] =useState("浅草あんみつ")
  const[zukan_memo, setMemo] =useState("東京に友達が来た時、一緒に行くあんみつ屋さんまとめ図鑑。有名どころ&老舗多め。")
  const router = useRouter();
  const [parsedData, setParsedData] = useState([]);

  const fetchData = async () => {
    const registerList = localStorage.getItem("registerList");
    if (registerList) {
      try {
        const parsedDataFromLocalStorage = JSON.parse(registerList);
        console.log("localStorageにあるデータ:", parsedDataFromLocalStorage);
        setParsedData(parsedDataFromLocalStorage);
        await fetch("http://localhost:8000/restaurants",{
          method:"POST",
          headers:{"Content-Type": "application/json" },
          body: JSON.stringify(parsedDataFromLocalStorage),
        })
      } catch (error) {
        console.error('JSONパースエラー:', error);
      }
    } else {
      // localStorageにデータが存在しない場合
      console.log("localStorageにデータがありません");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const zukanSubmit = async (e) => {
    e.preventDefault();
    console.log("送信するデータ:", {
      zukan_name: zukan_name,
      zukan_image: null,
      zukan_memo: zukan_memo,
    });

    try{
      await fetch("http://localhost:8000/zukans",
      {
        method:"POST",
        headers:{"Content-Type": "application/json" },
        body: JSON.stringify([
          {
            zukan_name: zukan_name,
            zukan_image: null,
            zukan_memo: zukan_memo,
          }
        ]),
      });
    }catch(err){
      console.error("エラー:", err);
    }
  };

  return (
  <div className="grid">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={zukanSubmit}>
      <div className="m-3 grid-item gap-4">
        <p>作成日：</p>
      </div>
      <div className="m-3 grid-item gap-4">
        <input  className="input input-bordered w-full max-w-xs" value={zukan_name} onChange={(e)=>setName(e.target.value)} type="text" name="zukan_name" placeholder="図鑑名を入力" required/>
      </div>
      <div className="m-3 grid-item gap-4 item-center">
        <Image className="md:block" src={photoUPImage} alt="アップロード" loading="eager" priority />
      </div>
      <div className="m-3 grid-item">
        <input  className="textarea textarea-bordered textarea-lg w-full max-w-xs" value={zukan_memo} onChange={(e)=>setMemo(e.target.value)} type="text" name="zukan_memo" placeholder="メモを入力" required/>
      </div>
      <div className="m-3 grid-item">
      <button className="btn btn-wide btn-warning" type="submit">図鑑登録する</button>
      </div>
    </form>
  </div>
  )
}

export default registerZukan