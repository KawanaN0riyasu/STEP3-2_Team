import React from 'react';
// axios(API通信ライブラリ)をインポート
import axios from "axios";

function App() {
  const [data, setData] = React.useState();

  // FastAPIアドレス
  const urls = [
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8000/store",
    // 別のURLを追加することができます
  ];

	// URL選択
  const selectedUrl = urls[1];  // 例として、最初のURLを選択

  // axiosを使ってurlにgetリクエストを送信
  const GetData = () => {
		axios.get(selectedUrl).then((res) => {
			setData(res.data);
		});
	};
  //リクエスト成功時に.thenメソッド実行
  //res:サーバーレスポンス, data: レスポンスデータ

  return (
    <div>
      <div>ここに処理を書いていきます</div>
      {/* 三項演算子:{条件式 ? trueだった場合の処理 : falseだった場合の処理} */}
      {data ? (
        <div>
          <div>Name: {data.stores.name}</div>
          <div>
            Items: {data.stores.items.map(item => (
              <div key={item.name}>
                <div>Name: {item.name},{'  '}Price: {item.price}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={GetData}>データを取得</button>
      )}
    </div>
  );
}

export default App;
