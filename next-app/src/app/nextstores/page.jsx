async function fetchTest() {
    // fetch():指定URLにHTTPリクエストし、Response オブジェクトを返す
    // await  :非同期処理を同期的に扱う処理
    const staticData = await fetch(`http://127.0.0.1:8000/store`);
    return staticData.json();
}

export default async function Page() {
    const stores = await fetchTest();
    // JSON.stringify(value, replacer, space);
        // value: 変換するJavaScriptオブジェクトまたは値
        // replacer: JSON文字列を生成する際にプロパティを置き換えるための関数または配列。通常nullを指定して全プロパティを含むようにする
        // space: 出力されるJSON文字列を整形するための空白を表す文字列または数値
    return <pre>{JSON.stringify(stores, null, 2)}</pre>
}