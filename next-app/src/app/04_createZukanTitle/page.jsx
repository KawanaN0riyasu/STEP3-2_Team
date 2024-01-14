'use client'
import React, {useState} from 'react';
import Image from 'next/image'
import photoUPImage from '/public/photo_up.png';
import { useRouter } from 'next/navigation';
import Mockupphone from '../../components/mockupphone'; //デモ用スマホ画面追加
import BottomAppBar from '../../components/BottomAppBar'; //下部メニューバー追加

const registerZukan = (e) => {
  const[zukan_name, setName] =useState("")
  const[zukan_memo, setMemo] =useState("")
  const router = useRouter();
  const [parsedData, setParsedData] = useState([]);
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  // localStorageの利用可能性を確認
  const parsedDataFromLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("registerList")) : null;


  const zukanSubmit = async (e) => {
    e.preventDefault();
    console.log("送信する図鑑データ:", {
      zukan_name: zukan_name,
      zukan_image: null,
      zukan_memo: zukan_memo,
    });

    console.log("送信する店舗データ:", parsedDataFromLocalStorage);
    setParsedData(parsedDataFromLocalStorage);

    try{
      const responseZukan = await fetch("http://localhost:8000/zukans", {
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

      if (!responseZukan.ok) {
        throw new Error(`Zukan APIエラー: ${responseZukan.status}`);
      }

      const responseRestaurants = await fetch("http://localhost:8000/restaurants",{
        method:"POST",
        headers:{"Content-Type": "application/json" },
        body: JSON.stringify(parsedDataFromLocalStorage),
      });

      if (!responseRestaurants.ok) {
        throw new Error(`Restaurants APIエラー: ${responseRestaurants.status}`);
      }

      localStorage.removeItem("registerList");
      router.push('/05_zukanList');

    }catch(err){
      console.error("エラー:", err);
    }
  };

  return (
    <Mockupphone> {/*デモ用スマホ画面*/}
          <div style={{  position: 'absolute', bottom: '0', width: '100%', zIndex: '100' }}>
              <BottomAppBar />{/*下部メニューバー*/}
          </div>
          <form className="pt-8" onSubmit={zukanSubmit}>
            <div className="m-3 grid-item gap-4">
              <p>作成日：{formattedDate}</p>
            </div>
            <div className="m-3 grid-item gap-4">
              <input  className="input input-bordered w-full max-w-xs" value={zukan_name} onChange={(e)=>setName(e.target.value)} type="text" name="zukan_name" placeholder="図鑑名を入力" required/>
            </div>
            <div className="m-3 grid-item gap-4 item-center">
              <Image 
                className="md:block" 
                src={photoUPImage} 
                alt="アップロード" 
                loading="eager" 
                priority
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
            <div className="m-3 grid-item">
              <input  className="textarea textarea-bordered textarea-lg w-full max-w-xs" value={zukan_memo} onChange={(e)=>setMemo(e.target.value)} type="text" name="zukan_memo" placeholder="メモを入力" required/>
            </div>
            <div className="m-3 grid-item" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-warning" type="submit" style={{color:'white',marginLeft:'auto',background: '#FFA500'}}>登録する</button>
            </div>
          </form>

    </Mockupphone>
  );
}

export default registerZukan