from fastapi import FastAPI, HTTPException, Query# FastAPI読み込み
from fastapi.middleware.cors import CORSMiddleware  # FastAPIが提供するCORS処理ミドルウェア(通信時に使うセキュリティ関連ライブラリ)
from fastapi.responses import StreamingResponse
from PIL import Image
from io import BytesIO
import googlemaps
import pprint
import httpx


# FastAPIインスタンス化
app = FastAPI()

# 通信許可するオリジン（ドメイン）リスト
origins = [
    # React通信
    #"通信するreactのアプリURLをここに入力",
    # local通信
    "http://localhost:3000",
]

# セキュリティ面のコード
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # 許可するオリジン（ドメイン）のリスト
    allow_credentials=True,  # ブラウザからリクエスト受けた時の認証情報サーバー送信可否指定。Trueの場合は許可
    allow_methods=["GET", "POST", "PUT", "DELETE"],     # 許可するHTTPメソッドリスト(Get,Post,Putなど) ["*"]と指定することですべてのHTTPメソッドを許可
    allow_headers=["*"],     # 許可するHTTPヘッダーリスト  ["*"]と指定することですべてのHTTPヘッダーを許可
)

# 12/14宿題対応
stores = {
    "name": "Store1",
    "items": [
        {
            "name": "Chair",
            "price": 15.99
        }
    ]
}

# ローカルサーバー(http://127.0.0.1:8000)にリクエストが来た時の処理    ※ターミナルにて『uvicorn main:app --reload』実行でローカルサーバー開く
@app.get("/")                    # 『/』というURLにGetリクエスト来たら、
async def Hello():               # 『async def』で非同期処理,  『def』なら同期処理    
    return {"stores":"World!"}

# 12/13MUST宿題
@app.get("/store")
async def get_stores():
    return {"stores": stores}

# 12/13ADVANCED宿題
@app.get('/api/get-image', response_class=StreamingResponse) #GETメソッドリクエストのエンドポイント設定
async def get_image():                        #エンドポイント処理を定義
    img = Image.open('templates/image/TECHFOODEXPROLERS_ER_Rev3.jpg')  #PILを使用して指定パスの画像ファイルを開く
    img_io = BytesIO()                        #画像データを格納するバイトストリームを作成
    img.save(img_io, 'PNG', quality=70)       #画像をJPEG形式で保存
    img_io.seek(0)                            #バイトストリームの読み取り/書き込み位置をファイルの先頭に戻し
    return StreamingResponse(img_io, media_type='image/png')  #send_file関数を使用して、画像をクライアントに送信


# 12/20宿題 GoogleAPIから情報取得
@app.get("/places_nearby")
async def places_nearby(
    lat: float = Query(35.7122544, description="緯度"),  #浅草駅の経度を仮記入
    lon: float = Query(139.7892628, description="経度"),  #浅草駅の緯度を仮記入
    radius: int = Query(100, description="検索半径（メートル）"),
    language: str = Query("ja", description="言語"),
    keyword: str = Query("浅草 あんみつ", description="検索キーワード"),
    api_key: str = Query("自身のAPIキー", description="Google Places APIキー")
):
    """
    浅草駅から半径100m圏のあんみつ関連の店舗を検索するエンドポイント
    """
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "key": api_key,
        "location": f"{lat},{lon}",
        "radius": radius,
        "language": language,
        "keyword": keyword,
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(base_url, params=params)
            response.raise_for_status()  # エラー発生時にhttpx.HTTPErrorを発生させる
            return response.json()['results']
        
    # HTTPエラー表示
    except httpx.HTTPError as http_error:
        raise HTTPException(status_code=500, detail=f"Error: {http_error}")
    # リクエストエラー表示（例: タイムアウト）
    except httpx.RequestError as request_error:
        raise HTTPException(status_code=500, detail=f"Request Error: {request_error}")
    # その他の非予測エラー表示
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Error: {error}")

# NEXT.jsからデータを受け取る
@app.post("/api/search")
async def receive_search_data(search_data: dict):
    # ここで受け取ったデータを処理する
    print("Received search data:", search_data)
    return {"message": "Data received successfully"}
