'use client'
import React, {useState, useEffect}  from 'react';
import { useRouter } from 'next/navigation';
import ReactDOM from 'react-dom'
import Mockupphone from '../../components/mockupphone'; //デモ用スマホ画面追加
import BottomAppBar from '../../components/BottomAppBar'; //下部メニューバー追加


const Card = () => {
  const [parsedData, setParsedData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const router = useRouter();


  // ローカルストレージからデータを取得する関数
  useEffect(() => {
    const searchList = localStorage.getItem("searchList");
    if (searchList) {
      // localStorageにデータが存在する場合
      try {
        const parsedDataFromLocalStorage = JSON.parse(searchList);
        setParsedData(parsedDataFromLocalStorage);

        // 初期状態で全てのチェックボックスをONにする
        setCheckedItems(Array(parsedDataFromLocalStorage.length).fill(true));

      } catch (error) {
          console.error('JSONパースエラー:', error);
      }
    } else {
      // localStorageにデータが存在しない場合
      console.log("localStorageにデータがありません");
    }
  }, []); // マウント時にのみ実行

  const handleCheckboxChange = (index) => {
    // チェックボックスの状態を更新
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  // 『検索MAPに戻る』ボタンをクリックした時の処理
  function handleReturnClick() {
    // 図鑑を作成するための処理をここに追加
    console.log('Return button clicked!');
    router.push('/02_mapSearch');
  }
  
  // ポップアップの表示制御
  const showConfirmationPopup = () => {
    setConfirmationVisible(true);
  };
  const closeConfirmationPopup = () => {
    setConfirmationVisible(false);
  };

  // 『図鑑登録に進む』ボタンをクリックした時の処理
  function handleRegisterClick() {
    showConfirmationPopup();
  }

  // ポップアップの中身
  const confirmationPopup = isConfirmationVisible && (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
      <p>チェックしたお店は{checkedItems.filter((item) => item).length}件です。</p>
      <p>図鑑登録を進めても良いですか？</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button
          onClick={closeConfirmationPopup}
          style={{ background: '#FFA500', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 20px', cursor: 'pointer' }}
        >
          戻る
        </button>
        <button
          style={{ background: '#FFA500', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 20px', cursor: 'pointer' }}
          onClick={() => {
            const checkedItemsIndexes = checkedItems.map((item, index) => (item ? index : -1)).filter((index) => index !== -1);
            const selectedShops = checkedItemsIndexes.map((index) => parsedData[index]);
            // localStorageに整形データを保存する。
            localStorage.removeItem("registerList");
            localStorage.setItem("registerList", JSON.stringify(selectedShops))
            // localStorageに格納したデータの確認
            const storedData = localStorage.getItem("registerList");
            if (storedData) {
              // localStorageにデータが存在する場合
              let parsedData;
              try {
                parsedData = JSON.parse(storedData);
                console.log("localStorageに転送したデータ:", parsedData);
              } catch (error) {
                console.error('JSONパースエラー:', error);
              }
            } else {
              // localStorageにデータが存在しない場合
              console.log("localStorageへのデータ転送に失敗しました");
            }
            closeConfirmationPopup(); // 処理完了後にポップアップを閉じる
            router.push('/04_createZukanTitle');
          }}
        >
          進む
        </button>
      </div>
    </div>
  );

  return (
    <Mockupphone> {/*デモ用スマホ画面*/}
    <div style={{  position: 'absolute', bottom: '0', width: '100%', zIndex: '100'}}>
        <BottomAppBar />{/*下部メニューバー*/}
    </div>

    
    <div>
      <div style={{ padding:'30px 0 0 10px', fontSize: '14px'}}>図鑑に登録したいお店に✅を入れてください。</div>
      
      {parsedData.map((item, index) => (
      
        <div className="cardall" style={{margin:'10px'}}>
            <div key={index}  className="card lg:card-side bg-base-100 shadow-xl">     
            <figure><img src={item.image} alt="Album" style={{width:'100%',height:'100%'}}/></figure>
            <div className="form-cntrol" style={{ position: 'absolute', top: '10px', left:'10px', zIndex: '2' }}>
              <label className="cursor-pointer label">

                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  className="checkbox [--chkfg:white]"
                  onChange={() => handleCheckboxChange(index)}
                  style={{ 
                    width: '30px', 
                    height: '30px',
                    borderColor:'white',
                    '--chkbg': checkedItems[index] ? '#23CB57' : '#23CB57',
                    '--chkfg': checkedItems[index] ? '#ffffff' : '#ffffff',
                  }}
                />
              </label>
          </div>
            <div className="card-body" style={{ width: '100%', flex: '0 0 50%', boxSizing: 'border-box',  overflow: 'hidden' ,padding:'10px'}}>
              <h2 className="card-title" style={{ fontSize: '14px', borderBottom: '1px dotted #767676'}}>{item.name}</h2>
              <li style={{ fontSize: '10px'}}>運用状況：{item.status}</li>
              <li style={{ fontSize: '10px'}}>住所：{item.address}</li>
              <li style={{ fontSize: '10px'}}>ユーザー評価：{item.rating}</li>
            <div className="card-actions justify-end"></div>
            </div>
            </div>
            </div>








      
        /*<div key={index} className="card lg:card-side bg-base-100 shadow-xl" style={{ height: '180px', width: '90%', margin: '10px', display: 'flex' }}>
          
          <div className="form-cntrol" style={{ position: 'absolute', top: '10px', left:'10px', zIndex: '2' }}>
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  className="checkbox [--chkfg:white]"
                  onChange={() => handleCheckboxChange(index)}
                  style={{ 
                    width: '30px', 
                    height: '30px',
                    borderColor:'white',
                    '--chkbg': checkedItems[index] ? '#23CB57' : '#23CB57',
                    '--chkfg': checkedItems[index] ? '#ffffff' : '#ffffff',
                  }}
                />
              </label>
          </div>
          
          
          <div className="image" style={{ width: '100%', flex: '0 0 50%', boxSizing: 'border-box' }}>
            <img src={item.image} alt={`Album ${index + 1} `} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          
          
          <div className="card-body" style={{ width: '100%', flex: '0 0 50%', boxSizing: 'border-box',  overflow: 'hidden' ,padding:'10px'}}>
            
          

            <h2 className="card-title" style={{ fontSize: '14px', borderBottom: '1px dotted #767676'}}>{item.name}</h2>
            <li style={{ fontSize: '10px' }}> 運用状況: {item.status}</li>
            <li style={{ fontSize: '10px' }}> 住所: {item.address}</li>
            <li style={{ fontSize: '10px' }}> ユーザー評価: {item.rating}</li>
          
          </div>

        </div> */

      ))}



<div className="m-3 grid-item" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button
        type="button"
        onClick={handleRegisterClick}
        style={{ background: '#FFA500', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 20px', cursor: 'pointer' ,margin:'0 0 120px 10px',marginLeft:'auto'}}
      >
      図鑑登録に進む
      </button>
</div>

      {ReactDOM.createPortal(confirmationPopup, document.body)}
    </div>
    </Mockupphone>
  );
};

export default Card;