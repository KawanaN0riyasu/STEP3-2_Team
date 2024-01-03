'use client'
import React, {useState, useEffect}  from 'react';
import { useRouter } from 'next/navigation';
import ReactDOM from 'react-dom'

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
        console.log("localStorageにあるデータ:", parsedDataFromLocalStorage);
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
    <div>
      <div style={{ fontSize: '24px' }}>図鑑に登録したいお店に✅を入れてください。</div>
      {parsedData.map((item, index) => (
        <div key={index} className="card lg:card-side bg-base-100 shadow-xl" style={{ height: '400px', width: '80%', marginBottom: '10px', display: 'flex' }}>
          <figure style={{ width: '50%', flex: '0 0 50%', boxSizing: 'border-box' }}>
            <img src={item.image} alt={`Album ${index + 1} `} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </figure>
          <div className="card-body" style={{ width: '50%', flex: '0 0 50%', boxSizing: 'border-box',  overflow: 'hidden' }}>
            <h2 className="card-title"style={{ fontSize: '24px' }}>{item.name}</h2>
            <p> ●運用状況: {item.status}</p>
            <p> ●住所: {item.address}</p>
            <p> ●ユーザー評価: {item.rating}</p>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text"> ●図鑑登録: </span>
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  className="checkbox border-orange-400 checked:border-white-800 [--chkbg:theme(colors.white.600)] [--chkfg:orange]"
                  onChange={() => handleCheckboxChange(index)}
                  style={{ 
                    width: '30px', 
                    height: '30px',
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      ))}
      <div style={{ width: '80%', fontSize: '24px', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button
          type="button"
          onClick={handleReturnClick}
          style={{ background: '#FFA500', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 20px', cursor: 'pointer' }}
        >
          検索MAPに戻る
        </button>
        <button
          type="button"
          onClick={handleRegisterClick}
          style={{ background: '#FFA500', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 20px', cursor: 'pointer' }}
        >
          図鑑登録に進む
        </button>
      </div>
      {ReactDOM.createPortal(confirmationPopup, document.body)}
    </div>
  );
};

export default Card;