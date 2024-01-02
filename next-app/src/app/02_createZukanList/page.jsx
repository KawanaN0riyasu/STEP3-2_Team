'use client'
import React, {useState, useEffect}  from 'react';

const Card = () => {
  const [parsedData, setParsedData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

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

  return (
    <div>
      <div style={{ fontSize: '24px' }}>図鑑登録するお店に✅を入れてください。</div>
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
            <div className="card-actions">
              <label>
                <span> ●図鑑登録: </span>
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
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
    </div>
  );
};

export default Card;
