'use client'
import React, {useState}  from 'react';
import { useRouter } from 'next/navigation';

const Card = () => {
  // アルバム情報のための状態
  const [formattedResults, setFormattedResults] = useState("アルバム情報はここに入ります");
  
  // メッセージを表示するための状態
  const [showMessage, setShowMessage] = useState(false);

  // ボタンクリックを処理する関数
  const handleButtonClick = () => {
    setShowMessage(true);
  };

  return (
    <div>
      <div>図鑑登録するお店に✔を入れてください。</div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><img src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          {/* formattedResults を表示する */}
          <p>{formattedResults}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-active btn-accent">✓</button>
          </div>
          {/* showMessage が true の場合は成功メッセージを表示 */}
          {showMessage && (
            <div className="alert alert-success mt-4">
              ボタンをクリックしました！ これでアルバムを聴くことができます。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
