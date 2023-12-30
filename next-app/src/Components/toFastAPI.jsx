async function sendSearchDataToServer(searchData) {
    try {
         // 送信するデータをコンソールに表示
        console.log('Sending data to server:', searchData);

        // サーバーに対してPOSTリクエストを送信
        const response = await fetch('http://localhost:8000/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // リクエストのヘッダーにJSON形式を指定
            },
            body: JSON.stringify(searchData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
        } else {
            console.error('Failed to send data to server');
        }
    } catch (error) {
        console.error('Error sending data to server', error);
    }
}

export default sendSearchDataToServer;